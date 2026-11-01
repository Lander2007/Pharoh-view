'use client'

import * as THREE from 'three'

export interface CinematicFrame {
  progress: number
  cameraPos: [number, number, number]
  cameraTarget: [number, number, number]
  cameraFov: number
  scanProgress: number        // 0 to 1 (LiDAR scanning wave across room)
  furnitureArrival: number    // 0 to 1 (0 = hidden/airborne, 1 = settled on floor)
  furnitureRotationY: number  // Continuous scroll-driven 360° rotation around vertical center axis (radians)
  roomTransformation: number  // 0 to 1 (organic wool rug, travertine table, gallery accessories)
  sunIntensity: number
  ambientWarmth: number
}

/**
 * 7 Chapters accurately mapped across continuous scroll progress (0.0 to 1.0).
 * Choreographed from an intentional architectural 2-point perspective:
 * - Left 35-40% viewport: serene ivory plaster wall backdrop for high-contrast typography.
 * - Right 60-65% viewport: floor-to-ceiling bronze window, natural sunlight, and the 3D chair showcase.
 * - The chair is normalized at floor level (y = 0.00) with its visual center at y = 0.44m.
 * - Camera targets are aligned with the chair's true center of mass to ensure ample breathing room above and below.
 */
export const CINEMATIC_KEYFRAMES: CinematicFrame[] = [
  // CHAPTER 01 — THE EMPTY SPACE (0.0 - 0.15)
  // Establishing architectural shot: empty room, sunbeam pool on oak floor
  {
    progress: 0.0,
    cameraPos: [-1.4, 1.48, 4.3],
    cameraTarget: [0.65, 0.85, -0.2],
    cameraFov: 41,
    scanProgress: 0.0,
    furnitureArrival: 0.0,
    furnitureRotationY: 0.38,
    roomTransformation: 0.0,
    sunIntensity: 3.2,
    ambientWarmth: 1.0,
  },
  {
    progress: 0.12,
    cameraPos: [-1.1, 1.44, 3.9],
    cameraTarget: [0.62, 0.80, -0.1],
    cameraFov: 41,
    scanProgress: 0.0,
    furnitureArrival: 0.0,
    furnitureRotationY: 0.38,
    roomTransformation: 0.0,
    sunIntensity: 3.2,
    ambientWarmth: 1.0,
  },

  // CHAPTER 02 — THE SPATIAL SCAN (0.15 - 0.30)
  // Camera glides forward; LiDAR point-cloud / mesh scanning sweeps across floor and walls
  {
    progress: 0.18,
    cameraPos: [-0.6, 1.38, 3.5],
    cameraTarget: [0.58, 0.68, 0.1],
    cameraFov: 41,
    scanProgress: 0.45,
    furnitureArrival: 0.0,
    furnitureRotationY: 0.38,
    roomTransformation: 0.0,
    sunIntensity: 2.8,
    ambientWarmth: 1.1,
  },
  {
    progress: 0.28,
    cameraPos: [-0.2, 1.32, 3.0],
    cameraTarget: [0.55, 0.58, 0.2],
    cameraFov: 41,
    scanProgress: 1.0,
    furnitureArrival: 0.0,
    furnitureRotationY: 0.38,
    roomTransformation: 0.0,
    sunIntensity: 2.9,
    ambientWarmth: 1.1,
  },

  // CHAPTER 03 — THE ARRIVAL (0.30 - 0.46)
  // Chair settles gently onto the floor at 1:1 scale; contact shadow grounds firmly onto the oak planks.
  // Visual center aligned at y = 0.44m, sitting comfortably in the upper-right optical zone.
  {
    progress: 0.34,
    cameraPos: [0.0, 1.18, 2.7],
    cameraTarget: [0.55, 0.44, 0.35],
    cameraFov: 38,
    scanProgress: 0.8,
    furnitureArrival: 0.55,
    furnitureRotationY: 0.42,
    roomTransformation: 0.0,
    sunIntensity: 3.1,
    ambientWarmth: 1.0,
  },
  {
    progress: 0.44,
    cameraPos: [0.15, 1.12, 2.5],
    cameraTarget: [0.55, 0.44, 0.35],
    cameraFov: 38,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: 0.65,
    roomTransformation: 0.0,
    sunIntensity: 3.2,
    ambientWarmth: 1.0,
  },

  // CHAPTER 04 — THE TRANSFORMATION (0.46 - 0.62)
  // Camera widens to medium architectural view. Space transforms with organic wool rug and travertine table.
  // Chair progressively rotates to display armrest profile, joinery, and tapered swept legs.
  {
    progress: 0.52,
    cameraPos: [-0.6, 1.18, 3.1],
    cameraTarget: [0.50, 0.44, 0.35],
    cameraFov: 41,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: 1.45,
    roomTransformation: 0.6,
    sunIntensity: 3.2,
    ambientWarmth: 1.15,
  },
  {
    progress: 0.60,
    cameraPos: [-0.9, 1.22, 3.3],
    cameraTarget: [0.48, 0.44, 0.35],
    cameraFov: 42,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: 2.20,
    roomTransformation: 1.0,
    sunIntensity: 3.2,
    ambientWarmth: 1.2,
  },

  // CHAPTER 05 — THE TECHNOLOGY & MATERIAL LAB (0.62 - 0.76)
  // Intimate macro close-up framing the chair's timber grain, bouclé upholstery weave, and brass joinery.
  // Chair swings around towards front/three-quarters for material swatch inspection.
  {
    progress: 0.68,
    cameraPos: [0.22, 0.82, 1.65],
    cameraTarget: [0.55, 0.44, 0.35],
    cameraFov: 33,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: 2.95,
    roomTransformation: 1.0,
    sunIntensity: 2.9,
    ambientWarmth: 1.1,
  },
  {
    progress: 0.75,
    cameraPos: [0.35, 0.84, 1.75],
    cameraTarget: [0.55, 0.44, 0.35],
    cameraFov: 34,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: 3.65,
    roomTransformation: 1.0,
    sunIntensity: 2.9,
    ambientWarmth: 1.1,
  },

  // CHAPTER 06 — THE IMPACT (0.76 - 0.88)
  // Silky-smooth architectural crane pullback: smoothly expanding field of view with zero direction reversals.
  {
    progress: 0.80,
    cameraPos: [0.52, 1.02, 2.25],
    cameraTarget: [0.50, 0.44, 0.35],
    cameraFov: 36,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: 4.25,
    roomTransformation: 1.0,
    sunIntensity: 3.0,
    ambientWarmth: 1.1,
  },
  {
    progress: 0.86,
    cameraPos: [0.68, 1.16, 2.65],
    cameraTarget: [0.46, 0.44, 0.35],
    cameraFov: 38,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: 4.90,
    roomTransformation: 1.0,
    sunIntensity: 3.0,
    ambientWarmth: 1.1,
  },

  // CHAPTER 07 — ROADMAP & FINAL CALL TO ACTION (0.88 - 1.0)
  // Balanced architectural framing: left side houses roadmap cards & download action,
  // right side showcases the 3D Scandinavian chair bathed in sunlight with ample negative space.
  {
    progress: 0.94,
    cameraPos: [0.35, 1.22, 3.1],
    cameraTarget: [0.45, 0.44, 0.35],
    cameraFov: 40,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: 5.95,
    roomTransformation: 1.0,
    sunIntensity: 2.8,
    ambientWarmth: 1.05,
  },
  {
    progress: 1.0,
    cameraPos: [0.05, 1.25, 3.4],
    cameraTarget: [0.45, 0.44, 0.35],
    cameraFov: 40,
    scanProgress: 0.0,
    furnitureArrival: 1.0,
    furnitureRotationY: Math.PI * 2 + 0.38,
    roomTransformation: 1.0,
    sunIntensity: 2.7,
    ambientWarmth: 1.0,
  },
]

