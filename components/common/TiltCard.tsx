'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { soundEngine } from '@/lib/soundEngine'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
  isDark?: boolean
}

export default function TiltCard({
  children,
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isDark = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !innerRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Update CSS custom properties for radial spotlight
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)

    // Tilt calculation: max 6 degrees
    const normX = (x / rect.width - 0.5) * 2 // -1 to 1
    const normY = (y / rect.height - 0.5) * 2 // -1 to 1

    const rotX = -normY * 6
    const rotY = normX * 6

    gsap.to(innerRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
      transformPerspective: 1000,
    })
  }

  const handleMouseEnter = () => {
    isHovered.current = true
    soundEngine.playHoverTick()
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    onMouseLeave?.()
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1000px',
        ...style,
      }}
      className={`group relative z-10 rounded-[2px] transition-shadow duration-300 ${className}`}
    >
      {/* 3D Rotating Inner Container - Layer 1 (z-index: 10) Frosted Glass */}
      <div
        ref={innerRef}
        style={{
          transformStyle: 'preserve-3d',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: isDark
            ? 'rgba(28, 25, 23, 0.82)'
            : 'rgba(245, 238, 230, 0.72)',
        }}
        className={`relative h-full w-full rounded-[2px] p-7 sm:p-8 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
          isDark
            ? 'border-[#C89D54]/25 hover:border-[#4CC9F0]/70 shadow-lg'
            : 'border-[#1C1917]/10 hover:border-[#C89D54] shadow-[0_10px_35px_-10px_rgba(28,25,23,0.06)] hover:shadow-[0_12px_40px_-10px_rgba(76,201,240,0.12)]'
        }`}
      >
        {/* Dynamic Cursor Spotlight Radial Overlay (Warm Gold + Cyan Accent) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(76, 201, 240, 0.12), rgba(200, 157, 84, 0.16) 35%, transparent 60%)',
          }}
        />

        {/* Dynamic Border Spotlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: 'inset 0 0 24px rgba(76, 201, 240, 0.12), inset 0 0 12px rgba(200, 157, 84, 0.18)',
          }}
        />

        {/* Card Content - Layer 2 (z-index: 10) with pointer-events-auto */}
        <div className="relative z-10 flex flex-col justify-between h-full pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

