'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RadialProgressRingProps {
  progress: number // global page scroll progress 0 -> 1
  radius?: number
  tiltX?: number
  tiltY?: number
}

const SEGMENTS = [
  { index: '01', name: 'SURFACE SCAN', color: '#B8901F' }, // Gold
  { index: '02', name: 'SCALE CHECK', color: '#8B5E3C' }, // Clay
  { index: '03', name: 'MATERIAL SHIFT', color: '#D4A017' }, // Bright Gold
  { index: '04', name: 'PLACEMENT LOCK', color: '#9E5B32' }, // Terracotta Clay
  { index: '05', name: 'LIGHT MATCH', color: '#B8901F' }, // Egyptian Gold
  { index: '06', name: 'ROOM FIT', color: '#7E4522' }, // Burnt Clay
  { index: '07', name: 'TRUE SCALE', color: '#E5B83B' }, // Radiant Gold
]

/**
 * Creates an arc segment mesh geometry (a flat ribbon in XY plane)
 */
function createArcGeometry(
  innerR: number,
  outerR: number,
  startAngle: number,
  lengthAngle: number,
  segments = 36,
): THREE.BufferGeometry {
  const geo = new THREE.RingGeometry(innerR, outerR, segments, 1, startAngle, lengthAngle)
  return geo
}

export default function RadialProgressRing({
  progress,
  radius = 1.68,
  tiltX = 1.28, // tilted ~73° to encircle the chair in authentic 3D space
  tiltY = -0.15,
}: RadialProgressRingProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const beadRef = useRef<THREE.Mesh>(null!)
  const currentProgress = useRef(progress)

  const numSegments = SEGMENTS.length
  const gap = 0.055 // gap in radians between segments
  const totalGap = gap * numSegments
  const arcSpan = (Math.PI * 2 - totalGap) / numSegments

  // Pre-generate background track geometries (unfilled ink outlines)
  const trackGeometries = useMemo(() => {
    return SEGMENTS.map((_, i) => {
      const startAngle = i * (arcSpan + gap)
      return createArcGeometry(radius - 0.012, radius + 0.012, startAngle, arcSpan, 32)
    })
  }, [radius, arcSpan, gap])

  // Track material: neutral ink-toned outline at low opacity
  const trackMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#1C1712'),
        transparent: true,
        opacity: 0.20,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [],
  )

  // Segment fill materials with gold and clay tones
  const fillMaterials = useMemo(() => {
    return SEGMENTS.map(
      (seg) =>
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(seg.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
        }),
    )
  }, [])

  // Active glint bead material
  const beadMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#FAF5EC'),
      }),
    [],
  )

  const beadGeo = useMemo(() => new THREE.SphereGeometry(0.038, 12, 12), [])

  // Meshes for dynamic fill arcs
  const fillMeshesRef = useRef<(THREE.Mesh | null)[]>([])



  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    // Smooth lerp of scroll progress so scrubbing is ultra-smooth
    const lerpFactor = 1 - Math.pow(0.001, delta)
    currentProgress.current += (progress - currentProgress.current) * lerpFactor
    const p = Math.min(Math.max(currentProgress.current, 0), 1)

    // Update fill arc geometries per segment
    for (let i = 0; i < numSegments; i++) {
      const mesh = fillMeshesRef.current[i]
      if (!mesh) continue

      const pStart = i / numSegments
      const pEnd = (i + 1) / numSegments
      const segFill = THREE.MathUtils.clamp((p - pStart) / (pEnd - pStart), 0, 1)

      if (segFill > 0.001) {
        mesh.visible = true
        const startAngle = i * (arcSpan + gap)
        const filledLength = arcSpan * segFill

        // Dispose previous dynamic geometry and replace with newly scaled arc
        if (mesh.geometry) mesh.geometry.dispose()
        mesh.geometry = createArcGeometry(
          radius - 0.022,
          radius + 0.022,
          startAngle,
          filledLength,
          Math.max(4, Math.round(36 * segFill)),
        )
      } else {
        mesh.visible = false
      }
    }

    // Position the active leading bead at the tip of the current progress
    if (beadRef.current) {
      if (p <= 0.001) {
        beadRef.current.visible = false
      } else {
        beadRef.current.visible = true
        // Find which segment is active
        const activeSeg = Math.min(Math.floor(p * numSegments), numSegments - 1)
        const pStart = activeSeg / numSegments
        const pEnd = (activeSeg + 1) / numSegments
        const segFill = THREE.MathUtils.clamp((p - pStart) / (pEnd - pStart), 0, 1)
        const currentAngle = activeSeg * (arcSpan + gap) + arcSpan * segFill

        const bx = Math.cos(currentAngle) * radius
        const by = Math.sin(currentAngle) * radius
        beadRef.current.position.set(bx, by, 0.005)
      }
    }
  })

  return (
    <group
      ref={groupRef}
      rotation={[tiltX, tiltY, 0]}
      position={[0, -0.22, 0]}
    >
      {/* 1. Unfilled Background Track Arcs (Thin neutral ink-toned outline) */}
      {trackGeometries.map((geo, i) => (
        <mesh key={`track-${i}`} geometry={geo} material={trackMaterial} />
      ))}

      {/* 2. Filled Progress Arcs (Consecutive segments filling with gold and clay) */}
      {SEGMENTS.map((_, i) => (
        <mesh
          key={`fill-${i}`}
          ref={(el) => {
            fillMeshesRef.current[i] = el
          }}
          material={fillMaterials[i]}
          visible={false}
        />
      ))}

      {/* 3. Leading Progress Glint Bead */}
      <mesh ref={beadRef} geometry={beadGeo} material={beadMaterial} visible={false} />
    </group>
  )
}
