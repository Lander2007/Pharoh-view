'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

export default function Nav() {
  const { t, lang, toggleLanguage, isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState('hero')
  const [isMuted, setIsMuted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'problem', label: t.nav.problem },
    { id: 'features', label: t.nav.features },
    { id: 'how-it-works', label: t.nav.process },
    { id: 'sdgs', label: t.nav.impact },
    { id: 'future-plan', label: isRTL ? 'خارطة المستقبل' : 'ROADMAP' },
  ]

  useEffect(() => {
    setIsMuted(soundEngine.isMuted())

    const handleScroll = () => {
      const sections = ['hero', 'problem', 'features', 'how-it-works', 'value', 'sdgs', 'future-plan', 'cta']
      const scrollPos = window.scrollY + 220

      for (const sec of sections) {
        const el = document.getElementById(sec)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSound = () => {
    const nextMuted = soundEngine.toggleMute()
    setIsMuted(nextMuted)
  }

  return (
    <>
      {/* Floating Luxury Architectural Glass Dock (z-[100]) */}
      <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] sm:w-[calc(100%-3.5rem)] max-w-7xl h-[62px] sm:h-[66px] rounded-full bg-[#FAF6EE]/85 backdrop-blur-2xl border border-[#1C1917]/10 shadow-[0_12px_36px_rgba(28,25,23,0.08),0_1px_3px_rgba(28,25,23,0.04)] px-4 sm:px-6 flex items-center justify-between select-none transition-all duration-300">
        {/* Left: Brand Lockup with Eye of Horus & Live Status Indicator */}
        <Link
          href="/"
          onClick={() => soundEngine.playClickTick()}
          className="flex items-center gap-3 group cursor-pointer shrink-0"
        >
          {/* Logo Badge */}
          <div className="w-8 h-8 rounded-full bg-[#1C1917] p-1 border border-[#8C6239]/40 shadow-sm flex items-center justify-center shrink-0 group-hover:border-[#8C6239] transition-colors">
            <img
              src="/logo nice canva.jpg"
              alt="PHAROVIEW Eye of Horus"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <span className="font-serif font-bold text-[16px] sm:text-[18px] tracking-[0.16em] text-[#1C1917] uppercase">
            {t.nav.brand}
          </span>
        </Link>

        {/* Center: Interactive Architectural Floating Pills (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[#1C1917]/[0.03] border border-[#1C1917]/[0.06]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id || (item.id === 'sdgs' && activeSection === 'value')
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => soundEngine.playClickTick()}
                onMouseEnter={() => soundEngine.playHoverTick()}
                className={`relative px-4 py-1.5 rounded-full font-mono text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1917] text-[#FAF6EE] shadow-sm'
                    : 'text-[#1C1917]/70 hover:text-[#1C1917] hover:bg-[#1C1917]/[0.06]'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Right: Sound Equalizer, Language Switcher & High-Contrast CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Animated Audio Equalizer Pill */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? t.common.soundOff : t.common.soundOn}
            title={isMuted ? t.common.soundOff : t.common.soundOn}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer text-[11px] font-mono ${
              isMuted
                ? 'border-[#1C1917]/15 bg-white/40 text-[#6E655F] hover:bg-white/80'
                : 'border-[#8C6239]/40 bg-[#8C6239]/10 text-[#8C6239] hover:bg-[#8C6239]/20 shadow-sm'
            }`}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2" />
              </svg>
            ) : (
              <span className="flex items-end gap-[2.5px] h-3">
                <span className="w-[2px] h-2 bg-[#8C6239] animate-pulse" />
                <span className="w-[2px] h-3 bg-[#8C6239] animate-pulse delay-75" />
                <span className="w-[2px] h-1.5 bg-[#8C6239] animate-pulse delay-150" />
              </span>
            )}
            <span className="text-[10px] font-bold uppercase hidden md:inline">
              {isMuted ? 'MUTE' : 'AUDIO'}
            </span>
          </button>

          {/* Minimal Language Switcher Pill */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClickTick()
              toggleLanguage()
            }}
            className="px-3.5 py-1.5 rounded-full border border-[#1C1917]/15 bg-white/50 hover:bg-[#1C1917] hover:text-[#FAF6EE] font-mono text-[11px] font-bold text-[#1C1917] transition-all duration-200 cursor-pointer shadow-sm tracking-wider uppercase"
            title={lang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* High-End Architectural Primary CTA */}
          <a
            href="#cta"
            onClick={() => soundEngine.playClickTick()}
            className="relative group overflow-hidden bg-[#1C1917] hover:bg-[#8C6239] text-[#FAF6EE] px-4 sm:px-5 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>{t.nav.getApp}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              &nearr;
            </span>
          </a>

          {/* Mobile Hamburger Toggle (< lg) */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClickTick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-full border border-[#1C1917]/15 bg-white/50 text-[#1C1917] hover:bg-[#1C1917]/5 transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-[99] rounded-2xl bg-[#FAF6EE]/95 backdrop-blur-2xl border border-[#1C1917]/15 shadow-2xl p-6 lg:hidden flex flex-col gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#8C6239] font-bold border-b border-[#1C1917]/10 pb-2">
            NAVIGATION
          </p>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  soundEngine.playClickTick()
                  setMobileMenuOpen(false)
                }}
                className="py-2.5 px-3 rounded-lg font-mono text-xs font-semibold text-[#1C1917] hover:bg-[#1C1917]/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-[#1C1917]/10 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#6E655F]">PHAROVIEW SPATIAL AR</span>
            <a
              href="#cta"
              onClick={() => {
                soundEngine.playClickTick()
                setMobileMenuOpen(false)
              }}
              className="bg-[#1C1917] text-[#FAF6EE] px-4 py-2 rounded-full font-mono text-xs font-bold uppercase"
            >
              {t.nav.getApp} &nearr;
            </a>
          </div>
        </div>
      )}
    </>
  )
}
