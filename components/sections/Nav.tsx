'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

export default function Nav() {
  const { t, lang, toggleLanguage, isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState('hero')
  const [isMuted, setIsMuted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isScrollingRef = useRef(false)

  const navItems = [
    { id: 'problem', label: t.nav.problem },
    { id: 'features', label: t.nav.features },
    { id: 'how-it-works', label: t.nav.process },
    { id: 'sdgs', label: t.nav.impact },
    { id: 'future-plan', label: isRTL ? 'خارطة المستقبل' : 'ROADMAP' },
  ]

  const sectionsToTrack = [
    { id: 'hero' },
    ...navItems,
  ]

  useEffect(() => {
    setIsMuted(soundEngine.isMuted())

    const handleScroll = () => {
      if (isScrollingRef.current) return

      const scrollPos = window.scrollY + 220

      for (let i = sectionsToTrack.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionsToTrack[i].id)
        if (el) {
          const top = el.offsetTop
          if (scrollPos >= top) {
            setActiveSection(sectionsToTrack[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionsToTrack])

  const toggleSound = () => {
    const nextMuted = soundEngine.toggleMute()
    setIsMuted(nextMuted)
  }

  // Smooth scroll handler with Lenis integration
  const scrollToSection = (id: string) => {
    soundEngine.playClickTick()
    setActiveSection(id)
    isScrollingRef.current = true

    const el = document.getElementById(id)
    if (el) {
      const lenis = typeof window !== 'undefined' ? (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string, options?: { offset?: number; duration?: number }) => void } }).__lenis : null
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(el, { offset: id === 'hero' ? 0 : -20, duration: 1.1 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    setTimeout(() => {
      isScrollingRef.current = false
    }, 1100)
  }

  return (
    <>
      {/* =========================================================================
          SINGLE ULTRA-CLEAN ARCHITECTURAL HEADER (72px, Solid Alabaster Glass)
      ========================================================================= */}
      <header
        className="fixed top-0 left-0 right-0 h-[72px] z-[100] border-b border-[#1C1917]/12 px-[4vw] flex items-center justify-between select-none shadow-[0_2px_12px_rgba(28,25,23,0.04)]"
        style={{
          background: 'rgba(246, 241, 234, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Left: Brand Lockup (Single-line, Obsidian Badge + PHAROVIEW | SPATIAL AR) */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('hero')
          }}
          className="flex items-center gap-3 group cursor-pointer shrink-0"
        >
          {/* 34px × 34px obsidian Eye of Horus logo badge */}
          <div className="w-[34px] h-[34px] rounded-[2px] bg-[#1C1917] p-1 border border-[#C89D54]/50 shadow-sm flex items-center justify-center shrink-0 group-hover:border-[#C89D54] transition-colors">
            <img
              src="/logo nice canva.jpg"
              alt="PHAROVIEW Eye of Horus"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-[15px] tracking-[0.14em] text-[#1C1917] uppercase leading-none">
              {t.nav.brand}
            </span>
            <span className="text-[#1C1917]/25 font-light text-xs">|</span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#8C6239] font-semibold uppercase leading-none">
              {isRTL ? 'الواقع المعزز' : 'SPATIAL AR'}
            </span>
          </div>
        </Link>

        {/* Center: 5 Clean Monospace Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-[2.5rem]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                className={`relative py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#1C1917]'
                    : 'text-[#1C1917]/65 hover:text-[#1C1917]'
                }`}
              >
                <span>{item.label}</span>
                {/* Sharp 1.5px Solid Underline on Active Item */}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#1C1917] transition-all duration-200 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        {/* Right: Unified Sharp-Bordered Control Group (h: 38px) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-stretch h-[38px] border border-[#1C1917]/18 bg-transparent rounded-none overflow-hidden">
            {/* Cell 1: Sound Equalizer Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? t.common.soundOff : t.common.soundOn}
              title={isMuted ? t.common.soundOff : t.common.soundOn}
              className="px-3 flex items-center justify-center border-r rtl:border-r-0 rtl:border-l border-[#1C1917]/12 hover:bg-[#1C1917]/5 text-[#1C1917] transition-colors cursor-pointer"
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

            {/* Cell 2: Language Switcher Button (عربي / EN) */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClickTick()
                toggleLanguage()
              }}
              title={lang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
              className="px-3.5 flex items-center justify-center font-mono text-[12px] font-bold text-[#1C1917] hover:text-[#8C6239] hover:bg-[#1C1917]/5 border-r rtl:border-r-0 rtl:border-l border-[#1C1917]/12 transition-colors cursor-pointer uppercase tracking-wider"
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>

            {/* Cell 3: Primary CTA (GET APP ↗) */}
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('cta')
              }}
              className="group flex items-center gap-1.5 bg-[#1C1917] hover:bg-[#8C6239] text-[#F5EEE6] px-[18px] h-full font-mono text-[11px] font-bold tracking-[0.12em] uppercase transition-colors duration-200 cursor-pointer"
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
            className="lg:hidden p-2 rounded-none border border-[#1C1917]/20 bg-[#FAF6EE] text-[#1C1917] hover:bg-[#1C1917]/5 transition-colors cursor-pointer"
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
          MOBILE SLIDE-DOWN DRAWER MENU (< lg)
      ========================================================================= */}
      {mobileMenuOpen && (
        <div
          className="fixed top-[72px] left-0 right-0 z-[99] border-b border-[#1C1917]/15 shadow-2xl p-6 lg:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200"
          style={{
            background: 'rgba(246, 241, 234, 0.98)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#8C6239] font-bold border-b border-[#1C1917]/10 pb-2">
            {isRTL ? 'فهرس الملاحة المعمارية' : 'ARCHITECTURAL NAVIGATION'}
          </p>
          <div className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  scrollToSection(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center justify-between py-3 px-4 rounded-none font-mono text-xs font-bold transition-all text-left rtl:text-right cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#1C1917] text-[#FAF6EE]'
                    : 'text-[#1C1917] hover:bg-[#1C1917]/5'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] opacity-70">[0{idx + 2}]</span>
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
