'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { soundEngine } from '@/lib/soundEngine'
import { useLanguage } from '@/lib/i18n'

export default function PageWipePreloader({ onComplete }: { onComplete?: () => void }) {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState<string>(t.preloader.initializing)
  const [isFinished, setIsFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const finishRef = useRef<() => void>(() => {})
  
  const tRef = useRef(t)
  tRef.current = t
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (typeof window === 'undefined') return

    const logs = [
      { at: 15, key: 'initializing' as const },
      { at: 38, key: 'calibrating' as const },
      { at: 65, key: 'compiling' as const },
      { at: 88, key: 'locking' as const },
      { at: 100, key: 'online' as const },
    ]

    let val = 0
    let ctx: gsap.Context | null = null
    let finishedTriggered = false

    const finish = () => {
      if (finishedTriggered) return
      finishedTriggered = true
      clearInterval(interval)
      clearTimeout(safetyTimer)
      setProgress(100)
      if (tRef.current?.preloader?.online) {
        setStatusText(tRef.current.preloader.online)
      }
      soundEngine.playCounterTick()

      if (!containerRef.current) {
        setIsFinished(true)
        onCompleteRef.current?.()
        return
      }

      // Trigger GSAP architectural curtain wipe safely scoped to containerRef
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          delay: 0.05,
          onComplete: () => {
            setIsFinished(true)
            onCompleteRef.current?.()
          },
        })

        tl.to('.preloader-content', {
          opacity: 0,
          y: -24,
          duration: 0.25,
          ease: 'power2.in',
        })
          .to(
            '.preloader-curtain',
            {
              clipPath: 'inset(0 0 100% 0)',
              duration: 0.65,
              stagger: 0.08,
              ease: 'power4.inOut',
            },
            '-=0.05'
          )
          .to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.15,
            },
            '-=0.15'
          )
      }, containerRef)
    }

    finishRef.current = finish

    // Safety fallback: guaranteed curtain open after 1.1s maximum
    const safetyTimer = setTimeout(() => {
      finish()
    }, 1100)

    const interval = setInterval(() => {
      val += Math.floor(Math.random() * 10) + 8
      if (val >= 100) {
        finish()
      } else {
        setProgress(val)
        if (val % 12 === 0) {
          soundEngine.playCounterTick()
        }
        const activeLog = logs.slice().reverse().find((l) => val >= l.at)
        if (activeLog && tRef.current?.preloader) {
          const text = tRef.current.preloader[activeLog.key]
          if (text) setStatusText(text)
        }
      }
    }, 20)

    return () => {
      clearInterval(interval)
      clearTimeout(safetyTimer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onClick={() => finishRef.current()}
      className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden transition-opacity duration-300 cursor-pointer ${
        isFinished ? 'pointer-events-none opacity-0 invisible hidden' : 'pointer-events-auto'
      }`}
      style={isFinished ? { display: 'none', pointerEvents: 'none' } : { zIndex: 99999 }}
      aria-hidden={isFinished}
      aria-label="Preloader"
    >
      {/* Dual Architectural Obsidian Panels */}
      <div
        className="preloader-curtain absolute inset-y-0 left-0 w-1/2 bg-[#0D0C0B] border-r border-[#C89D54]/25"
        style={{ clipPath: 'inset(0 0 0 0)' }}
      />
      <div
        className="preloader-curtain absolute inset-y-0 right-0 w-1/2 bg-[#0D0C0B]"
        style={{ clipPath: 'inset(0 0 0 0)' }}
      />

      {/* Blueprint Grid Texture Overlay on Preloader */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />

      {/* Center Technical Telemetry Console */}
      <div className="preloader-content relative z-10 max-w-lg w-full px-8 text-center flex flex-col items-center">
        {/* Official Eye of Horus Logo Centerpiece */}
        <div className="w-64 sm:w-72 h-24 sm:h-28 mb-4 overflow-hidden flex items-center justify-center">
          <img
            src="/logo nice canva.jpg"
            alt="PHAROVIEW Eye of Horus Logo"
            className="w-full h-full object-contain mix-blend-screen filter drop-shadow-[0_0_20px_rgba(76,201,240,0.3)] scale-110"
          />
        </div>

        {/* Counter readout with Gold & Cyan Accents */}
        <div className="flex items-baseline justify-center gap-2 mb-4 font-mono">
          <span className="text-5xl sm:text-6xl font-bold tracking-tight text-[#C89D54]">
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span className="text-xl text-[#4CC9F0] font-semibold">%</span>
        </div>

        {/* Glowing Cyan & Gold Loading Progress Bar */}
        <div className="relative w-full h-1 bg-[#1C1917] rounded-[2px] overflow-hidden mb-4 border border-[#C89D54]/30 shadow-[0_0_12px_rgba(76,201,240,0.25)]">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#4CC9F0] to-[#E9C46A] transition-all duration-75 ease-out shadow-[0_0_10px_#4CC9F0]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live Monospace Log with Cyan Pulse Indicator */}
        <div className="font-mono text-[10px] tracking-[0.24em] text-[#F5EEE6]/80 uppercase h-5 flex items-center justify-center">
          <span className="inline-block w-2 h-2 rounded-[2px] bg-[#4CC9F0] shadow-[0_0_8px_#4CC9F0] animate-pulse mr-2.5 rtl:mr-0 rtl:ml-2.5" />
          <span>{statusText}</span>
        </div>

        {/* Secondary Subsystem Status */}
        <div className="mt-3 text-[9px] font-mono tracking-widest text-[#78716C] flex items-center gap-3">
          <span>ALX // EGY</span>
          <span>•</span>
          <span className="text-[#C89D54]">CERTAINTY ENGINE</span>
          <span>•</span>
          <span>60 FPS</span>
        </div>
      </div>
    </div>
  )
}
