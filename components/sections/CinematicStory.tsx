'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneState, useSceneState } from '@/lib/sceneState'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicStory() {
  const { t, isRTL } = useLanguage()
  const { materialVariant } = useSceneState()
  const c = t.cinematic

  const heroPinContainerRef = useRef<HTMLDivElement>(null!)
  const heroSectionRef = useRef<HTMLElement>(null!)
  const headlineRef = useRef<HTMLDivElement>(null!)
  const eyebrowRef = useRef<HTMLParagraphElement>(null!)
  const progressBarRef = useRef<HTMLDivElement>(null!)
  const progressTextRef = useRef<HTMLSpanElement>(null!)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const trigger = ScrollTrigger.create({
      trigger: heroPinContainerRef.current,
      start: 'top top',
      end: '+=220%',
      pin: heroSectionRef.current,
      pinSpacing: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress // 0.0 to 1.0
        sceneState.setHeroFurnishProgress(p)

        // Stage 1: Fade out headline gracefully (0% to 25%)
        if (headlineRef.current) {
          const fadeP = Math.min(1, p / 0.22)
          headlineRef.current.style.opacity = `${Math.max(0, 1 - fadeP)}`
          headlineRef.current.style.transform = `translateY(-${fadeP * 30}px)`
          headlineRef.current.style.pointerEvents = fadeP > 0.85 ? 'none' : 'auto'
        }

        // Dynamic Eyebrow text reflecting staging progression
        if (eyebrowRef.current) {
          if (p < 0.25) {
            eyebrowRef.current.innerText = c.chapter1.eyebrowEmpty || '— [ 01 / THE EMPTY SPACE ]'
          } else if (p < 0.75) {
            eyebrowRef.current.innerText = c.chapter1.eyebrowStaging || '— [ 01 / AR STAGING IN PROGRESS ]'
          } else {
            eyebrowRef.current.innerText = c.chapter1.eyebrowFurnished || '— [ 01 / SPACE FURNISHED ]'
          }
        }

        // Live Scroll Progress Bar in Bottom Console
        const pct = Math.round(p * 100)
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${pct}%`
        }
        if (progressTextRef.current) {
          if (p < 0.99) {
            progressTextRef.current.innerText = `${pct}% ${c.chapter1.staged || 'STAGED'} // ${c.chapter1.scrollToFurnish || 'SCROLL TO FURNISH THIS SPACE'}`
          } else {
            progressTextRef.current.innerText = `100% ${c.chapter1.staged || 'STAGED'} // ${c.chapter1.spaceFullyFurnished || 'SPACE FULLY FURNISHED'}`
          }
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [c])

  return (
    <div className="relative z-10 w-full select-none text-[#1C1917]">
      {/* =========================================================================
          HERO — THE ARCHITECTURAL SPACE & SCROLL-DRIVEN AR ROOM FURNISHING SEQUENCE
          Pinned GSAP ScrollTrigger Sequence (220vh distance, scrub: 1.2)
          Center is 100% unobstructed — zero floating badges or telemetry clutter!
      ========================================================================= */}
      <div ref={heroPinContainerRef} className="relative w-full">
        <section
          ref={heroSectionRef}
          id="hero"
          className="relative w-full h-screen min-h-[720px] overflow-hidden select-none"
        >
          {/* Top-Left Header: position: absolute; top: 12vh; left: 4vw; z-index: 10; */}
          <div className="absolute top-[13vh] sm:top-[12vh] left-[4vw] rtl:left-auto rtl:right-[4vw] z-10 max-w-2xl text-left rtl:text-right">
            {/* Dynamic Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-[#8C6239]" />
              <p
                ref={eyebrowRef}
                className="font-mono text-[11px] font-semibold tracking-[0.2em] rtl:tracking-normal text-[#8C6239] uppercase"
              >
                {c.chapter1.eyebrowEmpty || '— [ 01 / THE EMPTY SPACE ]'}
              </p>
            </div>

            {/* 2-Line Headline: Line 1: Your space. Your vision. Line 2: Before you buy. */}
            <div ref={headlineRef} className="transition-opacity">
              <h1 className="font-serif leading-[1.04] tracking-tight rtl:tracking-normal text-[#1C1917]">
                <div className="flex flex-wrap items-baseline gap-x-3.5">
                  <span className="font-bold text-[clamp(2.5rem,4.2vw,4.4rem)] text-[#1C1917]">
                    {c.chapter1.headline1}
                  </span>
                  <span className="font-normal italic rtl:not-italic text-[clamp(2.5rem,4.2vw,4.4rem)] text-[#8C6239]">
                    {c.chapter1.headline2}
                  </span>
                </div>
                <div className="font-bold text-[clamp(2.5rem,4.2vw,4.4rem)] text-[#1C1917] mt-1">
                  {c.chapter1.headline3}
                </div>
              </h1>
            </div>
          </div>

          {/* Bottom Architectural Console: position: absolute; bottom: 3.5vh; left: 4vw; right: 4vw; z-index: 10; */}
          <div className="absolute bottom-[3vh] sm:bottom-[3.5vh] left-[4vw] right-[4vw] z-10 bg-[#FAF6EE]/85 backdrop-blur-2xl border border-[#1C1917]/14 p-4 sm:p-[18px_28px] shadow-[0_8px_32px_rgba(28,25,23,0.06)] rounded-xl sm:rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1.2fr] items-center gap-5">
              {/* Left Zone */}
              <p className="font-sans text-[0.90rem] text-[#1C1917] leading-[1.5] max-w-[380px] text-left rtl:text-right">
                {c.chapter1.subtitle}
              </p>

              {/* Center Zone: Live Scroll Progress Bar + Status */}
              <div className="flex flex-col items-center justify-center gap-2 px-4 py-2 border-y lg:border-y-0 lg:border-x border-[#1C1917]/12 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6E655F]">
                {/* Live Hairline Progress Bar */}
                <div className="w-48 sm:w-60 h-1.5 bg-[#1C1917]/12 rounded-full overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-[#8C6239] transition-[width] duration-75 rounded-full"
                    style={{ width: '0%' }}
                  />
                </div>
                {/* Status Text */}
                <div className="flex items-center gap-2 text-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239] animate-pulse" />
                  <span ref={progressTextRef} className="font-semibold text-[#1C1917]">
                    0% {c.chapter1.staged || 'STAGED'} // {c.chapter1.scrollToFurnish || 'SCROLL TO FURNISH THIS SPACE'}
                  </span>
                </div>
              </div>

              {/* Right Zone: Sharp Buttons */}
              <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 shrink-0">
                <a
                  href="#problem"
                  className="bg-[#1C1917] text-[#FAF6EE] hover:bg-[#8C6239] px-6 h-[44px] rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>{c.chapter1.exploreCta}</span>
                  <span>&darr;</span>
                </a>

                <a
                  href="#features"
                  className="border border-[#1C1917]/25 text-[#1C1917] hover:border-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF6EE] px-5 h-[44px] rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 inline-flex items-center cursor-pointer"
                >
                  {c.chapter1.discoverCta}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
