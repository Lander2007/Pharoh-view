// Chair scroll-stage keyframes mapped to scroll progress 0-1.
// Each major page section acts as a "stage": entering it eases the shattered
// chair to a new orientation / zoom / position preset (smoothly interpolated,
// never snapped). CTA returns to a hero-like framing.
//
// Layout logic: text-heavy sections keep the object on the opposite side so
// the fixed 3D layer never fights copy legibility (radial backdrops in each
// section add extra separation).

export interface ChairStop {
  progress: number
  rotationY: number // radians, around Y (facet-facing angle)
  rotationX: number // radians, slight tilt per stage
  x: number // world units (off-center behind text)
  y: number
  scale: number // zoom (camera-equivalent)
}

export interface ChairStage {
  index: string // "01"
  label: string // "SURFACE SCAN"
  /** scroll progress at which this stage becomes active */
  progress: number
}

export const CHAIR_STAGES: ChairStage[] = [
  { index: '01', label: 'SURFACE SCAN', progress: 0 }, // Hero
  { index: '02', label: 'SCALE CHECK', progress: 0.18 }, // Problem
  { index: '03', label: 'MATERIAL SHIFT', progress: 0.35 }, // Solution
  { index: '04', label: 'PLACEMENT LOCK', progress: 0.5 }, // How it works
  { index: '05', label: 'LIGHT MATCH', progress: 0.64 }, // Value prop
  { index: '06', label: 'ROOM FIT', progress: 0.78 }, // SDGs
  { index: '07', label: 'TRUE SCALE', progress: 0.92 }, // CTA
]

export const CHAIR_STOPS: ChairStop[] = [
  // Hero (0-0.14): wide shot, clear 3/4 isometric angle showing all 4 legs, seat, backrest
  { progress: 0, rotationY: 0.45, rotationX: 0.10, x: 0, y: -0.15, scale: 1.25 },
  // Problem (0.15-0.28): zoomed out, shifted right (copy sits left)
  { progress: 0.18, rotationY: Math.PI * 0.15, rotationX: 0.14, x: 1.7, y: -0.5, scale: 1.0 },
  // Solution (0.29-0.42): closer, rotated to a new facet-facing angle, shifted left (copy sits right)
  { progress: 0.35, rotationY: Math.PI, rotationX: -0.08, x: -1.6, y: -0.5, scale: 1.1 },
  // How it works (0.43-0.56): centered, mid zoom
  { progress: 0.5, rotationY: Math.PI * 1.25, rotationX: 0.1, x: 0, y: -0.3, scale: 0.95 },
  // Value prop (0.57-0.70): shifted right, quarter turn
  { progress: 0.64, rotationY: Math.PI * 1.5, rotationX: -0.05, x: 1.6, y: -0.5, scale: 1.05 },
  // SDGs (0.71-0.84): shifted left, zoomed out
  { progress: 0.78, rotationY: Math.PI * 1.75, rotationX: 0.12, x: -1.3, y: -0.5, scale: 0.9 },
  // CTA (0.85-1.0): returns to hero-like framing
  { progress: 1.0, rotationY: Math.PI * 2, rotationX: 0.06, x: 0, y: -0.5, scale: 1.3 },
]

export function interpolateChairState(progress: number): Omit<ChairStop, 'progress'> {
  const stops = CHAIR_STOPS

  // Find surrounding stops
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
  // Ease in-out cubic for smooth stage transitions (no snapping)
  const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  return {
    rotationY: lower.rotationY + (upper.rotationY - lower.rotationY) * ease,
    rotationX: lower.rotationX + (upper.rotationX - lower.rotationX) * ease,
    x: lower.x + (upper.x - lower.x) * ease,
    y: lower.y + (upper.y - lower.y) * ease,
    scale: lower.scale + (upper.scale - lower.scale) * ease,
  }
}

/** Resolve which numbered stage label is active for a given scroll progress. */
export function getStageForProgress(progress: number): ChairStage {
  let active = CHAIR_STAGES[0]
  for (const stage of CHAIR_STAGES) {
    if (progress >= stage.progress) active = stage
  }
  return active
}

/**
 * Calculates a 0->1 per-section progress that drives the wireframe-to-solid facet reveal.
 * - When a section first enters view, reveal starts at 0 (translucent ink wireframe).
 * - As the user scrolls through the section (0 -> 0.70), facets fill in progressively bottom-to-top.
 * - Stays 100% solid (1.0) while the user reads the section.
 * - Transitions back to wireframe (1.0 -> 0.0) as the user leaves into the next section.
 * - At the final CTA (progress > 0.96), stays 100% solid.
 */
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

  // 0.00 -> 0.65: progressive wireframe-to-solid facet reveal
  if (localT <= 0.65) {
    return localT / 0.65
  }
  // 0.65 -> 0.88: fully solid while reading section content
  if (localT <= 0.88) {
    return 1.0
  }
  // 0.88 -> 1.00: transition back to wireframe priming next section
  return (1.0 - localT) / 0.12
}

