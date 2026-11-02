'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '@/components/common/TiltCard'
import { sceneState, SystemEngineCode } from '@/lib/sceneState'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Solution() {
  const { t, isRTL, lang } = useLanguage()
  const [selectedMaterial, setSelectedMaterial] = useState<'oak' | 'boucle' | 'walnut'>('oak')
  const sectionRef = useRef<HTMLElement>(null)
  const shutterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024
      if (!isMobile) {
        // Section 02 -> 03: Iris / clip-path rectangular shutter expand wipe on desktop
        gsap.fromTo(
          shutterRef.current,
          {
            clipPath: 'inset(8% 8% 8% 8%)',
            opacity: 0.9,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 1,
            },
          }
        )
      } else if (shutterRef.current) {
        shutterRef.current.style.clipPath = 'none'
        shutterRef.current.style.opacity = '1'
      }
    }, sectionRef)

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)

    return () => ctx.revert()
  }, [lang])

  const handleMaterialClick = (mat: 'oak' | 'boucle' | 'walnut') => {
    setSelectedMaterial(mat)
    sceneState.cycleMaterial()
  }

  const engines = t.solution.engines

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative z-10 min-h-screen flex items-center py-24 px-6 lg:px-12 overflow-hidden bg-transparent"
    >
      {/* Anchor aliases for #solve and #features */}
      <div id="solve" className="absolute -top-24 pointer-events-none" />
      <div id="features" className="absolute -top-24 pointer-events-none" />
      <div
        ref={shutterRef}
        className="relative z-10 max-w-7xl mx-auto w-full transition-all will-change-transform"
      >
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left rtl:text-right">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C89D54]" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] rtl:tracking-normal text-[#C89D54] font-semibold">
              {t.solution.eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917] leading-tight tracking-tight rtl:tracking-normal mb-4">
            {t.solution.heading}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#57534E] leading-relaxed">
            {t.solution.subtitle}
          </p>
        </div>

        {/* Asymmetric Architectural Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engines.map((f) => {
            const isFeatured = f.code === 'SYS.01'
            return (
              <TiltCard
                key={f.code}
                onMouseEnter={() => sceneState.setActiveEngine(f.code as SystemEngineCode)}
                onMouseLeave={() => sceneState.setActiveEngine(null)}
                className={isFeatured ? 'md:col-span-2' : 'col-span-1'}
              >
                <div className="text-left rtl:text-right">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#C89D54] font-bold">
                        {f.code}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest rtl:tracking-normal text-[#78716C] bg-[#1C1917]/5 px-2.5 py-1 rounded-[2px] border border-[#1C1917]/5">
                      {t.solution.activeEngine}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-[#1C1917] text-xl sm:text-2xl mb-3">
                    {f.label}
                  </h3>
                  <p className="font-sans text-[#57534E] text-sm leading-relaxed mb-6">
                    {f.desc}
                  </p>

                  {/* Interactive Live Telemetry Visual for SYS.01 */}
                  {f.code === 'SYS.01' && (
                    <div className="w-full bg-[#1C1917] rounded-[2px] p-4 font-mono text-[10px] text-[#C89D54] border border-[#C89D54]/25 shadow-inner">
                      <div className="flex justify-between items-center pb-2 border-b border-[#C89D54]/20 mb-3 text-[9px]">
                        <span>{f.telemetryHeader || 'LIDAR DEPTH MATRIX // LIVE TELEMETRY'}</span>
                        <span className="text-[#4CC9F0] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0] animate-pulse" />
                          60Hz
                        </span>
                      </div>
                      <div className="relative h-24 border border-dashed border-[#C89D54]/30 rounded-[2px] overflow-hidden flex items-center justify-around bg-[#141210]">
                        {/* Animated Radar Scanning Line with Cyan AR Accent */}
                        <div className="absolute inset-y-0 w-1 bg-gradient-to-r from-transparent via-[#4CC9F0] to-transparent animate-[pulse_1.5s_infinite]" />
                        <div className="text-center">
                          <p className="text-[12px] font-bold text-[#F5EEE6]">4,096</p>
                          <p className="text-[8px] text-[#78716C]">{f.pointsLabel || 'SURFACE POINTS'}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[12px] font-bold text-[#C89D54]">±1.8mm</p>
                          <p className="text-[8px] text-[#78716C]">{f.confidenceLabel || 'DEPTH CONFIDENCE'}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[12px] font-bold text-[#F5EEE6]">0.02ms</p>
                          <p className="text-[8px] text-[#78716C]">{f.latencyLabel || 'RAYCAST LATENCY'}</p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex justify-between text-[9px] text-[#FAF5EE]/50">
                        <span>{f.lockStatus || 'COORDINATE LOCK: ACTIVE'}</span>
                        <span className="text-[#C89D54]">{f.hoverPrompt || 'HOVER TO ENGAGE 3D GRID'}</span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Swatches for SYS.03 */}
                  {f.code === 'SYS.03' && (
                    <div className="flex items-center gap-2 mb-4 pt-2 border-t border-[#1C1917]/10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMaterialClick('oak')
                        }}
                        className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          selectedMaterial === 'oak'
                            ? 'bg-[#C89D54] text-[#1C1917] border-[#C89D54] font-bold'
                            : 'bg-[#1C1917]/5 text-[#57534E] border-[#1C1917]/10'
                        }`}
                      >
                        {t.solution.materials.oak}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMaterialClick('boucle')
                        }}
                        className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          selectedMaterial === 'boucle'
                            ? 'bg-[#D4A373] text-[#1C1917] border-[#D4A373] font-bold'
                            : 'bg-[#1C1917]/5 text-[#57534E] border-[#1C1917]/10'
                        }`}
                      >
                        {t.solution.materials.boucle}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMaterialClick('walnut')
                        }}
                        className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          selectedMaterial === 'walnut'
                            ? 'bg-[#1C1917] text-[#F5EEE6] border-[#C89D54] font-bold'
                            : 'bg-[#1C1917]/5 text-[#57534E] border-[#1C1917]/10'
                        }`}
                      >
                        {t.solution.materials.walnut}
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Footer Status */}
                <div className="mt-6 pt-4 border-t border-[#1C1917]/10 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest rtl:tracking-normal text-[#78716C]">
                  <span>{t.solution.triggerHover}</span>
                  <span className="text-[#C89D54] font-semibold">{t.solution.liveLink}</span>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
