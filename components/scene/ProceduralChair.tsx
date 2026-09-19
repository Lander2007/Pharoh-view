'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

interface ProceduralChairProps {
  targetRotationY: number
  targetRotationX: number
  targetX: number
  targetY: number
  targetScale: number
  /**
   * Wireframe-to-solid reveal progress (0.0 = translucent ink wireframe only, 1.0 = fully solid shaded).
   * Driven by scroll progress.
   */
  revealProgress?: number
  /** When true (prefers-reduced-motion): stage changes jump-cut. */
  frozen?: boolean
}

/**
 * Creates a solid low-poly diamond-faceted crystalline slab:
 * - Outer boundary vertices stay 100% untouched to preserve the chair's exact silhouette.
 * - Interior vertices are displaced along an alternating diamond-cut pattern so adjacent
 *   triangles point in opposing directions (up-right, up-left, down-right, down-left).
 *   This ensures every cut facet catches the sand/gold/clay lighting distinctly like a cut gemstone.
 */
function createFacetedSlab(
  width: number,
  height: number,
  depth: number,
  segX: number,
  segY: number,
  segZ: number,
  relief: number,
  options?: {
    taperTopX?: number // trapezoidal width taper (backrest broader at shoulders)
    curveZ?: number    // ergonomic horizontal embrace curve along X
    scoopY?: number    // ergonomic seat center contour
  },
): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry(width, height, depth, segX, segY, segZ)
  const nonIndexed = geo.toNonIndexed()
  const posAttr = nonIndexed.getAttribute('position')
  const count = posAttr.count

  const halfW = width / 2
  const halfH = height / 2
  const halfD = depth / 2
  const eps = 0.003

  for (let i = 0; i < count; i++) {
    let x = posAttr.getX(i)
    let y = posAttr.getY(i)
    let z = posAttr.getZ(i)

    const isFrontFace = Math.abs(z - halfD) < eps
    const isBackFace = Math.abs(z + halfD) < eps
    const isTopFace = Math.abs(y - halfH) < eps
    const isBottomFace = Math.abs(y + halfH) < eps

    // 1. Trapezoidal width taper for backrest
    if (options?.taperTopX && height > 0) {
      const progressY = (y + halfH) / height
      const factor = 1 + options.taperTopX * (progressY - 0.5)
      x *= factor
    }

    // 2. Ergonomic horizontal embrace curve along X
    if (options?.curveZ && width > 0) {
      const nx = x / halfW
      z -= (1 - Math.cos(nx * Math.PI * 0.5)) * options.curveZ
    }

    // 3. Ergonomic seat scoop (center dip)
    if (options?.scoopY && width > 0 && depth > 0) {
      const nx = Math.abs(x / halfW)
      const nz = (z + halfD) / depth
      if (nx < 0.88 && nz > 0.12 && nz < 0.88) {
        const falloffX = Math.cos(nx * Math.PI * 0.5)
        const falloffZ = Math.sin((nz - 0.12) / 0.76 * Math.PI)
        y -= falloffX * falloffZ * options.scoopY
      }
    }

    // 4. Diamond-cut facet displacement on interior points
    // Boundaries are completely untouched so silhouette remains 100% solid, crisp, and intact.
    const isInteriorX = Math.abs(x) < halfW - eps * 2
    const isInteriorY = Math.abs(y) < halfH - eps * 2
    const isInteriorZ = Math.abs(z) < halfD - eps * 2

    if ((isFrontFace || isBackFace) && isInteriorX && isInteriorY) {
      const freqX = (segX * Math.PI) / width
      const freqY = (segY * Math.PI) / height
      const diamond = Math.sin(x * freqX) * Math.sin(y * freqY)
      const ripple = Math.cos(x * freqX * 0.5 + y * freqY * 0.5) * 0.25
      const offset = (diamond + ripple) * relief
      z += isFrontFace ? offset : -offset
    } else if ((isTopFace || isBottomFace) && isInteriorX && isInteriorZ) {
      const freqX = (segX * Math.PI) / width
      const freqZ = (segZ * Math.PI) / depth
      const diamond = Math.sin(x * freqX) * Math.sin(z * freqZ)
      const ripple = Math.cos(x * freqX * 0.5 + z * freqZ * 0.5) * 0.25
      const offset = (diamond + ripple) * relief
      y += isTopFace ? offset : -offset
    }

    posAttr.setXYZ(i, x, y, z)
  }

  nonIndexed.computeVertexNormals()
  return nonIndexed
}

