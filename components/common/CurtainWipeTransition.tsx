'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CurtainWipeTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const blueprintShadeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!containerRef.current || !blueprintShadeRef.current || !lineRef.current) return

    const ctx = gsap.context(() => {
      // Blueprint curtain unroll effect
      gsap.fromTo(
        blueprintShadeRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 40%',
            scrub: 0.6,
          },
        }
      )

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-10 pointer-events-none">
      {/* Precision architectural division line with coordinates */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[#C89D54]/70">
        <span>ARCHITECTURAL SPECIFICATION TRANSITION</span>
        <span className="hidden sm:inline">SCALE 1:1 // TRUE SPATIAL GRID</span>
        <span>SECTION 07 &rarr; 08</span>
      </div>

      <div
        ref={lineRef}
        className="w-full h-px bg-gradient-to-r from-transparent via-[#C89D54]/50 to-transparent origin-center"
      />

      {/* Blueprint shade unrolling overlay */}
      <div
        ref={blueprintShadeRef}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1917]/20 to-[#1C1917] pointer-events-none"
      />
    </div>
  )
}

