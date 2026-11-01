'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneState, useSceneState } from '@/lib/sceneState'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { t, isRTL, lang } = useLanguage()
  const { materialVariant } = useSceneState()
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Gentle parallax fade on scroll without breaking visibility or background
      gsap.to(leftColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
        y: -40,
        opacity: 0.35,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isRTL, lang])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F4EFE6] overflow-hidden select-none"
    >
      {/* Subtle Architectural Blueprint Grid (Unified single tone) */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />

      {/* 12-Column Swiss Architectural Grid Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto min-h-[calc(100vh-76px)] mt-[76px] grid grid-cols-1 lg:grid-cols-12 items-center px-[4vw] py-12 lg:py-0">
        {/* Left Editorial Column (Cols 1 to 6) */}
        <div
          ref={leftColRef}
          className="lg:col-span-6 flex flex-col justify-center text-left rtl:text-right py-8 lg:py-16"
        >
          {/* Eyebrow */}
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] rtl:tracking-normal text-[#8C6239] uppercase mb-6">
            &mdash; {t.hero.eyebrow}
          </p>

          {/* Flawless 2-Line Headline (white-space: nowrap prevents orphan em-dash) */}
          <h1 className="font-serif leading-[1.05] tracking-tight rtl:tracking-normal">
            <span className="block font-bold text-[clamp(2.9rem,4.8vw,5.2rem)] text-[#1C1917] whitespace-nowrap">
              {t.hero.headlinePart1}
            </span>
            <span className="block font-normal italic rtl:not-italic text-[clamp(2.9rem,4.8vw,5.2rem)] text-[#8C6239] mt-1.5">
              {t.hero.headlinePart2}
            </span>
          </h1>

          {/* Editorial Body Copy */}
          <p className="font-sans text-[1.02rem] text-[#4A443F] leading-[1.65] max-w-[460px] mt-7">
            {t.hero.body}
          </p>

          {/* Telemetry Specs Row */}
          <div className="mt-7 flex flex-wrap items-center gap-6 font-mono text-[11px] tracking-[0.12em] rtl:tracking-normal text-[#6E655F] uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1917]" />
              {t.hero.lidarMapping}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239]" />
              {t.hero.millimeterScale}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89D54]" />
              {t.hero.zeroReturns}
            </span>
          </div>

          {/* Sharp Architectural CTA Row */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {/* Download iOS Button */}
            <a
              href="#cta"
              className="bg-[#1C1917] text-[#F4EFE6] hover:bg-[#8C6239] rounded-none h-12 px-6 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center cursor-pointer shadow-sm"
            >
              {t.hero.downloadIos}
            </a>

            {/* Android APK Download Button */}
            <a
              href="/app-release.apk"
              download="PharoView-AR.apk"
              className="border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#F4EFE6] rounded-none h-12 px-6 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center cursor-pointer"
            >
              {t.hero.downloadAndroid}
            </a>

            {/* Minimalist Inspect Link Button */}
            <button
              type="button"
              onClick={() => sceneState.toggleInspectMode()}
              className="border-b border-[#8C6239] text-[#8C6239] hover:text-[#1C1917] hover:border-[#1C1917] py-2 px-1 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-transparent"
            >
              {t.hero.inspect3d}
            </button>
          </div>
        </div>

        {/* Right 3D Stage Column (Cols 7 to 12) */}
        <div className="lg:col-span-6 h-[480px] lg:h-[calc(100vh-140px)] flex flex-col justify-end items-center pb-6 pointer-events-none">
          {/* Minimalist Horizontal Finish Selector Dock strictly BELOW the chair */}
          <div className="pointer-events-auto flex items-center border border-[#1C1917]/20 bg-[#F4EFE6]/80 backdrop-blur-md rounded-none shadow-sm">
            {/* Natural Oak */}
            <button
              type="button"
              onClick={() => sceneState.setMaterialVariant('oak')}
              className={`px-4 py-2 font-mono text-[10px] tracking-wider uppercase font-semibold transition-colors cursor-pointer ${
                materialVariant === 'oak'
                  ? 'bg-[#1C1917] text-[#F4EFE6]'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917]'
              }`}
            >
              {t.hero.swatchOak}
            </button>

            <span className="h-4 w-px bg-[#1C1917]/15" />

            {/* Warm Bouclé */}
            <button
              type="button"
              onClick={() => sceneState.setMaterialVariant('boucle')}
              className={`px-4 py-2 font-mono text-[10px] tracking-wider uppercase font-semibold transition-colors cursor-pointer ${
                materialVariant === 'boucle'
                  ? 'bg-[#1C1917] text-[#F4EFE6]'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917]'
              }`}
            >
              {t.hero.swatchBoucle}
            </button>

            <span className="h-4 w-px bg-[#1C1917]/15" />

            {/* Smoked Walnut */}
            <button
              type="button"
              onClick={() => sceneState.setMaterialVariant('walnut')}
              className={`px-4 py-2 font-mono text-[10px] tracking-wider uppercase font-semibold transition-colors cursor-pointer ${
                materialVariant === 'walnut'
                  ? 'bg-[#1C1917] text-[#F4EFE6]'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917]'
              }`}
            >
              {t.hero.swatchWalnut}
            </button>

            <span className="h-4 w-px bg-[#1C1917]/15" />

            {/* Minimal Orbit Toggle */}
            <button
              type="button"
              onClick={() => sceneState.toggleInspectMode()}
              className="px-3.5 py-2 font-mono text-[10px] tracking-wider uppercase font-bold text-[#8C6239] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              {t.hero.orbit360}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
