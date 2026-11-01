'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

export default function Nav() {
  const { t, lang, toggleLanguage, isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState('hero')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [hoveredRulerIndex, setHoveredRulerIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isScrollingRef = useRef(false)

  const navItems = [
    { id: 'problem', num: '02', label: t.nav.problem },
    { id: 'features', num: '03', label: t.nav.features },
    { id: 'how-it-works', num: '04', label: t.nav.process },
    { id: 'sdgs', num: '05', label: t.nav.impact },
    { id: 'future-plan', num: '06', label: isRTL ? 'خارطة المستقبل' : 'ROADMAP' },
  ]

  const rulerStations = [
    { id: 'hero', num: '01', label: isRTL ? 'الفضاء المعماري' : 'HERO' },
    ...navItems,
  ]

  useEffect(() => {
    setIsMuted(soundEngine.isMuted())

    const handleScroll = () => {
      if (isScrollingRef.current) return

      const scrollPos = window.scrollY + 200

      for (let i = rulerStations.length - 1; i >= 0; i--) {
        const el = document.getElementById(rulerStations[i].id)
        if (el) {
          const top = el.offsetTop
          if (scrollPos >= top) {
            setActiveSection(rulerStations[i].id)
            setActiveIndex(i)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [rulerStations])

  const toggleSound = () => {
    const nextMuted = soundEngine.toggleMute()
    setIsMuted(nextMuted)
  }

  // Robust programmatic scroll that handshakes with Lenis smooth scroll
  const scrollToSection = (id: string, index?: number) => {
    soundEngine.playClickTick()
    if (typeof index === 'number') {
      setActiveIndex(index)
    }
    setActiveSection(id)
    isScrollingRef.current = true

    const el = document.getElementById(id)
    if (el) {
      // Check for global Lenis instance initialized in SmoothScrollProvider
      const lenis = typeof window !== 'undefined' ? (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string, options?: { offset?: number; duration?: number }) => void } }).__lenis : null
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(el, { offset: id === 'hero' ? 0 : -30, duration: 1.15 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    setTimeout(() => {
      isScrollingRef.current = false
    }, 1200)
  }

  return (
    <>
      {/* =========================================================================
          TOP ARCHITECTURAL HEADER (Clear, Crisp, Translucent Glass — Zero Obscuration)
      ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 h-[68px] sm:h-[72px] z-[100] bg-[#FAF6EE]/88 backdrop-blur-xl border-b border-[#1C1917]/14 px-[3.5vw] flex items-center justify-between select-none shadow-[0_2px_16px_rgba(28,25,23,0.03)]">
        {/* Left: Brand Lockup */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('hero', 0)
          }}
          className="flex items-center gap-3.5 group cursor-pointer shrink-0"
        >
          {/* Sharp Square 36px Badge */}
          <div className="w-9 h-9 rounded-[2px] bg-[#1C1917] p-1 border border-[#C89D54]/50 shadow-sm flex items-center justify-center shrink-0 group-hover:border-[#C89D54] transition-colors">
            <img
              src="/logo nice canva.jpg"
              alt="PHAROVIEW Eye of Horus"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col text-left rtl:text-right">
            <span className="font-serif font-bold text-[15px] sm:text-[17px] tracking-[0.16em] text-[#1C1917] uppercase leading-none">
              {t.nav.brand}
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-[#8C6239] font-medium uppercase mt-1 leading-none">
              {isRTL ? 'محرك الواقع المعزز // إصدار ٢.٦' : 'AR_ENGINE // V2.6'}
            </span>
          </div>
        </Link>

        {/* Center: Clearly Visible Architectural Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 sm:gap-9">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id, idx + 1)
                }}
                className={`relative py-1 font-mono text-[12px] font-bold uppercase tracking-[0.18em] transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#1C1917]'
                    : 'text-[#1C1917]/65 hover:text-[#1C1917]'
                }`}
              >
                <span>{item.label}</span>
                {/* Active Gold Indicator Underline */}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8C6239] transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        {/* Right: Sharp Architectural Control Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-stretch h-[38px] sm:h-[40px] border border-[#1C1917]/20 bg-[#FAF6EE]/92 shadow-sm rounded-none overflow-hidden">
            {/* Cell 1: 4-Bar Sound Equalizer Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? t.common.soundOff : t.common.soundOn}
              title={isMuted ? t.common.soundOff : t.common.soundOn}
              className="px-3 sm:px-3.5 flex items-center justify-center border-r rtl:border-r-0 rtl:border-l border-[#1C1917]/15 hover:bg-[#1C1917]/5 text-[#1C1917] transition-colors cursor-pointer"
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

            {/* Cell 2: Language Switcher */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClickTick()
                toggleLanguage()
              }}
              title={lang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
              className="px-3 sm:px-3.5 flex items-center justify-center font-mono text-[11px] font-bold text-[#1C1917] hover:text-[#8C6239] hover:bg-[#1C1917]/5 border-r rtl:border-r-0 rtl:border-l border-[#1C1917]/15 transition-colors cursor-pointer uppercase tracking-wider"
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>

            {/* Cell 3: Primary CTA with Micro-Translating Vector Arrow */}
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('cta')
              }}
              className="group flex items-center gap-2 bg-[#1C1917] hover:bg-[#8C6239] text-[#F5EEE6] px-4 sm:px-5 h-full font-mono text-[11px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer"
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

          {/* Mobile Menu Hamburger Button (< lg) */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClickTick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-2 rounded-[2px] border border-[#1C1917]/20 bg-[#FAF6EE] text-[#1C1917] hover:bg-[#1C1917]/5 transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* =========================================================================
          SIGNATURE VERTICAL BLUEPRINT RULER (Side Caliper Navigation)
      ========================================================================= */}
      <nav
        aria-label="Vertical Blueprint Ruler"
        className="fixed top-1/2 -translate-y-1/2 right-[1.8vw] rtl:right-auto rtl:left-[1.8vw] z-[95] select-none pointer-events-auto hidden md:flex flex-col items-center"
      >
        <div className="relative flex flex-col items-center py-2">
          {/* Continuous Architectural Vertical 1px Scale Line */}
          <div className="absolute top-2 bottom-2 w-px bg-[#1C1917]/18 pointer-events-none" />

          {/* Active Sliding Caliper Bracket */}
          <div
            className="absolute -left-6 rtl:-left-auto rtl:-right-6 w-12 pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateY(${activeIndex * 48}px)`,
            }}
          >
            <div className="flex items-center justify-center font-mono text-[10px] font-bold text-[#8C6239] tracking-widest drop-shadow-[0_0_8px_rgba(200,157,84,0.4)]">
              <span>[</span>
              <span className="mx-0.5">{rulerStations[activeIndex].num}</span>
              <span>]</span>
            </div>
          </div>

          {/* Station Nodes */}
          <div className="flex flex-col gap-0 relative z-10">
            {rulerStations.map((st, idx) => {
              const isActive = activeIndex === idx
              const isHovered = hoveredRulerIndex === idx

              return (
                <div
                  key={st.id}
                  className="relative flex items-center justify-center h-[48px] w-[34px]"
                  onMouseEnter={() => {
                    setHoveredRulerIndex(idx)
                    soundEngine.playHoverTick()
                  }}
                  onMouseLeave={() => setHoveredRulerIndex(null)}
                >
                  {/* Subtle intermediate millimeter ticks */}
                  <div className="absolute top-0 w-2 h-px bg-[#1C1917]/20 pointer-events-none" />
                  <div className="absolute top-[16px] w-1.5 h-px bg-[#1C1917]/12 pointer-events-none" />
                  <div className="absolute top-[32px] w-1.5 h-px bg-[#1C1917]/12 pointer-events-none" />

                  {/* Station Node Trigger */}
                  <button
                    type="button"
                    onClick={() => scrollToSection(st.id, idx)}
                    className="relative flex items-center justify-center w-full h-full cursor-pointer group"
                    title={st.label}
                  >
                    <span
                      className={`h-[2px] transition-all duration-300 ${
                        isActive
                          ? 'w-5 bg-[#8C6239]'
                          : isHovered
                          ? 'w-4 bg-[#1C1917]'
                          : 'w-2.5 bg-[#1C1917]/40 group-hover:w-3.5 group-hover:bg-[#1C1917]'
                      }`}
                    />

                    <span
                      className={`absolute right-6 rtl:right-auto rtl:left-6 font-mono text-[9px] font-bold transition-all duration-300 ${
                        isActive
                          ? 'text-[#8C6239] opacity-100 scale-105'
                          : isHovered
                          ? 'text-[#1C1917] opacity-90'
                          : 'text-[#6E655F] opacity-40 group-hover:opacity-90'
                      }`}
                    >
                      {st.num}
                    </span>
                  </button>

                  {/* Frosted Slide-Out Label Card */}
                  <div
                    className={`absolute pointer-events-none transition-all duration-300 z-20 ${
                      isRTL
                        ? 'left-10 origin-left'
                        : 'right-10 origin-right'
                    } ${
                      isHovered || (isActive && hoveredRulerIndex === null)
                        ? 'opacity-100 translate-x-0 scale-100'
                        : 'opacity-0 translate-x-2 rtl:-translate-x-2 scale-95'
                    }`}
                  >
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#FAF6EE]/94 backdrop-blur-md border border-[#1C1917]/16 shadow-[0_4px_16px_rgba(28,25,23,0.08)] whitespace-nowrap">
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

      {/* =========================================================================
          MOBILE SLIDE-DOWN DRAWER MENU (< lg)
      ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed top-[68px] left-0 right-0 z-[99] bg-[#FAF6EE]/98 backdrop-blur-2xl border-b border-[#1C1917]/15 shadow-2xl p-6 lg:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#8C6239] font-bold border-b border-[#1C1917]/10 pb-2">
            {isRTL ? 'فهرس الملاحة المعمارية' : 'ARCHITECTURAL NAVIGATION'}
          </p>
          <div className="flex flex-col gap-2">
            {rulerStations.map((st, idx) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  scrollToSection(st.id, idx)
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center justify-between py-3 px-4 rounded-[2px] font-mono text-xs font-bold transition-all text-left rtl:text-right cursor-pointer ${
                  activeSection === st.id
                    ? 'bg-[#1C1917] text-[#FAF6EE]'
                    : 'text-[#1C1917] hover:bg-[#1C1917]/5'
                }`}
              >
                <span>{st.label}</span>
                <span className="font-mono text-[10px] opacity-70">[{st.num}]</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1C1917]/10 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#6E655F]">PHAROVIEW SPATIAL AR</span>
            <button
              type="button"
              onClick={() => {
                scrollToSection('cta')
                setMobileMenuOpen(false)
              }}
              className="bg-[#1C1917] text-[#FAF6EE] px-4 py-2 font-mono text-xs font-bold uppercase inline-flex items-center gap-1.5"
            >
              <span>{t.nav.getApp}</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
