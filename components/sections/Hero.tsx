'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-6 lg:px-12"
      style={{ background: 'transparent' }}
    >
      {/* Subtle, soft asymmetric backdrop only behind text on left to ensure maximum legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 75% at 20% 50%, rgba(239,230,216,0.92) 0%, rgba(239,230,216,0.55) 55%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Asymmetric Left-Aligned Editorial Text Block */}
        <div className="lg:col-span-7 max-w-2xl text-left">
          {/* Eyebrow Label with Monospace Type Pairing */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-clay/40" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-clay font-medium">
              [ 01 / AR SPATIAL SCANNER ]
            </p>
          </div>

          {/* Primary Statement */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] font-bold text-ink leading-[1.02] tracking-tight mb-6">
            Before you pay&mdash;
            <br />
            <span className="font-serif font-normal italic text-clay">
              see it in your home.
            </span>
          </h1>

          {/* Body Text */}
          <p className="font-sans text-base sm:text-lg text-ink/75 max-w-xl leading-relaxed mb-8">
            PHAROVIEW uses augmented reality to place true-to-scale furniture in your space
            before you commit. No surprises. No returns. True spatial certainty.
          </p>

          {/* Technical Specs Metadata Strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-3.5 border-y border-clay/20 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/65 mb-9">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>LiDAR Mapping</span>
            </div>
            <span className="text-clay/40">&bull;</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-clay" />
              <span>Millimeter Scale</span>
            </div>
            <span className="text-clay/40">&bull;</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ink/70" />
              <span>Zero Returns</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-ink text-sand font-mono text-xs uppercase tracking-wider px-6 py-3.5 hover:bg-gold hover:text-ink transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Download for iOS</span>
            </a>

            <a
              href="#"
              className="group inline-flex items-center gap-3 border border-ink/40 text-ink font-mono text-xs uppercase tracking-wider px-6 py-3.5 hover:border-gold hover:text-gold transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M3.18 23.76c.33.18.72.2 1.08.04l12.2-6.93-2.51-2.51-10.77 9.4zm-.96-20.49c-.14.25-.22.55-.22.88v19.7c0 .33.08.63.22.88l.08.07L13.5 12.5v-.25L2.3 3.2l-.08.07zM20.6 10.3l-2.46-1.4-2.77 2.77 2.77 2.77 2.49-1.42c.71-.4.71-1.06-.03-1.72zM4.26.22L16.46 7.17l-2.51 2.51L3.18.27c.36-.16.75-.14 1.08-.05z" />
              </svg>
              <span>Android</span>
            </a>

            <Link
              href="/chair"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold hover:text-clay transition-colors px-3 py-2"
            >
              <span>Inspect 3D Geometry &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Open spatial focal area for 3D Chair and Radial Progress Ring */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-end items-end h-full pointer-events-none pb-12">
          <div className="bg-sand/80 backdrop-blur-md p-4 border border-clay/20 text-right font-mono text-[10px] tracking-wider text-ink/75 max-w-[220px]">
            <p className="font-bold text-ink text-xs mb-1">SPECIMEN [01]</p>
            <p className="text-clay">SCANDINAVIAN ARMCHAIR</p>
            <p className="text-ink/50 mt-1">100% CONTIGUOUS SOLID</p>
            <p className="text-gold mt-1">SCROLL TO FILL FACETS</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink">Scroll</span>
        <div className="w-px h-7 bg-ink/40 animate-pulse" />
      </div>
    </section>
  )
}
