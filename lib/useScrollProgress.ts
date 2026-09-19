'use client'
import { useEffect, useState, useCallback, useRef } from 'react'

/** Page scroll progress 0 → 1, rAF-throttled so scroll-driven 3D stays smooth. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const ticking = useRef(false)
  const maxScrollRef = useRef(0)

  const updateMaxScroll = useCallback(() => {
    if (typeof window === 'undefined') return
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    )
    maxScrollRef.current = Math.max(docHeight - window.innerHeight, 1)
  }, [])

  const handleScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const max = maxScrollRef.current > 1 ? maxScrollRef.current : (document.documentElement.scrollHeight - window.innerHeight)
      if (max > 0) {
        setProgress(Math.min(Math.max(scrollTop / max, 0), 1))
      }
      ticking.current = false
    })
  }, [])

  useEffect(() => {
    updateMaxScroll()
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateMaxScroll, { passive: true })

    // Also observe DOM height changes in case dynamic elements load
    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(() => {
        updateMaxScroll()
      })
      resizeObserver.observe(document.body)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateMaxScroll)
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [handleScroll, updateMaxScroll])

  return progress
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}
