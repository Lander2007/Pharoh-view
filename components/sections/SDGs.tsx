'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function SDGs() {
  const { t, isRTL, lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const barsRef = useRef<HTMLDivElement[]>([])

  const cards = t.sdgs.cards

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // 1. Scrub colored mandate bars scaleY(0 -> 1)
      barsRef.current.forEach((bar) => {
        if (!bar) return
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            },
          }
        )
      })

      // 2. Staggered Vertical Clip-Path Reveals
      const validCards = cardsRef.current.filter(Boolean)
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          {
            clipPath: 'inset(40% 0 0 0)',
            y: 35,
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#sdg-card-container',
              start: 'top 75%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)

    return () => ctx.revert()
  }, [lang])

  return (
    <section
      id="sdgs"
      ref={sectionRef}
      className="relative z-10 py-28 px-6 lg:px-12 bg-transparent border-t border-[#1C1917]/10"
    >
      {/* Anchor for sustainability links */}
      <div id="sustainability" className="absolute -top-24 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left rtl:text-right">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C89D54]" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] rtl:tracking-normal text-[#C89D54] font-semibold">
              {t.sdgs.eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917] leading-tight tracking-tight rtl:tracking-normal mb-4">
            {t.sdgs.heading}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#57534E] leading-relaxed">
            {t.sdgs.description}
          </p>

          {/* Special Competition / Team Context Banner */}
          <div className="mt-8 p-4 sm:p-5 glass-architectural rounded-[2px] border-l-4 rtl:border-l rtl:border-r-4 border-l-[#4CC9F0] rtl:border-r-[#4CC9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest rtl:tracking-normal text-[#4CC9F0] font-bold">
                {t.sdgs.climateInitiative}
              </p>
              <p className="font-serif text-lg font-bold text-[#1C1917]">
                {t.sdgs.teamPyramid}
              </p>
              <p className="font-sans text-xs text-[#57534E] mt-0.5">
                {t.sdgs.schoolCredit}
              </p>
            </div>
            <div className="shrink-0 font-mono text-[9px] uppercase tracking-wider rtl:tracking-normal bg-[#1C1917] text-[#C89D54] px-3 py-1.5 rounded-[2px] border border-[#C89D54]/30">
              {t.sdgs.deliverable}
            </div>
          </div>
        </div>

        {/* 4 UN Mandate Cards */}
        <div id="sdg-card-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((s, idx) => (
            <div
              key={s.goal}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el
              }}
              className="glass-architectural p-7 rounded-[2px] border border-[#1C1917]/10 flex flex-col justify-between hover:border-[#C89D54]/50 transition-all duration-300 shadow-architectural group text-left rtl:text-right"
            >
              <div>
                {/* Scrubbing Colored Top Mandate Bar */}
                <div
                  ref={(el) => {
                    if (el) barsRef.current[idx] = el
                  }}
                  className="w-full h-1.5 rounded-full mb-6 will-change-transform"
                  style={{ backgroundColor: s.color || '#C89D54' }}
                />

                <span className="font-mono text-[10px] tracking-widest rtl:tracking-normal text-[#78716C] uppercase block mb-2">
                  {s.goal}
                </span>

                <h3 className="font-serif font-bold text-xl text-[#1C1917] mb-3 group-hover:text-[#C89D54] transition-colors">
                  {s.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              {/* Bottom Metric Pill */}
              <div className="pt-4 border-t border-[#1C1917]/10 flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#1C1917] font-bold">{s.metric}</span>
                <span className="text-[#4CC9F0]">{isRTL ? '✓ هدف محقق' : '✓ ALIGNED'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
