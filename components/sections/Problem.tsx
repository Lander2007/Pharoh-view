'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Problem() {
  const { t, isRTL, lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const quoteContainerRef = useRef<HTMLParagraphElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null)
  const [counterVal, setCounterVal] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)

  const rows = t.problem.rows
  const quoteWords = t.problem.quoteWords

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // 1. Scroll Text Fill effect synced directly to ScrollTrigger scrub (scrub: 0.8)
      const wordElements = quoteContainerRef.current?.querySelectorAll('.problem-word')
      if (wordElements && wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          {
            color: 'rgba(28, 25, 23, 0.18)',
            opacity: 0.3,
          },
          {
            color: '#1C1917',
            opacity: 1,
            stagger: 0.08,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: quoteContainerRef.current,
              start: 'top 80%',
              end: 'bottom 45%',
              scrub: 0.8,
            },
          }
        )
      }

      // 2. Animated Number Counter for Carbon Footprint Increase (+28%)
      const counterObj = { val: 0 }
      gsap.to(counterObj, {
        val: 28,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#impact-stat-box',
          start: 'top 85%',
          once: true,
          onEnter: () => soundEngine.playCounterTick(),
        },
        onUpdate: () => {
          setCounterVal(Math.round(counterObj.val))
        },
      })
    }, sectionRef)

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)

    return () => ctx.revert()
  }, [quoteWords, isRTL, lang])

  // Floating preview card mouse follower along friction rows
  const handleRowMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return
    const x = isRTL ? e.clientX - 310 : e.clientX + 24
    const y = e.clientY - 90
    gsap.to(previewRef.current, {
      x,
      y,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleRowMouseEnter = (idx: number) => {
    setActivePreviewIndex(idx)
    soundEngine.playHoverTick()
    if (previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        {
          opacity: 0,
          scale: 1.15,
        },
        {
          opacity: 1,
          scale: 1.0,
          duration: 0.3,
          ease: 'power3.out',
        }
      )
    }
  }

  const handleRowMouseLeave = () => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setActivePreviewIndex(null),
      })
    }
  }

  const activeRow = activePreviewIndex !== null ? rows[activePreviewIndex] : null

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative z-10 min-h-screen flex items-center py-24 px-6 lg:px-12 bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Editorial Content Block (Cols 1–8 in LTR / Cols 5–12 in RTL) */}
        <div className="lg:col-span-8 max-w-3xl text-left rtl:text-right">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C89D54]" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] rtl:tracking-normal text-[#C89D54] font-semibold">
              {t.problem.eyebrow}
            </p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917] leading-tight tracking-tight rtl:tracking-normal mb-6">
            {t.problem.heading}
          </h2>

          {/* Scroll Text Fill Quote (Split into complete words for Arabic cursive ligatures) */}
          <p
            ref={quoteContainerRef}
            id="problem-quote"
            className="font-serif text-2xl sm:text-3xl font-medium leading-relaxed max-w-2xl mb-12 select-none"
          >
            {quoteWords.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="problem-word inline-block mr-2 rtl:mr-0 rtl:ml-2 transition-colors duration-75 will-change-transform"
              >
                {word}
              </span>
            ))}
          </p>

          {/* 4 Friction Rows with Image Reveal on Hover */}
          <div
            className="border-t border-[#1C1917]/15 divide-y divide-[#1C1917]/10"
            onMouseMove={handleRowMouseMove}
          >
            {rows.map((p, idx) => (
              <div
                key={p.num}
                onMouseEnter={() => handleRowMouseEnter(idx)}
                onMouseLeave={handleRowMouseLeave}
                className="py-6 sm:py-7 hover:py-8 sm:hover:py-9 px-4 sm:px-5 hover:px-6 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 group cursor-pointer transition-all duration-300 ease-out hover:bg-[#1C1917]/[0.04] rounded-[2px] border-b border-transparent hover:border-[#C89D54]/40"
              >
                <span className="font-mono text-xs font-semibold tracking-widest text-[#C89D54] shrink-0 w-8 group-hover:text-[#4CC9F0] transition-colors">
                  {p.num}
                </span>
                <h3 className="font-serif font-bold text-[#1C1917] text-xl sm:text-2xl w-64 shrink-0 group-hover:text-[#C89D54] transition-colors">
                  {p.title}
                </h3>
                <p className="font-sans text-[#57534E] text-sm sm:text-base leading-relaxed flex-1">
                  {p.desc}
                </p>
                <span className="font-mono text-[10px] tracking-wider rtl:tracking-normal text-[#4CC9F0] bg-[#1C1917] px-2.5 py-1 rounded-[2px] border border-[#4CC9F0]/40 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-flex items-center gap-1.5 shadow-sm shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0] animate-pulse" />
                  <span>{t.problem.simulate}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Environmental Impact Stat Block with Animated Number Counter */}
          <div
            id="impact-stat-box"
            className="mt-14 p-7 sm:p-9 glass-architectural rounded-[2px] border-l-4 rtl:border-l rtl:border-r-4 border-l-[#C89D54] rtl:border-r-[#C89D54] border-t border-r rtl:border-l border-b border-[#1C1917]/10 shadow-architectural"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
              <div className="shrink-0">
                <div className="flex items-baseline gap-1 font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">
                  <span>+</span>
                  <span ref={counterRef} className="font-mono text-4xl sm:text-5xl text-[#C89D54]">
                    {counterVal}
                  </span>
                  <span>%</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] rtl:tracking-normal text-[#78716C] font-semibold mt-1">
                  {t.problem.carbonTitle}
                </p>
              </div>
              <div className="sm:border-l rtl:sm:border-l-0 rtl:sm:border-r sm:border-[#1C1917]/15 sm:pl-8 rtl:sm:pl-0 rtl:sm:pr-8">
                <p className="font-sans text-sm sm:text-base text-[#57534E] leading-relaxed">
                  {t.problem.carbonDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area reserved for 3D Chair perspective */}
        <div className="hidden lg:block lg:col-span-4" />
      </div>

      {/* Floating Image Reveal / AR Preview Card (Follows Cursor) */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-72 glass-architectural-dark text-[#F5EEE6] p-4 rounded-[2px] shadow-2xl border border-[#C89D54]/50 opacity-0 will-change-transform hidden sm:block"
        style={{
          transform: 'translate3d(-500px, -500px, 0)',
        }}
      >
        {activeRow && (
          <div>
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[#C89D54] mb-2 pb-1 border-b border-[#C89D54]/25">
              <span>{activeRow.tag}</span>
              <span>{isRTL ? 'محاكاة الواقع المعزز' : 'AR SIMULATION'}</span>
            </div>
            <div className="w-full h-28 bg-[#1C1917] rounded p-3 flex flex-col justify-between font-mono text-[9px] text-[#C89D54]">
              <div className="flex justify-between border-b border-[#C89D54]/20 pb-1">
                <span>{activeRow.line1}</span>
                <span className="text-red-400">{activeRow.line2}</span>
              </div>
              <div className="relative h-12 border border-dashed border-[#C89D54]/40 flex items-center justify-center">
                <span className="text-[#F5EEE6]/80 text-[10px]">{activeRow.box}</span>
                <div className="absolute inset-x-0 h-0.5 bg-red-400/80 animate-pulse" />
              </div>
              <span className="text-[#FAF5EE]/50">{activeRow.note}</span>
            </div>
            <div className="mt-2 text-[10px] font-mono text-[#FAF5EE]/70">
              {activeRow.spec}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
