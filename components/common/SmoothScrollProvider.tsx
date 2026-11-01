'use client'

import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    // Global reference for programmatic scrolling
    ;(window as unknown as { __lenis: Lenis }).__lenis = lenis

    // Handle initial hash anchor if present
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const target = document.querySelector(hash)
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -80 })
        }
      }, 500)
    }

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <div className="smooth-scroll-root w-full relative">{children}</div>
}

