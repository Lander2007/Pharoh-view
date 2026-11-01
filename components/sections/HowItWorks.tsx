'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneState } from '@/lib/sceneState'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
  const { t, isRTL, lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const linePathRef = useRef<SVGPathElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const steps = t.process.steps

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Mobile check: horizontal translation only on desktop
    const isMobile = window.innerWidth < 1024

    if (isMobile) {
      return
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const container = containerRef.current
      if (!track || !container) return

      const totalScroll = track.scrollWidth - window.innerWidth + 120

      // Pure Sticky Horizontal Scroll - ZERO pin: true, ZERO pin-spacer DOM corruption!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const step = Math.min(3, Math.floor(self.progress * 4))
            sceneState.setProcessStep(step)

            // Scrub SVG measurement line
            if (linePathRef.current) {
              const pathLength = 1000
              const offset = pathLength * (1 - self.progress)
              linePathRef.current.style.strokeDashoffset = `${offset}`
            }

            // Direct DOM update of active card state - ZERO React component re-renders!
            cardsRef.current.forEach((card, idx) => {
              if (!card) return
              if (idx === step) {
                card.classList.add('border-2', '!border-[#C89D54]', 'shadow-architectural-gold')
                card.classList.remove('border-[#1C1917]/10', 'opacity-80')
              } else {
                card.classList.remove('border-2', '!border-[#C89D54]', 'shadow-architectural-gold')
                card.classList.add('border-[#1C1917]/10', 'opacity-80')
              }
            })
          },
        },
      })

      // In RTL, horizontally scroll in reverse direction
      tl.to(track, {
        x: isRTL ? totalScroll : -totalScroll,
        ease: 'none',
      })
    }, containerRef)

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)

    return () => ctx.revert()
  }, [isRTL, lang])

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full lg:h-[320vh] bg-transparent"
    >
      <section
        id="how-it-works"
        className="lg:sticky lg:top-0 lg:h-screen w-full py-20 px-6 lg:px-12 overflow-hidden flex flex-col justify-center bg-transparent relative z-10"
      >
        {/* Background blueprint grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full mb-6">
          {/* Section Header */}
          <div className="max-w-2xl text-left rtl:text-right">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#C89D54]" />
              <p className="font-mono text-xs uppercase tracking-[0.24em] rtl:tracking-normal text-[#C89D54] font-semibold">
                {t.process.eyebrow}
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917] leading-tight tracking-tight rtl:tracking-normal mb-2">
              {t.process.heading}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#57534E]">
              {t.process.subtitle}
            </p>
          </div>

          {/* Continuous SVG Architectural Measurement Line across top */}
          <div className="relative w-full h-8 mt-6 mb-2 hidden lg:block overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 1000 30" preserveAspectRatio="none">
              <line x1="0" y1="15" x2="1000" y2="15" stroke="rgba(28, 25, 23, 0.12)" strokeWidth="1" />
              <path
                ref={linePathRef}
                d={isRTL ? "M 1000 15 L 0 15" : "M 0 15 L 1000 15"}
                fill="none"
                stroke="#C89D54"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              {/* Architectural millimeter tick marks */}
              {Array.from({ length: 21 }).map((_, i) => (
                <g key={i} transform={`translate(${i * 50}, 0)`}>
                  <line x1="0" y1="8" x2="0" y2="22" stroke="rgba(200, 157, 84, 0.5)" strokeWidth="1" />
                  {i % 5 === 0 && (
                    <text x="0" y="7" fontSize="7" fill="#78716C" textAnchor="middle" fontFamily="monospace">
                      {i * 50}mm
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Horizontal Scroll Track (Desktop) / Clean Grid (Mobile) */}
        <div className="relative w-full overflow-visible">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 will-change-transform"
          >
            {steps.map((s, idx) => {
              const isInitialActive = idx === 0
              return (
                <div
                  key={s.step}
                  ref={(el) => {
                    cardsRef.current[idx] = el
                  }}
                  className={`w-full lg:w-[480px] shrink-0 p-8 sm:p-10 rounded-[2px] transition-all duration-300 flex flex-col justify-between text-left rtl:text-right ${
                    isInitialActive
                      ? 'glass-architectural border-2 !border-[#C89D54] shadow-architectural-gold'
                      : 'glass-architectural border border-[#1C1917]/10 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.20em] rtl:tracking-normal mb-6 pb-3 border-b border-[#1C1917]/10">
                      <span className="font-bold text-[#C89D54]">{s.step}</span>
                      <span className="text-[#1C1917]/70 font-semibold">{s.action}</span>
                    </div>

                    <p className="font-mono text-[9px] uppercase tracking-widest rtl:tracking-normal text-[#78716C] mb-2">
                      {s.station}
                    </p>

                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917] mb-4">
                      {s.title}
                    </h3>

                    <p className="font-sans text-[#57534E] text-sm leading-relaxed mb-6">
                      {s.desc}
                    </p>

                    {/* Feature Pills */}
                    <div className="space-y-2 mb-6">
                      {s.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 font-mono text-[10px] text-[#1C1917]/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C89D54]" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Strip */}
                  <div className="pt-4 border-t border-[#1C1917]/10 flex items-center justify-between font-mono text-[10px] rtl:tracking-normal">
                    <span className="text-[#78716C]">{isRTL ? `محطة ٠${idx + 1} / ٠٤` : `STATION 0${idx + 1} / 04`}</span>
                    <span className="text-[#C89D54] font-bold">{(idx + 1) * 25}% {isRTL ? 'مكتمل' : 'VERIFIED'}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