/**
 * Builds an authentic, exquisitely proportioned solid low-poly modern armchair:
 * - Authentic Scandinavian/lounge proportions (seat height ~44cm, backrest rake 14°, sturdy splayed legs)
 * - 100% solid contiguous geometry — NO floating parts, NO procedural separation
 * - Crystalline faceted surfaces that catch light distinctly like a cut gemstone
 * - Sand / Gold / Clay palette gradient baked across facets based on key light direction
 * - Per-facet reveal threshold attribute for progressive bottom-to-top wireframe-to-solid transition
 * - Translucent ink-toned wireframe outlining all facets (#1C1712)
 */
function buildSolidChair(): {
  meshGeometry: THREE.BufferGeometry
  edgeGeometry: THREE.BufferGeometry
} {
  const parts: THREE.BufferGeometry[] = []

  const addPart = (
    geo: THREE.BufferGeometry,
    pos: [number, number, number],
    rot: [number, number, number] = [0, 0, 0],
    scale: [number, number, number] = [1, 1, 1],
  ) => {
    const nonIdx = geo.index ? geo.toNonIndexed() : geo.clone()
    const matrix = new THREE.Matrix4()
    const translation = new THREE.Matrix4().makeTranslation(pos[0], pos[1], pos[2])
    const rotation = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rot[0], rot[1], rot[2]))
    const scaling = new THREE.Matrix4().makeScale(scale[0], scale[1], scale[2])
    matrix.multiply(translation).multiply(rotation).multiply(scaling)
    nonIdx.applyMatrix4(matrix)
    parts.push(nonIdx)
  }

  // ==========================================
  // 1. SEAT CUSHION SLAB
  // Width 1.18, depth 1.14, thickness 0.14
  // Subtle 2.5° backward tilt for authentic armchair ergonomics
  // ==========================================
  const seatGeo = createFacetedSlab(1.18, 0.14, 1.14, 6, 2, 6, 0.030, {
    scoopY: 0.028,
  })
  addPart(seatGeo, [0, -0.06, 0.02], [-0.04, 0, 0])

  // ==========================================
  // 2. SEAT APRON FRAME (structural perimeter rails under seat cushion)
  // Flush directly against seat bottom (y = -0.13 to -0.22)
  // ==========================================
  const apronFront = createFacetedSlab(1.04, 0.09, 0.05, 4, 1, 1, 0.012)
  addPart(apronFront, [0, -0.15, 0.46], [-0.04, 0, 0])

  const apronBack = createFacetedSlab(0.98, 0.09, 0.05, 4, 1, 1, 0.012)
  addPart(apronBack, [0, -0.13, -0.44], [-0.04, 0, 0])

  const apronSide = createFacetedSlab(0.05, 0.09, 0.90, 1, 1, 4, 0.012)
  addPart(apronSide, [-0.50, -0.14, 0.01], [-0.04, 0, 0])
  addPart(apronSide, [0.50, -0.14, 0.01], [-0.04, 0, 0])

  // ==========================================
  // 3. BACKREST PANEL & INTEGRATED STILES
  // Ergonomically raked backward (14°), subtle horizontal curve embracing the back
  // Top crest caps both backrest panel and upright stiles cleanly with NO protrusions
  // ==========================================
  const rake = -0.24 // ~14 degrees

  // Main backrest faceted panel (height 0.80) with pronounced diamond-cut facets
  const backrestGeo = createFacetedSlab(1.06, 0.80, 0.08, 6, 5, 2, 0.036, {
    taperTopX: 0.10, // subtly wider at shoulder level
    curveZ: 0.05,    // gentle horizontal embrace
  })
  addPart(backrestGeo, [0, 0.40, -0.48], [rake, 0, 0])

  // Upright support stiles connecting bottom frame to backrest top (flush at top)
  const stileGeo = createFacetedSlab(0.065, 0.88, 0.065, 1, 5, 1, 0.010)
  addPart(stileGeo, [-0.49, 0.36, -0.49], [rake, 0, 0])
  addPart(stileGeo, [0.49, 0.36, -0.49], [rake, 0, 0])

  // Top crest rail capping the entire backrest cleanly
  const topCrestGeo = createFacetedSlab(1.14, 0.06, 0.08, 5, 1, 1, 0.014)
  addPart(topCrestGeo, [0, 0.79, -0.58], [rake, 0, 0])

  // Lumbar support lower crossbar
  const lumbarGeo = createFacetedSlab(1.02, 0.06, 0.06, 4, 1, 1, 0.010)
  addPart(lumbarGeo, [0, 0.02, -0.40], [rake, 0, 0])

  // ==========================================
  // 4. FOUR SPLAYED FACETED LEGS
  // Grounded armchair proportions: leg height 0.52 (seat bottom at -0.18, floor at -0.70)
  // Tapered hexagonal cross-section with natural splayed stance
  // ==========================================
  const legGeo = new THREE.CylinderGeometry(0.045, 0.028, 0.52, 6, 3)

  // Front-Left leg: splayed outward and forward
  addPart(legGeo, [-0.49, -0.44, 0.44], [0.08, 0, 0.09])
  // Front-Right leg: splayed outward and forward
  addPart(legGeo, [0.49, -0.44, 0.44], [0.08, 0, -0.09])
  // Rear-Left leg: raked backward and outward for iconic chair stance
  addPart(legGeo, [-0.47, -0.44, -0.44], [-0.16, 0, 0.09])
  // Rear-Right leg: raked backward and outward
  addPart(legGeo, [0.47, -0.44, -0.44], [-0.16, 0, -0.09])

  // ==========================================
  // 5. CROSS STRETCHERS (Structural bracing between legs)
  // Positioned at lower third (y = -0.52)
  // ==========================================
  const sideStretcherGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.86, 5, 1)
  addPart(sideStretcherGeo, [-0.49, -0.52, 0.01], [Math.PI / 2, 0, 0])
  addPart(sideStretcherGeo, [0.49, -0.52, 0.01], [Math.PI / 2, 0, 0])

  const rearStretcherGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.88, 5, 1)
  addPart(rearStretcherGeo, [0, -0.46, -0.44], [0, 0, Math.PI / 2])

  // ==========================================
  // 6. SCULPTED FACETED ARMRESTS
  // Horizontal arm pads with crystalline facets and vertical support posts
  // ==========================================
  const armPadGeo = createFacetedSlab(0.11, 0.045, 0.86, 2, 1, 5, 0.018)
  addPart(armPadGeo, [-0.55, 0.18, -0.01], [-0.03, 0, 0])
  addPart(armPadGeo, [0.55, 0.18, -0.01], [-0.03, 0, 0])

  // Front vertical arm supports connecting apron to armpads
  const armPostGeo = createFacetedSlab(0.05, 0.28, 0.05, 1, 2, 1, 0.010)
  addPart(armPostGeo, [-0.53, 0.04, 0.36], [0.04, 0, 0])
  addPart(armPostGeo, [0.53, 0.04, 0.36], [0.04, 0, 0])

  // Merge all parts into one solid contiguous geometry
  const merged = mergeGeometries(parts, false)
  parts.forEach((p) => p.dispose())

  // Non-indexed so each triangle has distinct normals and vertex colors
  const nonIndexed = merged.index ? merged.toNonIndexed() : merged
  nonIndexed.computeVertexNormals()

  // ==========================================
  // STEP 3: Bake palette gradient across faceted surfaces
  // Sand (#EFE6D8), Gold (#B8901F), Clay (#8B5E3C)
  // Carefully calibrated lighting response so midtone facets shine with rich Egyptian gold,
  // key-facing facets glow with luminous sand, and shaded facets catch warm terracotta clay.
  // ==========================================
  const keyLightDir = new THREE.Vector3(3.0, 4.5, 3.5).normalize()
  const fillLightDir = new THREE.Vector3(-2.2, 1.5, 1.5).normalize()

  const posAttr = nonIndexed.getAttribute('position')
  const vertexCount = posAttr.count
  const colors = new Float32Array(vertexCount * 3)
  const thresholds = new Float32Array(vertexCount)

  // Palette color stops
  const cDeepClay    = new THREE.Color('#462614') // deep burnt clay / shadow
  const cClay        = new THREE.Color('#8B5E3C') // warm terracotta clay
  const cWarmAmber   = new THREE.Color('#A86F22') // rich amber ochre
  const cDesertGold  = new THREE.Color('#B8901F') // iconic Egyptian gold
  const cRadiantGold = new THREE.Color('#D8A426') // gleaming polished gold
  const cWarmSand    = new THREE.Color('#EFE6D8') // warm luminous sand
  const cHighlight   = new THREE.Color('#FAF5EC') // sparkling champagne highlight

  const vA = new THREE.Vector3()
  const vB = new THREE.Vector3()
  const vC = new THREE.Vector3()
  const e1 = new THREE.Vector3()
  const e2 = new THREE.Vector3()
  const faceNormal = new THREE.Vector3()
  const facetColor = new THREE.Color()

  const minY = -0.70
  const heightSpan = 1.52

  for (let i = 0; i < vertexCount; i += 3) {
    vA.fromBufferAttribute(posAttr, i)
    vB.fromBufferAttribute(posAttr, i + 1)
    vC.fromBufferAttribute(posAttr, i + 2)

    e1.subVectors(vB, vA)
    e2.subVectors(vC, vA)
    faceNormal.crossVectors(e1, e2).normalize()

    // Key and fill lighting dot products
    const keyDot = faceNormal.dot(keyLightDir)
    const fillDot = faceNormal.dot(fillLightDir)

    // Balanced lighting response: 0 to 1
    const rawLight = keyDot * 0.54 + fillDot * 0.20 + 0.46
    const t = THREE.MathUtils.clamp(rawLight, 0, 1)

    // Jewel-like palette gradient across facets:
    if (t < 0.24) {
      facetColor.copy(cDeepClay).lerp(cClay, t / 0.24)
    } else if (t < 0.45) {
      facetColor.copy(cClay).lerp(cWarmAmber, (t - 0.24) / 0.21)
    } else if (t < 0.68) {
      facetColor.copy(cWarmAmber).lerp(cDesertGold, (t - 0.45) / 0.23)
    } else if (t < 0.85) {
      facetColor.copy(cDesertGold).lerp(cRadiantGold, (t - 0.68) / 0.17)
    } else if (t < 0.94) {
      facetColor.copy(cRadiantGold).lerp(cWarmSand, (t - 0.85) / 0.09)
    } else {
      facetColor.copy(cWarmSand).lerp(cHighlight, (t - 0.94) / 0.06)
    }

    // Centroid of this triangle face
    const cy = (vA.y + vB.y + vC.y) / 3.0
    const cx = (vA.x + vB.x + vC.x) / 3.0
    const cz = (vA.z + vB.z + vC.z) / 3.0

    // Deliberate bottom-to-top sequence with harmonic facet rhythm
    const normY = THREE.MathUtils.clamp((cy - minY) / heightSpan, 0.0, 1.0)
    const wave = (Math.sin(cx * 11.0) * Math.cos(cz * 11.0) + 1.0) * 0.04
    const thresh = THREE.MathUtils.clamp(normY * 0.92 + wave, 0.0, 1.0)

    // Assign uniform facet color and reveal threshold to all 3 vertices
    for (let j = 0; j < 3; j++) {
      colors[(i + j) * 3] = facetColor.r
      colors[(i + j) * 3 + 1] = facetColor.g
      colors[(i + j) * 3 + 2] = facetColor.b
      thresholds[i + j] = thresh
    }
  }

  nonIndexed.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  nonIndexed.setAttribute('aThreshold', new THREE.BufferAttribute(thresholds, 1))

  // ==========================================
  // STEP 4 & WIREFRAME: Translucent ink wireframe edges outlining the faceted geometry (#1C1712)
  // Threshold 10 degrees traces crystalline facet boundaries without visual noise
  // ==========================================
  const edgeGeometry = new THREE.EdgesGeometry(nonIndexed, 10)

  return {
    meshGeometry: nonIndexed,
    edgeGeometry,
  }
}

