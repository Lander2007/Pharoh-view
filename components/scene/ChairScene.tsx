'use client'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import ProceduralChair from './ProceduralChair'
import RadialProgressRing from './RadialProgressRing'
import { useScrollProgress, useReducedMotion } from '@/lib/useScrollProgress'
import {
  interpolateChairState,
  getStageForProgress,
  getSectionRevealProgress,
  type ChairStage,
} from '@/lib/chairKeyframes'

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Full-viewport material grain: soft low-opacity circular blots in warm clay
 * tones, scattered irregularly. Sits behind the 3D object and the text —
 * reads as grain, not decoration.
 */
function GrainTexture() {
  const { blots, dots } = useMemo(() => {
    const rand = mulberry32(77123)
    const fills = ['#8B5E3C', '#B8901F', '#1C1712', '#8B5E3C', '#B8901F']
    const blots = Array.from({ length: 44 }, () => ({
      cx: rand() * 1000,
      cy: rand() * 1000,
      r: 10 + rand() * 46,
      fill: fills[Math.floor(rand() * fills.length)],
      opacity: 0.04 + rand() * 0.06,
    }))
    const dots = Array.from({ length: 130 }, () => ({
      cx: rand() * 1000,
      cy: rand() * 1000,
      r: 0.8 + rand() * 1.4,
      fill: rand() > 0.4 ? '#8B5E3C' : '#1C1712',
      opacity: 0.05 + rand() * 0.05,
    }))
    return { blots, dots }
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="pharoh-blot" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <g filter="url(#pharoh-blot)">
          {blots.map((b, i) => (
            <circle key={`b-${i}`} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} opacity={b.opacity} />
          ))}
        </g>
        <g>
          {dots.map((d, i) => (
            <circle key={`d-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={d.opacity} />
          ))}
        </g>
      </svg>
    </div>
  )
}

/** Small numbered stage label that fades in/out as scroll stages change. */
function StageLabel({ stage }: { stage: ChairStage }) {
  return (
    <div
      className="pointer-events-none absolute bottom-6 left-6 md:bottom-10 md:left-12"
      aria-hidden="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage.index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex items-center gap-3"
        >
          <span className="font-sans text-[11px] font-semibold tracking-[0.22em] text-gold">
            [{stage.index}]
          </span>
          <span className="h-px w-8 bg-ink/30" />
          <span className="font-sans text-[11px] font-medium tracking-[0.22em] text-ink/70">
            {stage.label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SceneContent() {
  const progress = useScrollProgress()
  const reduced = useReducedMotion()
  const chairState = interpolateChairState(progress)
  const sectionReveal = reduced ? 1.0 : getSectionRevealProgress(progress)

  return (
    <>
      <ambientLight intensity={0.65} color="#FFF5E4" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.8}
        color="#FFF5E4"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#E3D5BE" />
      {/* Warm rim so gold facets glint as the chair turns */}
      <directionalLight position={[-4, 3, -4]} intensity={0.5} color="#D9A82E" />
      <pointLight position={[0, 3, 3]} intensity={0.3} color="#B8901F" />

      <Suspense fallback={null}>
        <ProceduralChair
          targetRotationY={chairState.rotationY}
          targetRotationX={chairState.rotationX}
          targetX={chairState.x}
          targetY={chairState.y}
          targetScale={chairState.scale}
          revealProgress={sectionReveal}
          frozen={reduced}
        />

        {/* Real radial scroll-progress ring encircling the chair */}
        <group position={[chairState.x, chairState.y, 0]} scale={chairState.scale}>
          <RadialProgressRing progress={progress} radius={1.72} />
        </group>

        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.42}
          scale={6.5}
          blur={2.0}
          far={2}
          color="#6E4327"
        />
      </Suspense>
    </>
  )
}

export default function ChairScene() {
  const canvasRef = useRef<HTMLDivElement>(null)

  // Save GPU when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (canvasRef.current) {
        canvasRef.current.style.visibility = document.hidden ? 'hidden' : 'visible'
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <GrainTexture />
      <Canvas
        camera={{ position: [0, 0.75, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
