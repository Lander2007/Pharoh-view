'use client'

import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

export default function Footer() {
  const { t, isRTL } = useLanguage()

  return (
    <footer className="relative z-10 overflow-hidden bg-[#1C1917]/90 backdrop-blur-xl text-[#F5EEE6] border-t border-[#C89D54]/30 pt-24 pb-12 px-6 text-left rtl:text-right">
      {/* Blueprint Grid Texture Overlay */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />

      {/* Pyramid Geometric Blueprint Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 340"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
        >
          <polygon points="160,340 460,110 760,340" fill="#C89D54" opacity="0.04" />
          <polygon points="520,340 820,70 1120,340" fill="#D4A373" opacity="0.03" />
          <polygon points="880,340 1100,140 1320,340" fill="#C89D54" opacity="0.04" />
          <line x1="460" y1="110" x2="460" y2="340" stroke="#C89D54" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />
          <line x1="820" y1="70" x2="820" y2="340" stroke="#C89D54" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-[#C89D54]/20">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-[4px] bg-[#0D0C0B] border border-[#C89D54]/40 shadow-sm mb-4">
              <div className="w-6 h-6 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/logo nice canva.jpg"
                  alt="PHAROVIEW Eye of Horus Logo"
                  className="w-full h-full object-contain scale-110"
                />
              </div>
              <p className="font-serif font-bold text-xl text-[#F5EEE6] tracking-widest rtl:tracking-normal">PHAROVIEW</p>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
            </div>
            <p className="font-sans text-sm text-[#F5EEE6]/80 leading-relaxed mb-1">
              {t.footer.tagline}
            </p>
            <p className="font-serif text-xs text-[#C89D54] italic rtl:not-italic mb-6">
              {t.footer.quote}
            </p>
            <div className="space-y-1.5 text-xs text-[#BFA88F] font-mono">
              <p className="text-[#F5EEE6]">{t.footer.location}</p>
              <p>
                <a
                  href="mailto:adelmohammed2008262@gmail.com"
                  onMouseEnter={() => soundEngine.playHoverTick()}
                  className="hover:text-[#C89D54] transition-colors"
                >
                  adelmohammed2008262@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="mailto:alimohamed1011008@gmail.com"
                  onMouseEnter={() => soundEngine.playHoverTick()}
                  className="hover:text-[#C89D54] transition-colors"
                >
                  alimohamed1011008@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+201227758433"
                  onMouseEnter={() => soundEngine.playHoverTick()}
                  className="hover:text-[#C89D54] transition-colors"
                >
                  +20 12 27758433
                </a>
              </p>
              <p>
                <a
                  href="tel:+201102069798"
                  onMouseEnter={() => soundEngine.playHoverTick()}
                  className="hover:text-[#C89D54] transition-colors"
                >
                  01102069798
                </a>
              </p>
            </div>
          </div>

          {/* Architecture Column */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider rtl:tracking-normal text-[#C89D54] mb-4">
              {t.footer.navTitle}
            </p>
            <ul className="space-y-3 font-sans text-xs text-[#BFA88F]">
              {t.footer.navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href="#features" onMouseEnter={() => soundEngine.playHoverTick()} className="hover:text-[#C89D54] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Column */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider rtl:tracking-normal text-[#C89D54] mb-4">
              {t.footer.projectTitle}
            </p>
            <ul className="space-y-3 font-sans text-xs text-[#BFA88F]">
              {t.footer.projectLinks.map((link, idx) => (
                <li key={idx}>
                  <a href="#sdgs" onMouseEnter={() => soundEngine.playHoverTick()} className="hover:text-[#C89D54] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification Column */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider rtl:tracking-normal text-[#C89D54] mb-4">
              {isRTL ? 'التحقق والمصادقة' : 'Verification'}
            </p>
            <ul className="space-y-3 font-sans text-xs text-[#BFA88F] mb-6">
              <li>
                <a href="#features" onMouseEnter={() => soundEngine.playHoverTick()} className="hover:text-[#C89D54] transition-colors">
                  {isRTL ? 'دقة ±١.٨ ملم' : '±1.8mm Accuracy'}
                </a>
              </li>
              <li>
                <a href="#sdgs" onMouseEnter={() => soundEngine.playHoverTick()} className="hover:text-[#C89D54] transition-colors">
                  {isRTL ? 'معايير الأمم المتحدة' : 'UN SDG Mandate'}
                </a>
              </li>
              <li>
                <a href="#features" onMouseEnter={() => soundEngine.playHoverTick()} className="hover:text-[#C89D54] transition-colors">
                  {isRTL ? 'محاذاة فيزيائية 60fps' : 'Physics Alignment 60fps'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Team credit */}
        <div className="py-8 border-b border-[#C89D54]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="font-sans text-sm text-[#F5EEE6]">
              <span className="font-semibold text-[#C89D54]">{t.footer.initiativeBadge}</span>
            </p>
            <p className="font-sans text-xs text-[#BFA88F] mt-1">
              {t.footer.founders}
            </p>
            <p className="font-sans text-[11px] text-[#BFA88F]/70 mt-1">
              {t.footer.schoolAffiliation}
            </p>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest rtl:tracking-normal text-[#C89D54]/80 bg-[#C89D54]/10 border border-[#C89D54]/30 px-3.5 py-2 rounded-[2px]">
            {isRTL ? 'المواصفات معتمدة // 60 إطار/ثانية' : 'SPECIFICATION LOCKED // 60 FPS'}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[10px] text-[#BFA88F]/80">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] border border-[#C89D54]/40 text-[#C89D54] bg-[#C89D54]/10 px-3 py-1 rounded-[2px]">
              {isRTL ? 'دعم تقنية LiDAR' : 'LiDAR Ready'}
            </span>
            <span className="font-mono text-[10px] border border-[#C89D54]/40 text-[#C89D54] bg-[#C89D54]/10 px-3 py-1 rounded-[2px]">
              {isRTL ? 'صفر مرتجعات' : 'Zero Returns'}
            </span>
            <span className="font-mono text-[10px] border border-[#C89D54]/40 text-[#C89D54] bg-[#C89D54]/10 px-3 py-1 rounded-[2px]">
              {isRTL ? 'مقياس حقيقي 1:1' : 'Scale 1:1'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
