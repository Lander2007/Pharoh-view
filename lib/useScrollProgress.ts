'use client'
import { useEffect, useState, useCallback, useRef, useSyncExternalStore } from 'react'

/** Page scroll progress 0 → 1, rAF-throttled so scroll-driven 3D stays smooth. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const ticking = useRef(false)

  const handleScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )
      const max = Math.max(docHeight - window.innerHeight, 1)
      const nextProgress = Math.min(Math.max(scrollTop / max, 0), 1)
      setProgress(nextProgress)
      ticking.current = false
    })
  }, [])

  useEffect(() => {
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    document.addEventListener('scroll', handleScroll, { passive: true })

    // Recalibrate after layout and web fonts settle
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(handleScroll)
    }

    window.addEventListener('load', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      document.removeEventListener('scroll', handleScroll)
      window.removeEventListener('load', handleScroll)
    }
  }, [handleScroll])

  return progress
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot(): boolean {
  return false
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
}

