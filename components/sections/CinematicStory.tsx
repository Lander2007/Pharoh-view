'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneState, useSceneState } from '@/lib/sceneState'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicStory() {
  const { t, isRTL, lang } = useLanguage()
  const { materialVariant } = useSceneState()
  const c = t.cinematic

  const heroPinContainerRef = useRef<HTMLDivElement>(null!)
  const heroSectionRef = useRef<HTMLElement>(null!)
  const headlineRef = useRef<HTMLDivElement>(null!)
  const eyebrowRef = useRef<HTMLParagraphElement>(null!)
  const progressBarRef = useRef<HTMLDivElement>(null!)
  const progressTextRef = useRef<HTMLSpanElement>(null!)
  const progressStationRef = useRef<HTMLSpanElement>(null!)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const trigger = ScrollTrigger.create({
      trigger: heroPinContainerRef.current,
      start: 'top top',
      end: '+=180%',
      pin: heroSectionRef.current,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress // 0.0 to 1.0
        sceneState.setHeroFurnishProgress(p)

        // Stage 1: Fade out top headline gracefully (0% to 25%)
        if (headlineRef.current) {
          const fadeP = Math.min(1, p / 0.22)
          headlineRef.current.style.opacity = `${Math.max(0, 1 - fadeP)}`
          headlineRef.current.style.transform = `translateY(-${fadeP * 24}px)`
          headlineRef.current.style.pointerEvents = fadeP > 0.85 ? 'none' : 'auto'
        }

        // Dynamic Eyebrow text reflecting staging progression
        if (eyebrowRef.current) {
          if (p < 0.25) {
            eyebrowRef.current.innerText = c.chapter1.eyebrowEmpty || (isRTL ? '— [ ٠١ / الفراغ المعماري ]' : '— [ 01 / THE EMPTY SPACE ]')
          } else if (p < 0.75) {
            eyebrowRef.current.innerText = c.chapter1.eyebrowStaging || (isRTL ? '— [ ٠١ / جاري التموضع المكاني بالواقع المعزز ]' : '— [ 01 / AR STAGING IN PROGRESS ]')
          } else {
            eyebrowRef.current.innerText = c.chapter1.eyebrowFurnished || (isRTL ? '— [ ٠١ / تم تأثيث الفراغ بالكامل ]' : '— [ 01 / SPACE FURNISHED ]')
          }
        }

        // Live Scroll Progress Bar in Bottom Console
        const pct = Math.round(p * 100)
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${pct}%`
        }

        if (progressTextRef.current) {
          if (p < 0.99) {
            progressTextRef.current.innerText = isRTL
              ? `• مرر لتأثيث هذا الفراغ`
              : `• SCROLL TO FURNISH THIS SPACE`
          } else {
            progressTextRef.current.innerText = isRTL
              ? `• تم تأثيث الفراغ بالكامل`
              : `• SPACE FULLY FURNISHED`
          }
        }

        if (progressStationRef.current) {
          if (p < 0.25) {
            progressStationRef.current.innerText = '[ 01 // 06 ]'
          } else if (p < 0.50) {
            progressStationRef.current.innerText = `[ 01 // ${pct}% RUG ]`
          } else if (p < 0.75) {
            progressStationRef.current.innerText = `[ 01 // ${pct}% CHAIR ]`
          } else {
            progressStationRef.current.innerText = `[ 01 // 100% COMPLETE ]`
          }
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [c, isRTL, lang])

  return (
    <div className="relative z-10 w-full select-none text-[#1C1917]">
      {/* =========================================================================
          HERO — THE ARCHITECTURAL SPACE & SCROLL-DRIVEN AR ROOM FURNISHING SEQUENCE
          Pinned GSAP ScrollTrigger Sequence (180vh distance, scrub: 1)
          Unobstructed 3D room with Top-Left Editorial Header & Bottom Architectural Console Dock
      ========================================================================= */}
      <div ref={heroPinContainerRef} className="relative w-full">
        <section
          ref={heroSectionRef}
          id="hero"
          className="relative w-full h-screen h-[100dvh] max-h-screen overflow-hidden select-none"
        >
          {/* =====================================================================
              1. TOP-LEFT EDITORIAL HEADLINE (top: 110px; left: 4vw; z-index: 20;)
          ===================================================================== */}
          <div className="absolute top-[110px] left-[4vw] rtl:left-auto rtl:right-[4vw] z-20 max-w-xl text-left rtl:text-right pointer-events-none">
            {/* Dynamic Eyebrow */}
            <div className="flex items-center gap-3 mb-3 pointer-events-auto">
              <span className="w-6 h-px bg-[#8C6239]" />
              <p
                ref={eyebrowRef}
                className="font-mono text-[11px] font-semibold tracking-[0.2em] rtl:tracking-normal text-[#8C6239] uppercase"
              >
                {c.chapter1.eyebrowEmpty || (isRTL ? '— [ ٠١ / الفراغ المعماري ]' : '— [ 01 / THE EMPTY SPACE ]')}
              </p>
            </div>

            {/* 2-Line Headline: Line 1: Your space. Your vision. | Line 2: Before you buy. */}
            <div ref={headlineRef} className="transition-opacity pointer-events-auto">
              <h1 className="font-serif leading-[1.04] tracking-tight rtl:tracking-normal text-[#1C1917]">
                <div className="flex flex-wrap items-baseline gap-x-3.5">
                  <span className="font-bold text-[clamp(2.4rem,4.2vw,4.2rem)] text-[#1C1917]">
                    {c.chapter1.headline1}
                  </span>
                  <span className="font-normal italic rtl:not-italic text-[clamp(2.4rem,4.2vw,4.2rem)] text-[#8C6239]">
                    {c.chapter1.headline2}
                  </span>
                </div>
                <div className="font-bold text-[clamp(2.4rem,4.2vw,4.2rem)] text-[#1C1917] mt-1">
                  {c.chapter1.headline3}
                </div>
              </h1>
            </div>
          </div>

          {/* =====================================================================
              2. BOTTOM ARCHITECTURAL CONSOLE DOCK
              position: absolute; bottom: 3.5vh; left: 4vw; right: 4vw; z-index: 20;
              background: rgba(246, 241, 234, 0.90); backdrop-filter: blur(16px);
              border: 1px solid rgba(28, 25, 23, 0.15); padding: 18px 28px;
              display: grid; grid-template-columns: 1.2fr auto 1.2fr; align-items: center; gap: 2rem;
          ===================================================================== */}
          <div
            className="absolute bottom-[3.5vh] left-[4vw] right-[4vw] z-20 border border-[#1C1917]/15 p-4 sm:p-[18px_28px] shadow-[0_8px_32px_rgba(28,25,23,0.06)] rounded-none pointer-events-auto"
            style={{
              background: 'rgba(246, 241, 234, 0.90)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1.2fr] items-center gap-5 lg:gap-8">
              {/* Left Column: Description */}
              <p className="font-sans text-[0.92rem] leading-[1.5] text-[#1C1917] max-w-[420px] text-left rtl:text-right">
                {isRTL
                  ? 'جرّب أثاثك بمقياس واقعي ١:١ داخل غرفتك قبل الشراء. دقة ليدار بالميليمتر. بدون مرتجعات.'
                  : 'Experience true-to-scale 3D furniture inside your actual room before you commit. Millimeter LiDAR precision. Zero returns.'}
              </p>

              {/* Center Column: Animated Scroll Indicator & Station Counter */}
              <div className="flex flex-col items-center justify-center gap-2 px-3 sm:px-6 py-2 border-y lg:border-y-0 lg:border-x border-[#1C1917]/12 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6E655F]">
                {/* Thin Architectural Progress Bar */}
                <div className="w-44 sm:w-56 h-1.5 bg-[#1C1917]/12 rounded-none overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-[#8C6239] transition-[width] duration-75 rounded-none"
                    style={{ width: '0%' }}
                  />
                </div>

                {/* Status + Station Counter */}
                <div className="flex items-center gap-2.5 text-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239] animate-pulse" />
                  <span ref={progressTextRef} className="font-semibold text-[#1C1917]">
                    {isRTL ? '• مرر لتأثيث هذا الفراغ' : '• SCROLL TO FURNISH THIS SPACE'}
                  </span>
                  <span ref={progressStationRef} className="text-[#8C6239] font-bold">
                    [ 01 // 06 ]
                  </span>
                </div>
              </div>

              {/* Right Column: Sharp Right-Aligned CTA Buttons */}
              <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 shrink-0">
                {/* Button 1: DOWNLOAD FOR IOS */}
                <button
                  type="button"
                  onClick={() => sceneState.openIosModal()}
                  className="bg-[#1C1917] text-[#F5EEE6] hover:bg-[#8C6239] h-[44px] px-[22px] rounded-none font-mono text-[11px] font-bold uppercase tracking-[0.12em] border border-[#1C1917] transition-colors duration-200 inline-flex items-center justify-center cursor-pointer shadow-sm"
                >
                  {isRTL ? 'تحميل لنظام IOS' : 'DOWNLOAD FOR IOS'}
                </button>

                {/* Button 2: DOWNLOAD FOR ANDROID */}
                <a
                  href="/app-release.apk"
                  download="PharoView-AR.apk"
                  className="bg-transparent text-[#1C1917] hover:bg-[#1C1917] hover:text-[#F5EEE6] h-[44px] px-[22px] rounded-none font-mono text-[11px] font-bold uppercase tracking-[0.12em] border border-[#1C1917] transition-colors duration-200 inline-flex items-center justify-center cursor-pointer"
                >
                  {isRTL ? 'تحميل لنظام ANDROID' : 'DOWNLOAD FOR ANDROID'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
