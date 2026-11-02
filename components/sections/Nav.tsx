'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

interface NavItem {
  id: string
  label: string
}

export default function Nav({ isVisible = true }: { isVisible?: boolean }) {
  const { t, lang, toggleLanguage, isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState('hero')
  const [isMuted, setIsMuted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isScrollingRef = useRef(false)

  const navContainerRef = useRef<HTMLDivElement>(null)
  const hoverPillRef = useRef<HTMLDivElement>(null)
  const activeIndicatorRef = useRef<HTMLDivElement>(null)
  const linksMapRef = useRef<Map<string, HTMLAnchorElement>>(new Map())

  const navItems: NavItem[] = [
    { id: 'problem', label: t.nav.problem },
    { id: 'solution', label: t.nav.features },
    { id: 'how-it-works', label: t.nav.process },
    { id: 'sdgs', label: t.nav.impact },
    { id: 'future-plan', label: isRTL ? 'خارطة المستقبل' : 'ROADMAP' },
  ]

  // Update sound state from engine
  useEffect(() => {
    setIsMuted(soundEngine.isMuted())
  }, [])

  // 1. SCROLL-SYNCED ACTIVE INDICATOR USING GSAP SCROLLTRIGGER
  useEffect(() => {
    if (typeof window === 'undefined') return

    const triggers: ScrollTrigger[] = []

    const sections = [
      { id: 'hero', selector: '#hero' },
      { id: 'problem', selector: '#problem' },
      { id: 'solution', selector: '#solution, #features' },
      { id: 'how-it-works', selector: '#how-it-works' },
      { id: 'sdgs', selector: '#sdgs' },
      { id: 'future-plan', selector: '#future-plan' },
    ]

    // Create ScrollTrigger watchers for precise viewport section detection
    sections.forEach(({ id, selector }) => {
      const el = document.querySelector(selector)
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => {
            if (!isScrollingRef.current) setActiveSection(id)
          },
          onEnterBack: () => {
            if (!isScrollingRef.current) setActiveSection(id)
          },
        })
        triggers.push(trigger)
      }
    })

    return () => {
      triggers.forEach((tr) => tr.kill())
    }
  }, [lang, isRTL])

  // Morph active indicator underline to match activeSection
  const updateActiveIndicator = useCallback(
    (sectionId: string, immediate = false) => {
      const linkEl = linksMapRef.current.get(sectionId)
      const indicator = activeIndicatorRef.current
      if (!indicator) return

      if (linkEl && sectionId !== 'hero') {
        const targetX = linkEl.offsetLeft
        const targetWidth = linkEl.offsetWidth

        gsap.to(indicator, {
          x: targetX,
          width: targetWidth,
          opacity: 1,
          duration: immediate ? 0 : 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      } else {
        // Hero section or unlinked: hide active underline smoothly
        gsap.to(indicator, {
          opacity: 0,
          duration: immediate ? 0 : 0.3,
          overwrite: 'auto',
        })
      }
    },
    []
  )

  useEffect(() => {
    updateActiveIndicator(activeSection)
  }, [activeSection, updateActiveIndicator, lang, isRTL])

  // Reposition on window resize
  useEffect(() => {
    const handleResize = () => updateActiveIndicator(activeSection, true)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeSection, updateActiveIndicator])

  // 2. MAGNETIC HOVER PHYSICS FOR LINKS
  const handleLinkMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)

    gsap.to(el, {
      x: relX * 0.35,
      y: relY * 0.35,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    soundEngine.playHoverTick()
    const el = e.currentTarget

    // Animate fluid glassmorphic hover pill behind the hovered link
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        x: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
  }

  const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = e.currentTarget

    // Snap back link with rubber-band elastic physics
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1.0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.3)',
      overwrite: 'auto',
    })
  }

  // When mouse leaves the entire nav capsule, fade out hover pill
  const handleNavMouseLeave = () => {
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

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
        className={`fixed top-0 left-0 right-0 h-[72px] z-[100] border-b border-[#1C1917]/12 px-[4vw] flex items-center justify-between select-none shadow-[0_2px_12px_rgba(28,25,23,0.04)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
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
            <span className="font-serif font-semibold text-[14px] sm:text-[15px] tracking-[0.14em] text-[#1C1917] uppercase leading-none">
              {t.nav.brand}
            </span>
            <span className="text-[#1C1917]/25 font-light text-xs hidden sm:inline">|</span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#8C6239] font-semibold uppercase leading-none hidden sm:inline">
              {isRTL ? 'الواقع المعزز' : 'SPATIAL AR'}
            </span>
          </div>
        </Link>

        {/* Center: 3. Glassmorphic Navigation Island with Magnetic Links */}
        <nav
          ref={navContainerRef}
          onMouseLeave={handleNavMouseLeave}
          className="relative hidden lg:flex items-center p-[4px_6px] rounded-[2px] border border-[#1C1917]/12 shadow-[0_2px_8px_rgba(28,25,23,0.02)]"
          style={{
            background: 'rgba(245, 238, 230, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Fluid Glassmorphic Hover Pill (Spring physics behind hovered link) */}
          <div
            ref={hoverPillRef}
            className="absolute top-[4px] bottom-[4px] rounded-[2px] bg-[#1C1917]/[0.06] border border-[#1C1917]/10 pointer-events-none opacity-0"
            style={{ width: 0, left: 0 }}
          />

          {/* Active Section Underline Indicator (Morphs width & position to active section) */}
          <div
            ref={activeIndicatorRef}
            className="absolute bottom-[2px] h-[2px] bg-[#1C1917] rounded-none pointer-events-none opacity-0"
            style={{ width: 0, left: 0 }}
          />

          {/* Magnetic Navigation Links */}
          <div className="relative z-10 flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  ref={(el) => {
                    if (el) linksMapRef.current.set(item.id, el)
                    else linksMapRef.current.delete(item.id)
                  }}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                  onMouseMove={(e) => handleLinkMouseMove(e, item.id)}
                  onMouseEnter={(e) => handleLinkMouseEnter(e, item.id)}
                  onMouseLeave={(e) => handleLinkMouseLeave(e, item.id)}
                  className={`relative px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer select-none inline-block ${
                    isActive
                      ? 'text-[#1C1917]'
                      : 'text-[#1C1917]/65 hover:text-[#8C6239]'
                  }`}
                >
                  <span className="relative z-10 block pointer-events-none">
                    {item.label}
                  </span>
                </a>
              )
            })}
          </div>
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
              className="hidden sm:flex group items-center gap-1.5 bg-[#1C1917] hover:bg-[#8C6239] text-[#F5EEE6] px-[16px] sm:px-[18px] h-full font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase transition-colors duration-200 cursor-pointer shrink-0"
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
            className="lg:hidden p-2.5 rounded-none border border-[#1C1917]/20 bg-[#FAF6EE] text-[#1C1917] hover:bg-[#1C1917]/5 active:bg-[#1C1917]/10 transition-colors cursor-pointer shrink-0"
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
          MOBILE SLIDE-DOWN DRAWER MENU & BACKDROP (< lg)
      ========================================================================= */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay to close drawer on tap */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[98] bg-[#1C1917]/40 backdrop-blur-sm lg:hidden transition-opacity"
            aria-hidden="true"
          />

          <div
            className="fixed top-[72px] left-0 right-0 z-[99] border-b border-[#1C1917]/15 shadow-2xl p-5 sm:p-6 lg:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200"
            style={{
              background: 'rgba(246, 241, 234, 0.98)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#8C6239] font-bold border-b border-[#1C1917]/10 pb-2">
              {isRTL ? 'فهرس الملاحة المعمارية' : 'ARCHITECTURAL NAVIGATION'}
            </p>
            <div className="flex flex-col gap-1.5">
              {navItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    scrollToSection(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex items-center justify-between py-3 px-4 min-h-[46px] rounded-none font-mono text-xs font-bold transition-all text-left rtl:text-right cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-[#1C1917] text-[#FAF6EE]'
                      : 'text-[#1C1917] hover:bg-[#1C1917]/5 active:bg-[#1C1917]/10'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] opacity-70">[0{idx + 2}]</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1C1917]/10 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] text-[#6E655F]">PHAROVIEW SPATIAL AR</span>
              <button
                type="button"
                onClick={() => {
                  scrollToSection('cta')
                  setMobileMenuOpen(false)
                }}
                className="bg-[#1C1917] hover:bg-[#8C6239] text-[#FAF6EE] px-4 py-2.5 min-h-[42px] font-mono text-xs font-bold uppercase inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>{t.nav.getApp}</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
