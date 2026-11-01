// Chair scroll-stage keyframes mapped to scroll progress 0-1.
// Pinned Cinematic Movie Scroll Sequence:
// - Hero (0 to 0.14): starts centered at scale 0.92, dollys closer (scale 1.18) at mid-pin,
//   then glides to right (+28vw / x: 1.65) docking seamlessly into Section 02.

export interface ChairStop {
  progress: number
  rotationY: number // radians, around Y
  rotationX: number // radians, slight tilt
  x: number // world units
  y: number
  scale: number // zoom
}

export interface ChairStage {
  index: string
  label: string
  progress: number
}

export const CHAIR_STAGES: ChairStage[] = [
  { index: '01', label: 'SURFACE SCAN', progress: 0 },
  { index: '02', label: 'SCALE CHECK', progress: 0.18 },
  { index: '03', label: 'MATERIAL SHIFT', progress: 0.38 },
  { index: '04', label: 'PLACEMENT LOCK', progress: 0.54 },
  { index: '05', label: 'LIGHT MATCH', progress: 0.68 },
  { index: '06', label: 'ROOM FIT', progress: 0.82 },
  { index: '07', label: 'TRUE SCALE', progress: 0.94 },
]

export const CHAIR_STOPS: ChairStop[] = [
  // 0% Scroll: Center-Right (+14vw) inside AR Viewfinder HUD, scale 1.05, sits in front of split doors
  { progress: 0, rotationY: 0.35, rotationX: 0.08, x: 1.35, y: -0.22, scale: 1.05 },
  // ~50% Pinned Hero Scroll: Background doors split open, chair stays in view arcing toward Section 02
  { progress: 0.07, rotationY: 0.48, rotationX: 0.10, x: 1.50, y: -0.32, scale: 1.02 },
  // 100% Pinned Hero Scroll -> Transition to Problem: Rotates 35° facing Section 02 copy and docks in right column
  { progress: 0.14, rotationY: 0.61, rotationX: 0.12, x: 1.65, y: -0.45, scale: 1.0 },
  // Problem Section (0.15 - 0.32): Docked on right (copy sits left), facing inward
  { progress: 0.26, rotationY: 0.61, rotationX: 0.12, x: 1.65, y: -0.45, scale: 1.0 },
  // Solution Section (0.33 - 0.48): Closer, shifted left
  { progress: 0.40, rotationY: Math.PI, rotationX: -0.06, x: -1.55, y: -0.45, scale: 1.1 },
  // How it works / Process Section (0.49 - 0.64): Centered for station inspection
  { progress: 0.55, rotationY: Math.PI * 1.25, rotationX: 0.08, x: 0, y: -0.28, scale: 1.05 },
  // Value prop Section (0.65 - 0.78): Shifted right
  { progress: 0.70, rotationY: Math.PI * 1.5, rotationX: -0.05, x: 1.55, y: -0.45, scale: 1.05 },
  // SDGs Section (0.79 - 0.90): Shifted left
  { progress: 0.84, rotationY: Math.PI * 1.75, rotationX: 0.10, x: -1.3, y: -0.45, scale: 0.9 },
  // CTA Section (0.91 - 1.0): Centered hero-like framing
  { progress: 1.0, rotationY: Math.PI * 2, rotationX: 0.06, x: 0, y: -0.45, scale: 1.28 },
]

export function interpolateChairState(progress: number): Omit<ChairStop, 'progress'> {
  const stops = CHAIR_STOPS

  let lower = stops[0]
  let upper = stops[stops.length - 1]

  for (let i = 0; i < stops.length - 1; i++) {
    if (progress >= stops[i].progress && progress <= stops[i + 1].progress) {
      lower = stops[i]
      upper = stops[i + 1]
      break
    }
  }

  if (lower === upper)
    return {
      rotationY: lower.rotationY,
      rotationX: lower.rotationX,
      x: lower.x,
      y: lower.y,
      scale: lower.scale,
    }

  const t = (progress - lower.progress) / (upper.progress - lower.progress)
  // Ease in-out cubic
  const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  return {
    rotationY: lower.rotationY + (upper.rotationY - lower.rotationY) * ease,
    rotationX: lower.rotationX + (upper.rotationX - lower.rotationX) * ease,
    x: lower.x + (upper.x - lower.x) * ease,
    y: lower.y + (upper.y - lower.y) * ease,
    scale: lower.scale + (upper.scale - lower.scale) * ease,
  }
}

export function getStageForProgress(progress: number): ChairStage {
  let active = CHAIR_STAGES[0]
  for (const stage of CHAIR_STAGES) {
    if (progress >= stage.progress) active = stage
  }
  return active
}

export function getSectionRevealProgress(progress: number): number {
  if (progress >= 0.96) return 1.0

  const stops = CHAIR_STOPS
  let start = stops[0].progress
  let end = stops[1].progress

  for (let i = 0; i < stops.length - 1; i++) {
    if (progress >= stops[i].progress && progress <= stops[i + 1].progress) {
      start = stops[i].progress
      end = stops[i + 1].progress
      break
    }
  }

  const duration = end - start
  if (duration <= 0) return 1.0

  const localT = Math.min(Math.max((progress - start) / duration, 0), 1)

  if (localT <= 0.65) {
    return localT / 0.65
  }
  if (localT <= 0.88) {
    return 1.0
  }
  return (1.0 - localT) / 0.12
}