export function interpolateHeroCamera(
  heroProgress: number,
  isRTL: boolean = false
): {
  pos: [number, number, number]
  target: [number, number, number]
  fov: number
} {
  const chairX = isRTL ? -0.55 : 0.55
  const clamped = THREE.MathUtils.clamp(heroProgress, 0, 1)

  let pos: [number, number, number]
  let target: [number, number, number]
  let fov: number

  if (clamped <= 0.25) {
    // Stage 1: LiDAR Floor Scan & Camera Push (0% to 25%)
    // Smoothly dolly the 3D camera forward toward the center of the wooden floor (camera.position.z moves closer by 1.5 units, slight pan toward center)
    const t = clamped / 0.25
    const ease = t * t * (3 - 2 * t)
    const startX = isRTL ? 1.4 : -1.4
    const endX = isRTL ? 0.35 : -0.35
    const startTargetX = isRTL ? -0.65 : 0.65

    pos = [
      THREE.MathUtils.lerp(startX, endX, ease),
      THREE.MathUtils.lerp(1.48, 1.35, ease),
      THREE.MathUtils.lerp(4.3, 2.8, ease), // closer by 1.5 units (4.3 -> 2.8)
    ]
    target = [
      THREE.MathUtils.lerp(startTargetX, chairX, ease),
      THREE.MathUtils.lerp(0.85, 0.52, ease),
      THREE.MathUtils.lerp(-0.2, 0.35, ease),
    ]
    fov = THREE.MathUtils.lerp(41, 40, ease)
  } else if (clamped <= 0.75) {
    // Stage 2: Materializing the Furniture (25% to 75%)
    const t = (clamped - 0.25) / 0.50
    const ease = t * t * (3 - 2 * t)
    const startX = isRTL ? 0.35 : -0.35
    const endX = isRTL ? -0.15 : 0.15

    pos = [
      THREE.MathUtils.lerp(startX, endX, ease),
      THREE.MathUtils.lerp(1.35, 1.15, ease),
      THREE.MathUtils.lerp(2.8, 2.5, ease),
    ]
    target = [chairX, THREE.MathUtils.lerp(0.52, 0.44, ease), 0.35]
    fov = THREE.MathUtils.lerp(40, 38, ease)
  } else {
    // Stage 3: Ambient Lamp Ignition & Full Furnished View (75% to 100%)
    const t = (clamped - 0.75) / 0.25
    const ease = t * t * (3 - 2 * t)
    const startX = isRTL ? -0.15 : 0.15
    const endX = isRTL ? 0.6 : -0.6

    pos = [
      THREE.MathUtils.lerp(startX, endX, ease),
      THREE.MathUtils.lerp(1.15, 1.25, ease),
      THREE.MathUtils.lerp(2.5, 3.1, ease),
    ]
    target = [chairX, THREE.MathUtils.lerp(0.44, 0.48, ease), 0.35]
    fov = THREE.MathUtils.lerp(38, 41, ease)
  }

  return { pos, target, fov }
}

