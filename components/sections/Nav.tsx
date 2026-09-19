'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-sand/90 backdrop-blur-md border-b border-clay/20 py-3.5 shadow-sm'
          : 'bg-transparent border-b border-clay/10 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand with typographic glyph & letter-spacing */}
        <Link href="/" className="group flex items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gold transition-transform duration-300 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="12,3 2,21 22,21" fill="currentColor" fillOpacity="0.15" />
            <line x1="12" y1="3" x2="12" y2="21" stroke="#8B5E3C" strokeWidth="1.5" />
          </svg>
          <div className="flex items-baseline">
            <span className="font-serif font-bold text-xl tracking-[0.24em] text-ink uppercase">
              PHAROVIEW
            </span>
            <span className="font-mono text-[10px] tracking-[0.28em] text-clay/70 uppercase hidden sm:inline ml-3 pl-3 border-l border-clay/30">
              AR EDITION
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#problem"
            className="font-mono text-xs uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
          >
            Problem
          </a>
          <a
            href="#features"
            className="font-mono text-xs uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="font-mono text-xs uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
          >
            Process
          </a>
          <a
            href="#sustainability"
            className="font-mono text-xs uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
          >
            Impact
          </a>

          {/* 3D Chair link with deliberate active chip indicator */}
          <Link
            href="/chair"
            className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/35 text-ink font-mono text-xs uppercase tracking-wider font-semibold hover:bg-gold/25 hover:border-gold transition-all"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            <span>3D Model</span>
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] font-medium bg-ink text-sand hover:bg-gold hover:text-ink transition-all duration-300"
          >
            <span>Get App</span>
            <span className="text-gold group-hover:text-ink transition-colors">&rarr;</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