export default function ProceduralChair({
  targetRotationY,
  targetRotationX,
  targetX,
  targetY,
  targetScale,
  revealProgress = 1.0,
  frozen = false,
}: ProceduralChairProps) {
  const outerRef = useRef<THREE.Group>(null!)

  const currentState = useRef({
    rotationY: targetRotationY,
    rotationX: targetRotationX,
    x: targetX,
    y: targetY,
    scale: targetScale,
  })

  // Shader uniform controlling wireframe-to-solid progressive facet materialization
  const revealUniform = useRef({ value: revealProgress })

  const { meshGeometry, edgeGeometry } = useMemo(buildSolidChair, [])

  // Custom shader on MeshStandardMaterial that discards facets when uRevealProgress < vThreshold
  // and flashes a shimmering champagne highlight as each facet freshly crystallizes
  const chairMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.35,
      metalness: 0.24,
      flatShading: true,
    })

    mat.customProgramCacheKey = () => 'wireframe_to_solid_chair'
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uRevealProgress = revealUniform.current
      shader.vertexShader = `
        attribute float aThreshold;
        varying float vThreshold;
      ` + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <color_vertex>',
        `#include <color_vertex>
         vThreshold = aThreshold;`
      )
      shader.fragmentShader = `
        uniform float uRevealProgress;
        varying float vThreshold;
      ` + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        float delta = uRevealProgress - vThreshold;
        if (delta < 0.0) {
          discard;
        }
        #include <color_fragment>
        if (delta < 0.05) {
          float flash = (1.0 - delta / 0.05) * 0.40;
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0, 0.96, 0.86), flash);
        }
        `
      )
    }
    return mat
  }, [])

  // Translucent ink-toned wireframe mesh (#1C1712 at low opacity)
  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#1C1712'),
        transparent: true,
        opacity: 0.35,
      }),
    [],
  )

  useFrame((_, rawDelta) => {
    if (!outerRef.current) return
    const delta = Math.min(rawDelta, 0.05)

    const targetReveal = THREE.MathUtils.clamp(revealProgress, 0.0, 1.0)

    if (frozen) {
      currentState.current = {
        rotationY: targetRotationY,
        rotationX: targetRotationX,
        x: targetX,
        y: targetY,
        scale: targetScale,
      }
      revealUniform.current.value = targetReveal
    } else {
      const lerpFactor = 1 - Math.pow(0.01, delta)
      const s = currentState.current
      s.rotationY += (targetRotationY - s.rotationY) * lerpFactor
      s.rotationX += (targetRotationX - s.rotationX) * lerpFactor
      s.x += (targetX - s.x) * lerpFactor
      s.y += (targetY - s.y) * lerpFactor
      s.scale += (targetScale - s.scale) * lerpFactor

      // Smooth, responsive scrub of the reveal threshold
      revealUniform.current.value += (targetReveal - revealUniform.current.value) * 0.25
    }

    const s = currentState.current
    outerRef.current.rotation.y = s.rotationY
    outerRef.current.rotation.x = s.rotationX
    outerRef.current.position.x = s.x
    outerRef.current.position.y = s.y
    outerRef.current.scale.setScalar(s.scale)
  })

  return (
    <group ref={outerRef}>
      {/* 1. Translucent ink wireframe skeleton outlining the faceted geometry (#1C1712) */}
      <lineSegments geometry={edgeGeometry} material={edgeMaterial} />

      {/* 2. Solid shaded facets progressively filling in face-by-face via shader */}
      <mesh
        geometry={meshGeometry}
        material={chairMaterial}
        castShadow
        receiveShadow
      />
    </group>
  )
}
