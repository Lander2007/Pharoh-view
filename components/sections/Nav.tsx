'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

export default function Nav() {
  const { t, lang, toggleLanguage, isRTL } = useLanguage()
  const [activeStationIndex, setActiveStationIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [hoveredStation, setHoveredStation] = useState<number | null>(null)
  const isScrollingRef = useRef(false)

  const stations = [
    { id: 'hero', num: '01', label: isRTL ? 'الفضاء المعماري' : 'HERO' },
    { id: 'problem', num: '02', label: t.nav.problem },
    { id: 'features', num: '03', label: t.nav.features },
    { id: 'how-it-works', num: '04', label: t.nav.process },
    { id: 'sdgs', num: '05', label: t.nav.impact },
    { id: 'future-plan', num: '06', label: isRTL ? 'خارطة المستقبل' : 'ROADMAP' },
  ]

  useEffect(() => {
    setIsMuted(soundEngine.isMuted())

    const handleScroll = () => {
      if (isScrollingRef.current) return

      const scrollPos = window.scrollY + window.innerHeight * 0.35

      for (let i = stations.length - 1; i >= 0; i--) {
        const el = document.getElementById(stations[i].id)
        if (el) {
          const top = el.offsetTop
          if (scrollPos >= top) {
            setActiveStationIndex(i)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [stations])

  const toggleSound = () => {
    const nextMuted = soundEngine.toggleMute()
    setIsMuted(nextMuted)
  }

  const scrollToStation = (id: string, index: number) => {
    soundEngine.playClickTick()
    setActiveStationIndex(index)
    isScrollingRef.current = true

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    setTimeout(() => {
      isScrollingRef.current = false
    }, 850)
  }

  return (
    <>
      {/* =========================================================================
          1. TOP-LEFT CORNER HUD: Architectural Brand Lockup (Zero Pill Wrapper!)
      ========================================================================= */}
      <div className="fixed top-6 sm:top-7 left-[3.5vw] rtl:left-auto rtl:right-[3.5vw] z-[100] select-none pointer-events-auto">
        <Link
          href="/"
          onClick={() => {
            soundEngine.playClickTick()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          {/* Sharp 36px x 36px Obsidian Badge (border-radius: 2px) */}
          <div className="w-9 h-9 rounded-[2px] bg-[#1C1917] p-1 border border-[#C89D54]/40 shadow-sm flex items-center justify-center shrink-0 group-hover:border-[#C89D54] transition-colors">
            <img
              src="/logo nice canva.jpg"
              alt="PHAROVIEW Eye of Horus"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Brand Typography + Telemetry */}
          <div className="flex flex-col text-left rtl:text-right">
            <span className="font-serif font-bold text-[14px] sm:text-[15px] tracking-[0.16em] text-[#1C1917] uppercase leading-none">
              {t.nav.brand}
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-[#8C6239] font-medium uppercase mt-1 leading-none">
              {isRTL ? 'محرك الواقع المعزز // إصدار ٢.٦' : 'AR_ENGINE // V2.6'}
            </span>
          </div>
        </Link>
      </div>

      {/* =========================================================================
          2. TOP-RIGHT CORNER HUD: Sharp-Edged Architectural Control Group
             (border-radius: 0px, border: 1px solid rgba(28,25,23,0.18), height: 40px)
      ========================================================================= */}
      <div className="fixed top-6 sm:top-7 right-[3.5vw] rtl:right-auto rtl:left-[3.5vw] z-[100] select-none pointer-events-auto">
        <div className="flex items-stretch h-[40px] border border-[#1C1917]/20 bg-[#FAF6EE]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(28,25,23,0.06)] rounded-none overflow-hidden">
          {/* Cell 1: Sound Toggle with Animated 4-Bar Equalizer */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? t.common.soundOff : t.common.soundOn}
            title={isMuted ? t.common.soundOff : t.common.soundOn}
            className="px-3.5 flex items-center justify-center border-r rtl:border-r-0 rtl:border-l border-[#1C1917]/15 hover:bg-[#1C1917]/5 text-[#1C1917] transition-colors cursor-pointer"
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2" />
              </svg>
            ) : (
              <div className="flex items-end gap-[2px] h-3.5">
                <span className="w-[2px] h-2 bg-[#8C6239] animate-pulse" />
                <span className="w-[2px] h-3.5 bg-[#8C6239] animate-pulse delay-75" />
                <span className="w-[2px] h-2.5 bg-[#8C6239] animate-pulse delay-150" />
                <span className="w-[2px] h-3 bg-[#8C6239] animate-pulse delay-100" />
              </div>
            )}
          </button>

          {/* Cell 2: Language Switcher Cell */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClickTick()
              toggleLanguage()
            }}
            title={lang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
            className="px-3.5 flex items-center justify-center font-mono text-[11px] font-bold text-[#1C1917] hover:text-[#8C6239] hover:bg-[#1C1917]/5 border-r rtl:border-r-0 rtl:border-l border-[#1C1917]/15 transition-colors cursor-pointer uppercase tracking-wider"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Cell 3: Primary CTA Cell (GET APP ↗ with Micro-Translating Vector Arrow) */}
          <a
            href="#cta"
            onClick={() => soundEngine.playClickTick()}
            className="group flex items-center gap-2 bg-[#1C1917] hover:bg-[#8C6239] text-[#F5EEE6] px-5 h-full font-mono text-[11px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer"
          >
            <span>{t.nav.getApp}</span>
            <svg
              viewBox="0 0 12 12"
              className="w-3 h-3 fill-none stroke-current stroke-[1.8] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" />
            </svg>
          </a>
        </div>
      </div>

      {/* =========================================================================
          3. SIGNATURE NAVIGATION: Interactive Vertical Blueprint Ruler
             (fixed along edge, synced to ScrollTrigger progress)
      ========================================================================= */}
      <nav
        aria-label="Blueprint Section Ruler"
        className="fixed top-1/2 -translate-y-1/2 right-[2vw] rtl:right-auto rtl:left-[2vw] z-[95] select-none pointer-events-auto hidden sm:flex flex-col items-center"
      >
        {/* Continuous Scale Column */}
        <div className="relative flex flex-col items-center">
          {/* Continuous Architectural Vertical 1px Scale Line */}
          <div className="absolute top-2 bottom-2 w-px bg-[#1C1917]/18 pointer-events-none" />

          {/* Active Sliding Caliper Bracket Highlight */}
          <div
            className="absolute -left-6 rtl:-left-auto rtl:-right-6 w-12 pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateY(${activeStationIndex * 48}px)`,
            }}
          >
            <div className="flex items-center justify-center font-mono text-[10px] font-bold text-[#8C6239] tracking-widest drop-shadow-[0_0_8px_rgba(200,157,84,0.4)]">
              <span>[</span>
              <span className="mx-0.5">{stations[activeStationIndex].num}</span>
              <span>]</span>
            </div>
          </div>

          {/* Station Nodes */}
          <div className="flex flex-col gap-0 relative z-10">
            {stations.map((st, idx) => {
              const isActive = activeStationIndex === idx
              const isHovered = hoveredStation === idx

              return (
                <div
                  key={st.id}
                  className="relative flex items-center justify-center h-[48px] w-[34px]"
                  onMouseEnter={() => {
                    setHoveredStation(idx)
                    soundEngine.playHoverTick()
                  }}
                  onMouseLeave={() => setHoveredStation(null)}
                >
                  {/* Intermediate Millimeter Measurement Ticks (Subtle Architectural Caliper) */}
                  <div className="absolute top-0 w-2 h-px bg-[#1C1917]/20 pointer-events-none" />
                  <div className="absolute top-[16px] w-1.5 h-px bg-[#1C1917]/12 pointer-events-none" />
                  <div className="absolute top-[32px] w-1.5 h-px bg-[#1C1917]/12 pointer-events-none" />

                  {/* Main Station Trigger Button */}
                  <button
                    type="button"
                    onClick={() => scrollToStation(st.id, idx)}
                    className="relative flex items-center justify-center w-full h-full cursor-pointer group"
                    title={st.label}
                  >
                    {/* Tick Mark Node */}
                    <span
                      className={`h-[2px] transition-all duration-300 ${
                        isActive
                          ? 'w-5 bg-[#8C6239]'
                          : isHovered
                          ? 'w-4 bg-[#1C1917]'
                          : 'w-2.5 bg-[#1C1917]/40 group-hover:w-3.5 group-hover:bg-[#1C1917]'
                      }`}
                    />

                    {/* Monospace Index Number */}
                    <span
                      className={`absolute right-6 rtl:right-auto rtl:left-6 font-mono text-[9px] font-bold transition-all duration-300 ${
                        isActive
                          ? 'text-[#8C6239] opacity-100 scale-105'
                          : isHovered
                          ? 'text-[#1C1917] opacity-80'
                          : 'text-[#6E655F] opacity-35 group-hover:opacity-80'
                      }`}
                    >
                      {st.num}
                    </span>
                  </button>

                  {/* Frosted Architectural Slide-Out Label Card (Hover & Active) */}
                  <div
                    className={`absolute pointer-events-none transition-all duration-300 z-20 ${
                      isRTL
                        ? 'left-10 origin-left'
                        : 'right-10 origin-right'
                    } ${
                      isHovered || (isActive && hoveredStation === null)
                        ? 'opacity-100 translate-x-0 scale-100'
                        : 'opacity-0 translate-x-2 rtl:-translate-x-2 scale-95'
                    }`}
                  >
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#FAF6EE]/92 backdrop-blur-md border border-[#1C1917]/15 shadow-[0_4px_16px_rgba(28,25,23,0.08)] whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239]" />
                      <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-[#1C1917]">
                        {st.label}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
