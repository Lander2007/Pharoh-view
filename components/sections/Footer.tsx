'use client'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sand-deep border-t border-clay/15 pt-20 pb-10 px-6">
      {/* Pyramid watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
        >
          <polygon points="160,320 460,120 760,320" fill="#8B5E3C" opacity="0.09" />
          <polygon points="520,320 820,80 1120,320" fill="#8B5E3C" opacity="0.07" />
          <polygon points="880,320 1100,150 1320,320" fill="#8B5E3C" opacity="0.06" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-clay/15">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-serif font-bold text-2xl text-ink mb-2">PHAROVIEW</p>
            <p className="font-sans text-sm text-ink/60 leading-relaxed mb-1">AR-powered confidence for smarter furniture decisions.</p>
            <p className="font-sans text-xs text-clay italic mb-6">&ldquo;Ancient wisdom, future vision.&rdquo;</p>
            <div className="space-y-1 text-sm text-ink/65 font-sans">
              <p>Alexandria, Egypt</p>
              <p><a href="mailto:adelmohammed2008262@gmail.com" className="hover:text-gold transition-colors">adelmohammed2008262@gmail.com</a></p>
              <p><a href="mailto:alimohamed1011008@gmail.com" className="hover:text-gold transition-colors">alimohamed1011008@gmail.com</a></p>
              <p><a href="tel:+201227758433" className="hover:text-gold transition-colors">+20 12 27758433</a></p>
              <p><a href="tel:+201102069798" className="hover:text-gold transition-colors">01102069798</a></p>
            </div>
          </div>

          {/* Nav columns */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40 mb-4">Product</p>
            <ul className="space-y-3 font-sans text-sm text-ink/65">
              <li><a href="#features" className="hover:text-gold transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40 mb-4">Company</p>
            <ul className="space-y-3 font-sans text-sm text-ink/65">
              <li><a href="#" className="hover:text-gold transition-colors">About</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40 mb-4">Legal</p>
            <ul className="space-y-3 font-sans text-sm text-ink/65 mb-6">
              <li><a href="#" className="hover:text-gold transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Cookies</a></li>
            </ul>
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/40 mb-4">Social</p>
            <ul className="space-y-3 font-sans text-sm text-ink/65">
              <li><a href="#" className="hover:text-gold transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Team credit */}
        <div className="py-8 border-b border-clay/15">
          <p className="font-sans text-sm text-ink/60">
            <span className="font-semibold text-ink/80">Team Pyramid X</span> &mdash; Climate Leaders Project
          </p>
          <p className="font-sans text-sm text-ink/60 mt-1">
            Ali Mohamed Ali Hassan &amp; Adel Mohamed Mohamed
          </p>
          <p className="font-sans text-xs text-ink/45 mt-2">
            WE Applied Technology School &middot; Supported by YLF and the Ministry of Environment
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-sans text-xs text-ink/45">
            &copy; 2026 PHAROVIEW. All rights reserved. Built for Climate Leaders.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs border border-clay/30 text-clay px-3 py-1 rounded-full">Sustainable</span>
            <span className="font-sans text-xs border border-clay/30 text-clay px-3 py-1 rounded-full">Secure</span>
            <span className="font-sans text-xs border border-clay/30 text-clay px-3 py-1 rounded-full">Fast</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
