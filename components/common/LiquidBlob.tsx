'use client'

import { useEffect, useRef } from 'react'

export default function LiquidBlob() {
  const blobRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, currentX: 0, currentY: 0 })
  const phase = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Center initially
    pos.current.x = window.innerWidth * 0.4
    pos.current.y = window.innerHeight * 0.35
    pos.current.currentX = pos.current.x
    pos.current.currentY = pos.current.y

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let animId: number
    const animate = () => {
      phase.current += 0.008
      const p = pos.current
      // Lazy spring physics
      p.currentX += (p.x - p.currentX) * 0.035
      p.currentY += (p.y - p.currentY) * 0.035

      if (blobRef.current) {
        // Organic breathing scale & slight wobble
        const wobbleX = Math.sin(phase.current * 1.2) * 25
        const wobbleY = Math.cos(phase.current * 0.9) * 20
        const scale = 1 + Math.sin(phase.current * 0.6) * 0.08

        blobRef.current.style.transform = `translate3d(${p.currentX - 250 + wobbleX}px, ${
          p.currentY - 250 + wobbleY
        }px, 0) scale(${scale})`
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <div
        ref={blobRef}
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #E9C46A 0%, #D4A373 50%, #C89D54 80%, transparent 100%)',
          filter: 'blur(90px)',
          opacity: 0.22,
          willChange: 'transform',
        }}
      />
    </div>
  )
}

