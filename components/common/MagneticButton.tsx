'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { soundEngine } from '@/lib/soundEngine'

interface MagneticButtonProps {
  href?: string
  onClick?: () => void
  download?: string
  children?: React.ReactNode
  label?: string
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill' | 'dark'
  className?: string
}

const CIPHER_CHARS = '0123456789_#X/!+[]<>'

export default function MagneticButton({
  href,
  onClick,
  download,
  children,
  label,
  icon,
  variant = 'primary',
  className = '',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement | null>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const circleRef = useRef<HTMLSpanElement>(null)
  const cipherIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [displayText, setDisplayText] = useState<string>(label || '')
  const originalText = label || (typeof children === 'string' ? children : '')

  useEffect(() => {
    if (label) setDisplayText(label)
    return () => {
      if (cipherIntervalRef.current) {
        clearInterval(cipherIntervalRef.current)
        cipherIntervalRef.current = null
      }
    }
  }, [label])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY

    // Threshold check
    gsap.to(buttonRef.current, {
      x: dx * 0.35,
      y: dy * 0.35,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: dx * 0.18,
        y: dy * 0.18,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    soundEngine.playHoverTick()

    // Circular fill effect from cursor entry position
    if (circleRef.current && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const relY = e.clientY - rect.top
      gsap.fromTo(
        circleRef.current,
        {
          left: relX,
          top: relY,
          scale: 0,
          opacity: 0.35,
        },
        {
          scale: 2.8,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      )
    }

    // Monospace cipher scramble for Latin text only (strictly disabled on Arabic to preserve connected ligatures)
    const isArabic = /[\u0600-\u06FF]/.test(originalText)
    if (!isArabic && originalText && typeof originalText === 'string') {
      if (cipherIntervalRef.current) {
        clearInterval(cipherIntervalRef.current)
      }
      let iter = 0
      cipherIntervalRef.current = setInterval(() => {
        setDisplayText(
          originalText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iter) return originalText[index]
              return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
            })
            .join('')
        )
        iter += 1
        if (iter >= originalText.length) {
          if (cipherIntervalRef.current) {
            clearInterval(cipherIntervalRef.current)
            cipherIntervalRef.current = null
          }
          setDisplayText(originalText)
        }
      }, 30)
    }
  }

  const handleMouseLeave = () => {
    if (cipherIntervalRef.current) {
      clearInterval(cipherIntervalRef.current)
      cipherIntervalRef.current = null
    }
    if (originalText) {
      setDisplayText(originalText)
    }

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#C89D54] text-[#1C1917] hover:bg-[#D4A373] shadow-md border border-[#C89D54]'
      case 'dark':
        return 'bg-[#1C1917] text-[#F5EEE6] hover:bg-[#C89D54] hover:text-[#1C1917] shadow-md border border-[#1C1917]'
      case 'pill':
        return 'bg-[#F5EEE6]/90 text-[#1C1917] border border-[#1C1917]/20 backdrop-blur-md shadow-sm'
      case 'ghost':
        return 'bg-transparent text-[#1C1917] border border-[#1C1917]/30 hover:border-[#4CC9F0]'
      case 'secondary':
      default:
        return 'bg-transparent text-[#1C1917] border border-[#1C1917] hover:bg-[#1C1917]/5'
    }
  }

  const content = (
    <span ref={innerRef} className="relative z-10 flex items-center gap-2 pointer-events-none">
      {icon}
      <span>{label ? displayText : children}</span>
    </span>
  )

  const commonProps = {
    ref: (el: HTMLElement | null) => {
      buttonRef.current = el
    },
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: () => {
      soundEngine.playClickTick()
      onClick?.()
    },
    className: `relative inline-flex items-center justify-center overflow-hidden transition-colors cursor-pointer select-none font-mono text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-[2px] ${getVariantStyles()} ${className}`,
  }

  return (
    <>
      {href ? (
        href.startsWith('#') || href.startsWith('http') || href.endsWith('.apk') || Boolean(download) ? (
          <a href={href} download={download || (href.endsWith('.apk') ? 'PharoView-AR.apk' : undefined)} {...commonProps}>
            <span
              ref={circleRef}
              className="absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-white/20 opacity-0"
            />
            {content}
          </a>
        ) : (
          <Link href={href} {...commonProps}>
            <span
              ref={circleRef}
              className="absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-white/20 opacity-0"
            />
            {content}
          </Link>
        )
      ) : (
        <button type="button" {...commonProps}>
          <span
            ref={circleRef}
            className="absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-white/20 opacity-0"
          />
          {content}
        </button>
      )}
    </>
  )
}

