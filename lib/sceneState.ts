'use client'

import { useState, useEffect } from 'react'
import { soundEngine } from './soundEngine'

export type SystemEngineCode = 'SYS.01' | 'SYS.02' | 'SYS.03' | 'SYS.04' | 'SYS.05' | 'SYS.06' | null

export interface SceneState {
  activeEngine: SystemEngineCode
  inspectMode: boolean
  processStep: number // 0, 1, 2, 3
  materialVariant: 'oak' | 'boucle' | 'walnut'
  heroFurnishProgress: number // 0.0 to 1.0 (driven by pinned Hero ScrollTrigger)
}

type Listener = (state: SceneState) => void

class SceneStateManager {
  // Direct mutable value for 60 FPS useFrame polling with 0 React overhead
  public heroProgress: number = 0

  private state: SceneState = {
    activeEngine: null,
    inspectMode: false,
    processStep: 0,
    materialVariant: 'oak',
    heroFurnishProgress: 0,
  }

  private listeners: Set<Listener> = new Set()

  public getState(): SceneState {
    return this.state
  }

  public setHeroFurnishProgress(progress: number) {
    const clamped = Math.max(0, Math.min(1, progress))
    this.heroProgress = clamped
    if (Math.abs(this.state.heroFurnishProgress - clamped) > 0.005) {
      this.state = { ...this.state, heroFurnishProgress: clamped }
      this.notify()
    }
  }

  public subscribe(fn: Listener): () => void {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.state))
  }

  public setActiveEngine(engine: SystemEngineCode) {
    if (this.state.activeEngine === engine) return
    this.state = { ...this.state, activeEngine: engine }
    if (engine) {
      soundEngine.playHoverTick()
    }
    this.notify()
  }

  public setProcessStep(step: number) {
    if (this.state.processStep === step) return
    const variants: ('oak' | 'boucle' | 'walnut')[] = ['oak', 'boucle', 'walnut', 'oak']
    this.state = {
      ...this.state,
      processStep: step,
      materialVariant: variants[step] || 'oak',
    }
    soundEngine.playHoverTick()
    this.notify()
  }

  public toggleInspectMode(force?: boolean) {
    const nextVal = typeof force === 'boolean' ? force : !this.state.inspectMode
    this.state = { ...this.state, inspectMode: nextVal }
    soundEngine.playInspectHum()
    this.notify()
  }

  public setMaterialVariant(variant: 'oak' | 'boucle' | 'walnut') {
    if (this.state.materialVariant === variant) return
    this.state = { ...this.state, materialVariant: variant }
    soundEngine.playClickTick()
    this.notify()
  }

  public cycleMaterial() {
    const list: ('oak' | 'boucle' | 'walnut')[] = ['oak', 'boucle', 'walnut']
    const nextIdx = (list.indexOf(this.state.materialVariant) + 1) % list.length
    this.setMaterialVariant(list[nextIdx])
  }
}

export const sceneState = new SceneStateManager()

export function useSceneState() {
  const [current, setCurrent] = useState<SceneState>(sceneState.getState())

  useEffect(() => {
    return sceneState.subscribe((next) => setCurrent(next))
  }, [])

  return current
}