export function interpolateCinematicFrame(progress: number): CinematicFrame {
  const frames = CINEMATIC_KEYFRAMES
  const clamped = THREE.MathUtils.clamp(progress, 0, 1)

  let lower = frames[0]
  let upper = frames[frames.length - 1]

  for (let i = 0; i < frames.length - 1; i++) {
    if (clamped >= frames[i].progress && clamped <= frames[i + 1].progress) {
      lower = frames[i]
      upper = frames[i + 1]
      break
    }
  }

  if (lower === upper) return lower

  const t = (clamped - lower.progress) / (upper.progress - lower.progress)
  // Smooth cubic ease in-out
  const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  const lerp = (a: number, b: number) => a + (b - a) * ease

  return {
    progress: clamped,
    cameraPos: [
      lerp(lower.cameraPos[0], upper.cameraPos[0]),
      lerp(lower.cameraPos[1], upper.cameraPos[1]),
      lerp(lower.cameraPos[2], upper.cameraPos[2]),
    ],
    cameraTarget: [
      lerp(lower.cameraTarget[0], upper.cameraTarget[0]),
      lerp(lower.cameraTarget[1], upper.cameraTarget[1]),
      lerp(lower.cameraTarget[2], upper.cameraTarget[2]),
    ],
    cameraFov: lerp(lower.cameraFov, upper.cameraFov),
    scanProgress: lerp(lower.scanProgress, upper.scanProgress),
    furnitureArrival: lerp(lower.furnitureArrival, upper.furnitureArrival),
    furnitureRotationY: lerp(lower.furnitureRotationY, upper.furnitureRotationY),
    roomTransformation: lerp(lower.roomTransformation, upper.roomTransformation),
    sunIntensity: lerp(lower.sunIntensity, upper.sunIntensity),
    ambientWarmth: lerp(lower.ambientWarmth, upper.ambientWarmth),
  }
}
