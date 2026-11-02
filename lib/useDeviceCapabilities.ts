'use client'

import { useState, useEffect } from 'react'

export type QualityProfile = 'high' | 'balanced' | 'performance'

export interface DeviceCapabilities {
  isMobile: boolean
  isPortrait: boolean
  qualityProfile: QualityProfile
  dpr: [number, number]
  shadowMapSize: number
  enableRealtimeShadows: boolean
  maxAnisotropy: number
}

// Default desktop-tier configuration
const DEFAULT_CAPABILITIES: DeviceCapabilities = {
  isMobile: false,
  isPortrait: false,
  qualityProfile: 'high',
  dpr: [1, 1.75],
  shadowMapSize: 1024,
  enableRealtimeShadows: true,
  maxAnisotropy: 8,
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(DEFAULT_CAPABILITIES)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const determineCapabilities = (): DeviceCapabilities => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isPortrait = height > width
      const isMobileDevice =
        width < 1024 ||
        isPortrait ||
        ('ontouchstart' in window && width < 1200) ||
        navigator.maxTouchPoints > 1

      // 1. Detect hardware concurrency & memory where supported
      const cores = navigator.hardwareConcurrency || 4
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4

      // 2. Check for GPU tier / capabilities if WebGL is available
      let isLowEndGpu = false
      let isHighEndGpu = true

      try {
        const testCanvas = document.createElement('canvas')
        const gl = (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
            // Check for lower-end mobile GPUs (e.g. Mali-G52, Adreno 5xx, PowerVR)
            if (
              renderer.includes('mali-4') ||
              renderer.includes('mali-t') ||
              renderer.includes('adreno 3') ||
              renderer.includes('adreno 4') ||
              renderer.includes('adreno 50') ||
              renderer.includes('powervr')
            ) {
              isLowEndGpu = true
              isHighEndGpu = false
            } else if (
              renderer.includes('apple') ||
              renderer.includes('adreno 7') ||
              renderer.includes('adreno 66') ||
              renderer.includes('mali-g7') ||
              renderer.includes('nvidia') ||
              renderer.includes('radeon')
            ) {
              isHighEndGpu = true
            }
          }
        }
      } catch {
        // Fallback gracefully
      }

      // 3. Assign Quality Profile
      let profile: QualityProfile = 'high'

      if (isMobileDevice) {
        if (isLowEndGpu || cores <= 4 || memory < 4) {
          profile = 'performance'
        } else if (!isHighEndGpu || cores <= 6 || memory <= 4) {
          profile = 'balanced'
        } else {
          profile = 'high'
        }
      } else {
        // Desktop
        profile = isLowEndGpu || cores < 4 ? 'balanced' : 'high'
      }

      // 4. Configure graphics parameters based on profile
      let dpr: [number, number]
      let shadowMapSize = 1024
      let enableRealtimeShadows = true
      let maxAnisotropy = 8

      switch (profile) {
        case 'high':
          dpr = isMobileDevice ? [1, 1.5] : [1, 1.75]
          shadowMapSize = 1024
          enableRealtimeShadows = true
          maxAnisotropy = 8
          break
        case 'balanced':
          dpr = [1, 1.25]
          shadowMapSize = 512
          enableRealtimeShadows = true
          maxAnisotropy = 4
          break
        case 'performance':
          dpr = [1, 1.0]
          shadowMapSize = 256
          enableRealtimeShadows = false
          maxAnisotropy = 1
          break
      }

      return {
        isMobile: isMobileDevice,
        isPortrait,
        qualityProfile: profile,
        dpr,
        shadowMapSize,
        enableRealtimeShadows,
        maxAnisotropy,
      }
    }

    setCapabilities(determineCapabilities())

    const handleResize = () => {
      setCapabilities(determineCapabilities())
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return capabilities
}
