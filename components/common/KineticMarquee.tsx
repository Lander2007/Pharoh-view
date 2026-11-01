'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/i18n'

const KEYWORDS_EN = [
  'SPATIAL CERTAINTY',
  '•',
  'LIDAR MAPPING',
  '•',
  'MILLIMETER SCALE',
  '•',
  'ZERO RETURNS',
  '•',
  'PHAROVIEW AR',
  '•',
  'TRUE TO SCALE',
  '•',
]

const KEYWORDS_AR = [
  'يقين مكاني تام',
  '•',
  'مسح ضوئي ليدار',
  '•',
  'دقة بالمليمتر',
  '•',
  'صفر مرتجعات',
  '•',
  'فارو فيو للواقع المعزز',
  '•',
  'أبعاد حقيقية مطابقة',
  '•',
]

export default function KineticMarquee() {
  const { isRTL } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const lastScrollY = useRef(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const spansRef = useRef<HTMLSpanElement[]>([])

  const keywords = isRTL ? KEYWORDS_AR : KEYWORDS_EN
  const displayItems = [...keywords, ...keywords, ...keywords]

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Track scroll velocity
    const onScroll = () => {
      const current = window.scrollY
      const delta = current - lastScrollY.current
      lastScrollY.current = current
      // Add scroll impulse
      velocityRef.current += delta * 0.08
    }

    // Track mouse coordinates for repulsion radius (250px)
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let animId: number
    const baseSpeed = 0.75

    const tick = () => {
      // Decay scroll velocity smoothly
      velocityRef.current *= 0.92

      // Compute total velocity
      const currentSpeed = baseSpeed + velocityRef.current

      // Continuous loop
      offsetRef.current -= currentSpeed
      const trackWidth = trackRef.current ? trackRef.current.scrollWidth / 2 : 2000
      if (Math.abs(offsetRef.current) >= trackWidth) {
        offsetRef.current = 0
      }

      // Dynamic skew proportional to scroll velocity (clamped -12deg to +12deg)
      const skew = Math.max(-12, Math.min(12, velocityRef.current * 0.4))

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0) skewX(${skew}deg)`
      }

      // Mouse repulsion radius (250px)
      const mouse = mouseRef.current
      spansRef.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = centerX - mouse.x
        const dy = centerY - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 250 && dist > 0) {
          const force = (1 - dist / 250) * 24
          const rx = (dx / dist) * force
          const ry = (dy / dist) * force
          el.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
          el.style.color = '#C89D54'
        } else {
          el.style.transform = 'translate3d(0, 0, 0)'
          el.style.color = ''
        }
      })

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 top-[60%] -translate-y-1/2 overflow-hidden select-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform opacity-[0.035]"
      >
        {displayItems.map((word, i) => {
          const isBullet = word === '•'
          return (
            <span
              key={i}
              ref={(el) => {
                if (el) spansRef.current[i] = el
              }}
              className={`inline-block px-4 font-serif text-6xl sm:text-7xl lg:text-8xl tracking-tight transition-transform duration-150 ease-out font-bold text-transparent select-none ${
                isBullet ? 'text-[#C89D54]/30 font-sans text-3xl px-6 self-center' : ''
              }`}
              style={
                !isBullet
                  ? {
                      WebkitTextStroke: '1px rgba(28, 25, 23, 0.08)',
                    }
                  : undefined
              }
            >
              {word}
            </span>
          )
        })}
      </div>
    </div>
  )
}

