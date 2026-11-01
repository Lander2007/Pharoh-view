'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '@/components/common/TiltCard'
import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function ValueProp() {
  const { t, isRTL, lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [valConfidence, setValConfidence] = useState(0)
  const [valSpeed, setValSpeed] = useState(1)
  const [valReturns, setValReturns] = useState(0)
  const [valAccuracy, setValAccuracy] = useState(8)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // 1. Staggered Vertical Clip-Path Reveals on all metric cards
      gsap.fromTo(
        '.metric-card',
        {
          clipPath: 'inset(40% 0 0 0)',
          opacity: 0,
          y: 35,
        },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // 2. Animated Number Counters with GSAP
      const counters = {
        confidence: 0,
        speed: 1,
        returns: 0,
        accuracy: 8,
      }

      gsap.to(counters, {
        confidence: 94,
        speed: 3,
        returns: 67,
        accuracy: 2,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
          onEnter: () => soundEngine.playCounterTick(),
        },
        onUpdate: () => {
          setValConfidence(Math.round(counters.confidence))
          setValSpeed(Math.round(counters.speed))
          setValReturns(Math.round(counters.returns))
          setValAccuracy(Math.round(counters.accuracy))
        },
      })
    }, sectionRef)

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)

    return () => ctx.revert()
  }, [lang])

  const secondaryCards = t.valueProp.secondaryCards

  return (
    <section
      id="value"
      ref={sectionRef}
      className="relative z-10 min-h-screen flex items-center py-24 px-6 lg:px-12 bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-2xl mb-16 text-left rtl:text-right">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C89D54]" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] rtl:tracking-normal text-[#C89D54] font-semibold">
              {t.valueProp.eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917] leading-tight tracking-tight rtl:tracking-normal mb-4">
            {t.valueProp.heading}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#57534E] leading-relaxed">
            {t.valueProp.subtitle}
          </p>
        </div>

        {/* Balanced 12-Column Layout: 5 Cols for Primary Lead, 7 Cols for 2x2 Secondary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Primary Lead Metric Card (Cols 1–5) */}
          <div className="lg:col-span-5 metric-card">
            <TiltCard className="h-full p-8 sm:p-12 border-2 border-[#C89D54]/50 shadow-architectural-gold">
              <div className="flex flex-col justify-between h-full text-left rtl:text-right">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[10px] tracking-[0.24em] rtl:tracking-normal text-[#C89D54] uppercase font-bold px-3 py-1 bg-[#C89D54]/10 rounded-[2px] border border-[#C89D54]/30">
                      {t.valueProp.primaryBadge}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider rtl:tracking-normal text-[#78716C]">
                      {t.valueProp.systemVerified}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#1C1917] tracking-tight">
                      {valConfidence}
                    </span>
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-[#C89D54]">%</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-3">
                    {t.valueProp.primaryTitle}
                  </h3>

                  <p className="font-sans text-[#57534E] text-base leading-relaxed max-w-xl">
                    {t.valueProp.primaryDesc}
                  </p>
                </div>

                {/* Technical Accuracy Histogram Bar Visual */}
                <div className="mt-10 pt-6 border-t border-[#1C1917]/10">
                  <div className="flex items-center justify-between font-mono text-[9px] text-[#78716C] mb-2 uppercase tracking-wider rtl:tracking-normal">
                    <span>{t.valueProp.histogramTitle}</span>
                    <span className="text-[#C89D54]">{t.valueProp.histogramUsers}</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-12 pt-2">
                    {[40, 55, 68, 74, 82, 88, 92, 96, 99, 94, 91, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#C89D54]/30 to-[#C89D54] rounded-[1px] transition-all hover:bg-[#4CC9F0]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Secondary 2x2 Grid of Metric Cards (Cols 6–12: Spacious 7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {secondaryCards.map((card, i) => {
              const displayVal =
                i === 0
                  ? `${valSpeed}×`
                  : i === 1
                  ? isRTL ? `↓${valReturns}٪` : `↓${valReturns}%`
                  : i === 2
                  ? isRTL ? `±${valAccuracy} سم` : `±${valAccuracy}cm`
                  : '∞'

              return (
                <div key={card.code} className="metric-card">
                  <TiltCard className="p-6 sm:p-7 h-full flex flex-col justify-between">
                    <div className="text-left rtl:text-right">
                      <span className="font-mono text-[10px] tracking-widest rtl:tracking-normal text-[#78716C] block mb-3">
                        {card.code}
                      </span>
                      <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mb-2">
                        {displayVal}
                      </div>
                      <h4 className="font-serif font-bold text-lg text-[#1C1917] mb-2">
                        {card.label}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#57534E] leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#1C1917]/10 flex justify-between font-mono text-[9px] text-[#78716C]">
                      <span>CERTAINTY</span>
                      <span className="text-[#C89D54]">PASSED</span>
                    </div>
                  </TiltCard>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
