'use client'

import { Suspense, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import ProceduralChair from '@/components/scene/ProceduralChair'
import RadialProgressRing from '@/components/scene/RadialProgressRing'

const VIEW_PRESETS = [
  { label: '3/4 Hero View', rotY: 0.45, rotX: 0.10 },
  { label: 'Front Angle', rotY: 0.05, rotX: 0.04 },
  { label: 'Side Profile', rotY: Math.PI / 2, rotX: 0.04 },
  { label: 'High Isometric', rotY: 0.65, rotX: 0.35 },
]

export default function ChairInspectionPage() {
  const [activePreset, setActivePreset] = useState(0)
  const [revealProgress, setRevealProgress] = useState(1.0)
  const [ringProgress, setRingProgress] = useState(0.55)

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    <div className="relative w-screen h-screen bg-[#F6F1EA] text-[#1C1712] overflow-hidden select-none font-sans">
      {/* Top Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 border-b border-[#8B5E3C]/20 bg-[#F6F1EA]/85 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B5E3C] hover:text-[#B8901F] transition-colors"
          >
            &larr; Back to Landing Page
          </Link>
          <span className="text-[#8B5E3C]/40">|</span>
          <h1 className="text-sm font-semibold tracking-wide text-[#1C1712]">
            Wireframe-to-Solid & Radial Ring Inspector
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#B8901F]/15 text-[#8B5E3C]">
            Reveal: {Math.round(revealProgress * 100)}%
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#8B5E3C]/15 text-[#8B5E3C]">
            Ring: {Math.round(ringProgress * 100)}%
          </span>
        </div>
      </header>

      {/* 3D Canvas */}
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0.4, 4.6], fov: 38 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.7} color="#FFF8ED" />
          <directionalLight
            position={[4, 6, 3.5]}
            intensity={2.0}
            color="#FFF8ED"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-3, 2, 1.5]} intensity={0.5} color="#E8D5BD" />
          <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#D8A82A" />

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
              blur={2.0}
              far={2}
              color="#6E4327"
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
      </div>

      {/* Interactive Controls Panel */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-full max-w-xl px-4">
        {/* Sliders Container */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-4 bg-[#EFE6D8]/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#8B5E3C]/25 shadow-lg">
          {/* Wireframe-to-Solid Reveal Slider */}
          <div className="flex-1 w-full flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-semibold tracking-wider text-[#8B5E3C] uppercase">
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
              className="w-full accent-[#B8901F] cursor-pointer"
            />
          </div>

          {/* Radial Ring Scroll Progress Slider */}
          <div className="flex-1 w-full flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-semibold tracking-wider text-[#8B5E3C] uppercase">
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
              className="w-full accent-[#8B5E3C] cursor-pointer"
            />
          </div>
        </div>

        {/* Camera Angle Presets */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EFE6D8]/90 backdrop-blur-md rounded-full border border-[#8B5E3C]/25 shadow-md">
          {VIEW_PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => setActivePreset(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                activePreset === idx
                  ? 'bg-[#1C1712] text-[#EFE6D8] shadow-sm'
                  : 'text-[#1C1712]/75 hover:text-[#1C1712] hover:bg-[#8B5E3C]/10'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <p className="text-[10px] tracking-widest text-[#8B5E3C]/80 uppercase font-medium">
          Drag sliders to scrub reveal and ring &bull; Drag canvas to rotate 360&deg;
        </p>
      </footer>
    </div>
  )
}
