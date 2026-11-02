'use client'

import { useEffect, useCallback } from 'react'
import { sceneState, useSceneState } from '@/lib/sceneState'
import { useLanguage } from '@/lib/i18n'
import { soundEngine } from '@/lib/soundEngine'

export default function IosModal() {
  const { iosModalOpen } = useSceneState()
  const { t, isRTL } = useLanguage()

  const handleClose = useCallback(() => {
    sceneState.closeIosModal()
  }, [])

  // Lock body scroll and register ESC key handler
  useEffect(() => {
    if (!iosModalOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [iosModalOpen, handleClose])

  if (!iosModalOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200"
    >
      {/* Backdrop overlay with blur */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-[#1C1917]/75 backdrop-blur-md cursor-pointer transition-opacity"
        aria-hidden="true"
      />

      {/* Blueprint Grid Texture Overlay on backdrop */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />

      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg bg-[#F6F1EA] text-[#1C1917] border border-[#1C1917]/20 shadow-[0_24px_64px_rgba(28,25,23,0.35)] overflow-hidden rounded-none text-left rtl:text-right animate-in zoom-in-95 duration-200"
      >
        {/* Subtle Top Luxury Gold/Copper Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#C89D54] via-[#8C6239] to-[#C89D54]" />

        {/* Modal Inner Container */}
        <div className="p-6 sm:p-8">
          {/* Header Row: Apple Icon + Eyebrow + Status Pill + Close button */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              {/* Apple obsidian badge */}
              <div className="w-10 h-10 rounded-none bg-[#1C1917] border border-[#C89D54]/50 shadow-sm flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#F5EEE6]">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] rtl:tracking-normal text-[#8C6239] font-bold">
                  {t.iosModal.badge}
                </p>
                {/* Coming Soon Glowing Pill */}
                <div className="inline-flex items-center gap-1.5 mt-0.5 px-2 py-0.5 bg-[#8C6239]/10 border border-[#8C6239]/30 font-mono text-[9px] font-bold tracking-wider text-[#8C6239] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239] animate-pulse" />
                  <span>{t.iosModal.comingSoon}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              onMouseEnter={() => soundEngine.playHoverTick()}
              aria-label={t.iosModal.close}
              className="p-2 border border-[#1C1917]/15 hover:border-[#1C1917] text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#1C1917]/5 transition-colors cursor-pointer rounded-none"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main Title & Subtitle */}
          <h3
            id="ios-modal-title"
            className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight tracking-tight rtl:tracking-normal mb-1.5"
          >
            {t.iosModal.title}
          </h3>
          <p className="font-serif text-sm sm:text-base italic rtl:not-italic text-[#8C6239] mb-4">
            {t.iosModal.subtitle}
          </p>

          {/* Description */}
          <p className="font-sans text-xs sm:text-sm text-[#4A443F] leading-relaxed mb-5">
            {t.iosModal.description}
          </p>

          {/* Architectural Feature Specs */}
          <div className="space-y-2 mb-6 p-3.5 bg-[#1C1917]/[0.03] border border-[#1C1917]/12 font-mono text-[11px] text-[#29231E]">
            <div className="flex items-center gap-2">
              <span className="text-[#8C6239] font-bold">✓</span>
              <span>{t.iosModal.feature1}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8C6239] font-bold">✓</span>
              <span>{t.iosModal.feature2}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8C6239] font-bold">✓</span>
              <span>{t.iosModal.feature3}</span>
            </div>
          </div>

          {/* Telemetry Status Row */}
          <div className="flex items-center justify-between p-3 mb-6 bg-[#1C1917] text-[#F5EEE6] font-mono text-[10px] tracking-wider uppercase">
            <span className="text-[#C89D54] font-semibold">{t.iosModal.statusTitle}</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>{t.iosModal.statusVal}</span>
            </div>
          </div>

          {/* Android Alternative Callout */}
          <div className="border-t border-[#1C1917]/12 pt-5">
            <p className="font-sans text-xs text-[#57534E] mb-4 leading-normal">
              {t.iosModal.androidNotice}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Primary: Download Android APK */}
              <a
                href="/app-release.apk"
                download="PharoView-AR.apk"
                onClick={() => soundEngine.playClickTick()}
                onMouseEnter={() => soundEngine.playHoverTick()}
                className="flex-1 bg-[#1C1917] hover:bg-[#8C6239] text-[#F5EEE6] h-11 px-5 rounded-none font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm text-center"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                  <path d="M3.18 23.76c.33.18.72.2 1.08.04l12.2-6.93-2.51-2.51-10.77 9.4zm-.96-20.49c-.14.25-.22.55-.22.88v19.7c0 .33.08.63.22.88l.08.07L13.5 12.5v-.25L2.3 3.2l-.08.07zM20.6 10.3l-2.46-1.4-2.77 2.77 2.77 2.77 2.49-1.42c.71-.4.71-1.06-.03-1.72zM4.26.22L16.46 7.17l-2.51 2.51L3.18.27c.36-.16.75-.14 1.08-.05z" />
                </svg>
                <span>{t.iosModal.downloadAndroid}</span>
              </a>

              {/* Secondary: Close */}
              <button
                type="button"
                onClick={handleClose}
                onMouseEnter={() => soundEngine.playHoverTick()}
                className="border border-[#1C1917]/30 hover:border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917]/5 h-11 px-6 rounded-none font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t.iosModal.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

