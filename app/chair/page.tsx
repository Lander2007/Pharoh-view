'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import ProceduralChair from '@/components/scene/ProceduralChair'
import RadialProgressRing from '@/components/scene/RadialProgressRing'
import CanvasErrorBoundary from '@/components/common/CanvasErrorBoundary'
import { getOptimalWebGLContext } from '@/components/scene/ChairScene'

const VIEW_PRESETS = [
  { label: '3/4 Hero View', rotY: 0.45, rotX: 0.08 },
  { label: 'Front Elevation', rotY: 0.05, rotX: 0.04 },
  { label: 'Side Profile', rotY: Math.PI / 2, rotX: 0.04 },
  { label: 'High Isometric', rotY: 0.65, rotX: 0.35 },
]

export default function ChairInspectionPage() {
  const [activePreset, setActivePreset] = useState(0)
  const [revealProgress, setRevealProgress] = useState(1.0)
  const [ringProgress, setRingProgress] = useState(0.55)
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const c = document.createElement('canvas')
        const gl = getOptimalWebGLContext(c)
        if (!gl) setHasWebGL(false)
      } catch {
        setHasWebGL(false)
      }

      const sp = new URLSearchParams(window.location.search)
      const v = sp.get('view')
      if (v === 'front') setActivePreset(1)
      else if (v === 'side') setActivePreset(2)
      else if (v === 'iso') setActivePreset(3)

      const r = sp.get('reveal')
      if (r !== null) {
        const val = parseFloat(r)
        if (!isNaN(val)) setRevealProgress(Math.min(Math.max(val, 0), 1))
      }

      const ring = sp.get('ring')
      if (ring !== null) {
        const val = parseFloat(ring)
        if (!isNaN(val)) setRingProgress(Math.min(Math.max(val, 0), 1))
      }
    }
  }, [])

  const current = VIEW_PRESETS[activePreset]

  return (
    <div className="relative w-screen h-screen bg-[#F5EEE6] text-[#1C1917] overflow-hidden select-none font-sans">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 border-b border-[#1C1917]/10 bg-[#F5EEE6]/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs uppercase font-mono tracking-[0.2em] font-semibold text-[#C89D54] hover:text-[#1C1917] transition-colors"
          >
            &larr; Back to Landing Page
          </Link>
          <span className="text-[#1C1917]/20">|</span>
          <h1 className="text-xs sm:text-sm font-semibold font-mono tracking-wide text-[#1C1917]">
            3D SPATIAL GEOMETRY &amp; SPECIFICATION INSPECTOR
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#C89D54]/15 text-[#1C1917] border border-[#C89D54]/40 font-semibold">
            Reveal: {Math.round(revealProgress * 100)}%
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#D4A373]/20 text-[#1C1917] border border-[#D4A373]/40 font-semibold">
            Ring: {Math.round(ringProgress * 100)}%
          </span>
        </div>
      </header>

      {/* 3D Canvas */}
      <div className="w-full h-full">
        <CanvasErrorBoundary>
          {hasWebGL && (
            <Canvas
              camera={{ position: [0, 0.4, 4.6], fov: 38 }}
              dpr={[1, 1.5]}
              gl={(canvas) => {
                const ctx = getOptimalWebGLContext(canvas)
                if (!ctx) {
                  throw new Error('WebGL context creation failed.')
                }
                return new THREE.WebGLRenderer({
                  canvas,
                  context: ctx as WebGLRenderingContext,
                  alpha: true,
                  antialias: false,
                  powerPreference: 'default',
                })
              }}
            >
              <ambientLight intensity={0.8} color="#FFF8EE" />
              <directionalLight
                position={[4, 6, 3.5]}
                intensity={2.2}
                color="#FFF8EE"
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <directionalLight position={[-3, 2, 1.5]} intensity={0.5} color="#D4A373" />
              <directionalLight position={[-3, 3, -3]} intensity={0.7} color="#C89D54" />

              <Suspense fallback={null}>
                <ProceduralChair
                  targetRotationY={current.rotY}
                  targetRotationX={current.rotX}
                  targetX={0}
                  targetY={-0.12}
                  targetScale={1.25}
                  revealProgress={revealProgress}
                  frozen={false}
                />

                {/* Radial Progress Ring */}
                <RadialProgressRing progress={ringProgress} radius={1.72} />

                <ContactShadows
                  position={[0, -1.03, 0]}
                  opacity={0.45}
                  scale={6}
                  blur={2.4}
                  far={2}
                  color="#1C1917"
                />
              </Suspense>

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={2.5}
                maxDistance={7.0}
                minPolarAngle={0.2}
                maxPolarAngle={Math.PI / 2 + 0.1}
              />
            </Canvas>
          )}
        </CanvasErrorBoundary>
      </div>

      {/* Interactive Controls Panel */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-full max-w-xl px-4">
        {/* Sliders Container */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-4 glass-architectural px-5 py-3.5 rounded-2xl border border-[#1C1917]/10 shadow-architectural">
          {/* Wireframe-to-Solid Reveal Slider */}
          <div className="flex-1 w-full flex flex-col gap-1">
            <div className="flex justify-between text-[10px] font-mono font-semibold tracking-wider text-[#C89D54] uppercase">
              <span>Wireframe &rarr; Solid</span>
              <span>{Math.round(revealProgress * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={revealProgress}
              onChange={(e) => setRevealProgress(parseFloat(e.target.value))}
              className="w-full accent-[#C89D54] cursor-pointer"
            />
          </div>

          {/* Radial Ring Scroll Progress Slider */}
          <div className="flex-1 w-full flex flex-col gap-1">
            <div className="flex justify-between text-[10px] font-mono font-semibold tracking-wider text-[#1C1917] uppercase">
              <span>Ring Scroll Progress</span>
              <span>{Math.round(ringProgress * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ringProgress}
              onChange={(e) => setRingProgress(parseFloat(e.target.value))}
              className="w-full accent-[#1C1917] cursor-pointer"
            />
          </div>
        </div>

        {/* Camera Angle Presets */}
        <div className="flex items-center gap-1.5 p-1.5 glass-architectural rounded-full border border-[#1C1917]/10 shadow-sm">
          {VIEW_PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => setActivePreset(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                activePreset === idx
                  ? 'bg-[#1C1917] text-[#F5EEE6] font-semibold shadow-sm'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#1C1917]/5'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <p className="text-[9px] font-mono tracking-widest text-[#78716C] uppercase font-medium">
          Drag sliders to scrub reveal &bull; Click &amp; drag canvas to orbit 360&deg;
        </p>
      </footer>
    </div>
  )
}
