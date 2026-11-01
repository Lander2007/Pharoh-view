'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { useSceneState } from '@/lib/sceneState'

interface ProceduralChairProps {
  targetRotationY: number
  targetRotationX?: number
  targetX?: number
  targetY?: number
  targetScale?: number
  revealProgress?: number
  scrollProgress?: number
  frozen?: boolean
  hologramOpacity?: number
}

/**
 * Creates high-fidelity procedural PBR textures for White Oak, Smoked Walnut,
 * Cream Bouclé, and Oatmeal Linen.
 */
function createChairTextures() {
  if (typeof document === 'undefined') {
    return { oakTex: null, walnutTex: null, boucleTex: null, linenTex: null }
  }

  // 1. Natural White Scandinavian Oak (512x512)
  const oakCanvas = document.createElement('canvas')
  oakCanvas.width = 512
  oakCanvas.height = 512
  const oCtx = oakCanvas.getContext('2d')
  if (oCtx) {
    oCtx.fillStyle = '#C89D54'
    oCtx.fillRect(0, 0, 512, 512)

    oCtx.strokeStyle = 'rgba(175, 128, 68, 0.35)'
    oCtx.lineWidth = 1.6
    for (let x = 0; x < 512; x += 5) {
      oCtx.beginPath()
      oCtx.moveTo(x, 0)
      for (let y = 0; y < 512; y += 24) {
        const offset = Math.sin(y * 0.02 + x * 0.04) * 4 + Math.sin(y * 0.006) * 7
        oCtx.lineTo(x + offset, y)
      }
      oCtx.stroke()
    }

    // Subtle medullary rays (wood flakes)
    oCtx.fillStyle = 'rgba(235, 212, 178, 0.22)'
    for (let i = 0; i < 90; i++) {
      oCtx.fillRect(Math.random() * 512, Math.random() * 512, 2.5, 12 + Math.random() * 28)
    }
  }
  const oakTex = new THREE.CanvasTexture(oakCanvas)
  oakTex.wrapS = THREE.RepeatWrapping
  oakTex.wrapT = THREE.RepeatWrapping
  oakTex.repeat.set(2, 2)
  oakTex.colorSpace = THREE.SRGBColorSpace

  // 2. Smoked Royal Walnut (512x512)
  const walnutCanvas = document.createElement('canvas')
  walnutCanvas.width = 512
  walnutCanvas.height = 512
  const wCtx = walnutCanvas.getContext('2d')
  if (wCtx) {
    wCtx.fillStyle = '#3B2618'
    wCtx.fillRect(0, 0, 512, 512)

    wCtx.strokeStyle = 'rgba(28, 16, 9, 0.45)'
    wCtx.lineWidth = 2.0
    for (let x = 0; x < 512; x += 6) {
      wCtx.beginPath()
      wCtx.moveTo(x, 0)
      for (let y = 0; y < 512; y += 24) {
        const offset = Math.sin(y * 0.015 + x * 0.03) * 6 + Math.cos(y * 0.007) * 11
        wCtx.lineTo(x + offset, y)
      }
      wCtx.stroke()
    }
  }
  const walnutTex = new THREE.CanvasTexture(walnutCanvas)
  walnutTex.wrapS = THREE.RepeatWrapping
  walnutTex.wrapT = THREE.RepeatWrapping
  walnutTex.repeat.set(2, 2)
  walnutTex.colorSpace = THREE.SRGBColorSpace

  // 3. Tactile Cream Bouclé Fabric (512x512)
  const boucleCanvas = document.createElement('canvas')
  boucleCanvas.width = 512
  boucleCanvas.height = 512
  const bCtx = boucleCanvas.getContext('2d')
  if (bCtx) {
    bCtx.fillStyle = '#FAF6F0'
    bCtx.fillRect(0, 0, 512, 512)

    const colors = [
      'rgba(238, 228, 215, 0.6)',
      'rgba(218, 204, 188, 0.45)',
      'rgba(255, 255, 255, 0.85)',
      'rgba(244, 238, 228, 0.7)',
    ]
    for (let i = 0; i < 4000; i++) {
      const cx = Math.random() * 512
      const cy = Math.random() * 512
      const r = 1.2 + Math.random() * 3.2
      bCtx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      bCtx.beginPath()
      bCtx.arc(cx, cy, r, 0, Math.PI * 2)
      bCtx.fill()
    }
  }
  const boucleTex = new THREE.CanvasTexture(boucleCanvas)
  boucleTex.wrapS = THREE.RepeatWrapping
  boucleTex.wrapT = THREE.RepeatWrapping
  boucleTex.repeat.set(4, 4)
  boucleTex.colorSpace = THREE.SRGBColorSpace

  // 4. Natural Oatmeal Linen Fabric (512x512)
  const linenCanvas = document.createElement('canvas')
  linenCanvas.width = 512
  linenCanvas.height = 512
  const lCtx = linenCanvas.getContext('2d')
  if (lCtx) {
    lCtx.fillStyle = '#ECE4D8'
    lCtx.fillRect(0, 0, 512, 512)

    lCtx.fillStyle = 'rgba(195, 180, 160, 0.22)'
    for (let x = 0; x < 512; x += 3) {
      lCtx.fillRect(x, 0, 1.2, 512)
    }
    for (let y = 0; y < 512; y += 3) {
      lCtx.fillRect(0, y, 512, 1.2)
    }
  }
  const linenTex = new THREE.CanvasTexture(linenCanvas)
  linenTex.wrapS = THREE.RepeatWrapping
  linenTex.wrapT = THREE.RepeatWrapping
  linenTex.repeat.set(4, 4)
  linenTex.colorSpace = THREE.SRGBColorSpace

  return { oakTex, walnutTex, boucleTex, linenTex }
}

/**
 * Builds the complete Scandinavian Architectural Lounge Armchair:
 * - Real-world millimeter ergonomics (820mm W x 840mm D x 780mm H, 420mm Seat Height).
 * - Floor-grounded normalization: base of all four legs touches EXACTLY y = 0.000.
 * - Center pivot at (0, 0, 0), visual midpoint at y = 0.44m.
 * - Splayed turned legs with champagne brass ferrules.
 * - Sculpted flat timber armrests, apron rails, stretchers, and raked backrest.
 * - Ergonomic plush upholstered seat cushion and curved backrest cushion.
 */
function buildArchitecturalArmchair(): {
  timberGeometry: THREE.BufferGeometry
  cushionGeometry: THREE.BufferGeometry
  brassGeometry: THREE.BufferGeometry
  edgeGeometry: THREE.BufferGeometry
  boundingBoxGeo: THREE.BufferGeometry
} {
  const timberParts: THREE.BufferGeometry[] = []
  const cushionParts: THREE.BufferGeometry[] = []
  const brassParts: THREE.BufferGeometry[] = []

  const addTransformed = (
    list: THREE.BufferGeometry[],
    geo: THREE.BufferGeometry,
    pos: [number, number, number],
    rot: [number, number, number] = [0, 0, 0],
    scale: [number, number, number] = [1, 1, 1]
  ) => {
    const nonIdx = geo.index ? geo.toNonIndexed() : geo.clone()
    const matrix = new THREE.Matrix4()
    const t = new THREE.Matrix4().makeTranslation(pos[0], pos[1], pos[2])
    const r = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rot[0], rot[1], rot[2]))
    const s = new THREE.Matrix4().makeScale(scale[0], scale[1], scale[2])
    matrix.multiply(t).multiply(r).multiply(s)
    nonIdx.applyMatrix4(matrix)
    list.push(nonIdx)
  }

  // =========================================================================
  // 1. TURNED SOLID HARDWOOD LEGS & BRASS FERRULES (Grounding at y = 0.000)
  // =========================================================================
  // Front Legs: Height 0.38m, splayed forward (0.07 rad) and outward (±0.06 rad).
  // Cylinder height 0.38m, center y = 0.19m -> bottom at y = 0.000!
  const frontLegGeo = new THREE.CylinderGeometry(0.026, 0.017, 0.38, 16)
  addTransformed(timberParts, frontLegGeo, [-0.34, 0.19, 0.26], [0.07, 0, 0.06])
  addTransformed(timberParts, frontLegGeo, [0.34, 0.19, 0.26], [0.07, 0, -0.06])

  // Front Brass Ferrules (y = 0.00 to 0.036m)
  const frontFerruleGeo = new THREE.CylinderGeometry(0.0185, 0.0175, 0.036, 16)
  addTransformed(brassParts, frontFerruleGeo, [-0.35, 0.018, 0.27], [0.07, 0, 0.06])
  addTransformed(brassParts, frontFerruleGeo, [0.35, 0.018, 0.27], [0.07, 0, -0.06])

  // Rear Legs: Height 0.42m, Scandinavian sweep raked backward (-0.22 rad) and outward (±0.06 rad).
  // Center y = 0.20m -> bottom touches y = 0.000!
  const rearLegGeo = new THREE.CylinderGeometry(0.028, 0.018, 0.42, 16)
  addTransformed(timberParts, rearLegGeo, [-0.33, 0.20, -0.28], [-0.22, 0, 0.06])
  addTransformed(timberParts, rearLegGeo, [0.33, 0.20, -0.28], [-0.22, 0, -0.06])

  // Rear Brass Ferrules (y = 0.00 to 0.038m)
  const rearFerruleGeo = new THREE.CylinderGeometry(0.0195, 0.0185, 0.038, 16)
  addTransformed(brassParts, rearFerruleGeo, [-0.345, 0.019, -0.325], [-0.22, 0, 0.06])
  addTransformed(brassParts, rearFerruleGeo, [0.345, 0.019, -0.325], [-0.22, 0, -0.06])

  // =========================================================================
  // 2. SEAT APRON FRAME & ARCHITECTURAL STRETCHERS
  // =========================================================================
  // Front & Back Apron Timber Rails
  const frontApronGeo = new THREE.BoxGeometry(0.66, 0.045, 0.035)
  addTransformed(timberParts, frontApronGeo, [0, 0.365, 0.24])

  const backApronGeo = new THREE.BoxGeometry(0.62, 0.045, 0.035)
  addTransformed(timberParts, backApronGeo, [0, 0.345, -0.21])

  // Side Apron Timber Rails (with slight 3° recline toward rear)
  const sideApronGeo = new THREE.BoxGeometry(0.035, 0.045, 0.44)
  addTransformed(timberParts, sideApronGeo, [-0.33, 0.355, 0.015], [-0.04, 0, 0])
  addTransformed(timberParts, sideApronGeo, [0.33, 0.355, 0.015], [-0.04, 0, 0])

  // Structural Side Stretchers (connecting front & rear legs)
  const sideStretcherGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.52, 12)
  addTransformed(timberParts, sideStretcherGeo, [-0.34, 0.12, 0.0], [Math.PI / 2 + 0.04, 0, 0])
  addTransformed(timberParts, sideStretcherGeo, [0.34, 0.12, 0.0], [Math.PI / 2 + 0.04, 0, 0])

  // Rear Cross Stretcher
  const rearStretcherGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.64, 12)
  addTransformed(timberParts, rearStretcherGeo, [0, 0.13, -0.29], [0, 0, Math.PI / 2])

  // =========================================================================
  // 3. SCULPTURAL ARCHITECTURAL ARMRESTS & FRONT POSTS
  // =========================================================================
  // Front Vertical Arm Upright Posts (connecting seat apron at y = 0.37 to armrest at y = 0.53)
  const armPostGeo = new THREE.BoxGeometry(0.035, 0.16, 0.035)
  addTransformed(timberParts, armPostGeo, [-0.36, 0.45, 0.23], [0.04, 0, 0])
  addTransformed(timberParts, armPostGeo, [0.36, 0.45, 0.23], [0.04, 0, 0])

  // Sculpted Flat Timber Arm Rails (Length 0.64m, Width 0.08m, Thickness 0.025m at y = 0.54m)
  const armRailGeo = new THREE.BoxGeometry(0.08, 0.025, 0.64)
  addTransformed(timberParts, armRailGeo, [-0.38, 0.54, 0.02], [-0.03, 0, 0])
  addTransformed(timberParts, armRailGeo, [0.38, 0.54, 0.02], [-0.03, 0, 0])

  // Brass joinery pins accenting arm tops
  const brassPinGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.028, 12)
  addTransformed(brassParts, brassPinGeo, [-0.38, 0.553, 0.23])
  addTransformed(brassParts, brassPinGeo, [0.38, 0.553, 0.23])

  // =========================================================================
  // 4. BACKREST REAR STILES & CREST RAIL (15° Architectural Rake)
  // =========================================================================
  const backRake = -0.26 // ~15° backward recline

  // Left & Right Back Upright Stiles
  const backStileGeo = new THREE.BoxGeometry(0.038, 0.44, 0.035)
  addTransformed(timberParts, backStileGeo, [-0.31, 0.56, -0.27], [backRake, 0, 0])
  addTransformed(timberParts, backStileGeo, [0.31, 0.56, -0.27], [backRake, 0, 0])

  // Sculptural Top Crest Rail (Top edge at y = 0.78m)
  const crestRailGeo = new THREE.BoxGeometry(0.68, 0.045, 0.035)
  addTransformed(timberParts, crestRailGeo, [0, 0.76, -0.32], [backRake, 0, 0])

  // Mid-Lumbar Horizontal Timber Rail
  const lumbarRailGeo = new THREE.BoxGeometry(0.60, 0.03, 0.025)
  addTransformed(timberParts, lumbarRailGeo, [0, 0.48, -0.23], [backRake, 0, 0])

  // =========================================================================
  // 5. ERGONOMIC PLUSH UPHOLSTERED CUSHIONS (Seat & Backrest)
  // =========================================================================
  // Deep Seat Cushion: 85mm thick luxury foam sitting securely from y = 0.38 to y = 0.465m
  // Dimensions: 0.64m wide, 0.58m deep, ergonomic center dip.
  const seatCushionGeo = new THREE.BoxGeometry(0.64, 0.085, 0.58, 4, 2, 4)
  // Soften edges and subtle ergonomic dip
  const seatPos = seatCushionGeo.getAttribute('position')
  for (let i = 0; i < seatPos.count; i++) {
    const x = seatPos.getX(i)
    const y = seatPos.getY(i)
    const z = seatPos.getZ(i)
    // Subtle scoop towards center of seat
    if (y > 0.02 && Math.abs(x) < 0.28 && Math.abs(z) < 0.24) {
      const dip = (1 - (x / 0.28) ** 2) * (1 - (z / 0.24) ** 2) * 0.015
      seatPos.setY(i, y - dip)
    }
  }
  seatCushionGeo.computeVertexNormals()
  addTransformed(cushionParts, seatCushionGeo, [0, 0.422, 0.02], [-0.05, 0, 0])

  // Curved Backrest Cushion: 0.58m wide, 0.30m high, 0.075m thick, with gentle lumbar contour
  const backCushionGeo = new THREE.BoxGeometry(0.58, 0.30, 0.075, 4, 3, 2)
  const backPos = backCushionGeo.getAttribute('position')
  for (let i = 0; i < backPos.count; i++) {
    const x = backPos.getX(i)
    const z = backPos.getZ(i)
    // Curve gently backward along outer wings
    if (Math.abs(x) > 0.1) {
      const curve = (x / 0.29) ** 2 * 0.025
      backPos.setZ(i, z - curve)
    }
  }
  backCushionGeo.computeVertexNormals()
  addTransformed(cushionParts, backCushionGeo, [0, 0.61, -0.24], [backRake, 0, 0])

  // Merge each subsystem into unified BufferGeometries (max 3 draw calls!)
  const timberMerged = mergeGeometries(timberParts, false) || new THREE.BufferGeometry()
  const cushionMerged = mergeGeometries(cushionParts, false) || new THREE.BufferGeometry()
  const brassMerged = mergeGeometries(brassParts, false) || new THREE.BufferGeometry()

  timberParts.forEach((p) => p.dispose())
  cushionParts.forEach((p) => p.dispose())
  brassParts.forEach((p) => p.dispose())

  timberMerged.computeVertexNormals()
  cushionMerged.computeVertexNormals()
  brassMerged.computeVertexNormals()

  // Fine architectural edges for inspect mode
  const edgeGeometry = new THREE.EdgesGeometry(cushionMerged, 15)

  // Millimeter bounding box (820mm W x 780mm H x 840mm D, grounded at y = 0.00 to 0.78m)
  const boxGeo = new THREE.BoxGeometry(0.82, 0.78, 0.84)
  const boundingBoxGeo = new THREE.EdgesGeometry(boxGeo)

  return {
    timberGeometry: timberMerged,
    cushionGeometry: cushionMerged,
    brassGeometry: brassMerged,
    edgeGeometry,
    boundingBoxGeo,
  }
}

export default function ProceduralChair({
  targetRotationY,
  targetRotationX = 0,
  targetX = 0,
  targetY = 0,
  targetScale = 1.0,
  revealProgress = 1.0,
  scrollProgress = 0,
  frozen = false,
  hologramOpacity = 0,
}: ProceduralChairProps) {
  const outerRef = useRef<THREE.Group>(null!)
  const state = useSceneState()

  // Mouse parallax tracking for subtle desktop life
  const mouseTilt = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleMouseMove = (e: MouseEvent) => {
      // Normal range: -1 to 1
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      mouseTilt.current.y = nx * 0.08
      mouseTilt.current.x = ny * 0.04
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const currentState = useRef({
    rotationY: targetRotationY,
    rotationX: targetRotationX,
    x: targetX,
    y: targetY,
    scale: targetScale,
  })

  const { oakTex, walnutTex, boucleTex, linenTex } = useMemo(createChairTextures, [])

  const {
    timberGeometry,
    cushionGeometry,
    brassGeometry,
    edgeGeometry,
    boundingBoxGeo,
  } = useMemo(buildArchitecturalArmchair, [])

  // ==========================================
  // PBR MATERIALS PIPELINE (Dynamic Swatches)
  // ==========================================
  // 1. Solid Timber Hardwood Material
  const timberMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D2A66C'),
      map: oakTex || undefined,
      roughness: 0.35,
      metalness: 0.04,
    })
  }, [oakTex])

  // 2. Plush Cushion Upholstery Material
  const cushionMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ECE4D8'),
      map: linenTex || undefined,
      roughness: 0.78,
      metalness: 0.0,
    })
  }, [linenTex])

  // 3. Polished Architectural Champagne Brass Material
  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4B26F'),
      roughness: 0.22,
      metalness: 0.88,
    })
  }, [])

  // 4. Hairline Wireframe Material (Inspect Mode)
  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#1C1917'),
        transparent: true,
        opacity: 0.3,
      }),
    []
  )

  // 5. Bounding Box Wireframe Material (Muted Architectural Bronze)
  const boundingMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#A4774B'),
        transparent: true,
        opacity: 0.65,
      }),
    []
  )

  // 6. Hologram Descent Pass Material (Vibrant Cyan-Gold Holographic Wireframe)
  const hologramMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#38BDF8'),
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
      }),
    []
  )

  // Live Material Swatch Switcher (Oak, Bouclé, Walnut)
  useEffect(() => {
    if (state.materialVariant === 'boucle') {
      // Nordic Blonde Ash Frame + Textured Cream Bouclé Cushion
      timberMaterial.color.set('#D8C8B5')
      timberMaterial.map = oakTex || null
      timberMaterial.roughness = 0.38
      timberMaterial.needsUpdate = true

      cushionMaterial.color.set('#FAF6F0')
      cushionMaterial.map = boucleTex || null
      cushionMaterial.roughness = 0.85
      cushionMaterial.metalness = 0.0
      cushionMaterial.needsUpdate = true
    } else if (state.materialVariant === 'walnut') {
      // Smoked Royal Walnut Frame + Espresso Wool Cushion
      timberMaterial.color.set('#3A2518')
      timberMaterial.map = walnutTex || null
      timberMaterial.roughness = 0.28
      timberMaterial.needsUpdate = true

      cushionMaterial.color.set('#231D19')
      cushionMaterial.map = linenTex || null
      cushionMaterial.roughness = 0.72
      cushionMaterial.metalness = 0.0
      cushionMaterial.needsUpdate = true
    } else {
      // Natural Scandinavian White Oak + Oatmeal Belgian Linen
      timberMaterial.color.set('#D2A66C')
      timberMaterial.map = oakTex || null
      timberMaterial.roughness = 0.35
      timberMaterial.needsUpdate = true

      cushionMaterial.color.set('#ECE4D8')
      cushionMaterial.map = linenTex || null
      cushionMaterial.roughness = 0.78
      cushionMaterial.metalness = 0.0
      cushionMaterial.needsUpdate = true
    }
  }, [state.materialVariant, timberMaterial, cushionMaterial, oakTex, walnutTex, boucleTex, linenTex])

  useFrame((_, rawDelta) => {
    if (!outerRef.current) return
    const delta = Math.min(rawDelta, 0.05)

    if (frozen) {
      currentState.current = {
        rotationY: targetRotationY,
        rotationX: targetRotationX,
        x: targetX,
        y: targetY,
        scale: targetScale,
      }
    } else {
      const lerpFactor = 1 - Math.pow(0.001, delta)
      const s = currentState.current

      if (!state.inspectMode) {
        // Continuous smooth rotation driven by scroll + gentle mouse parallax
        const finalTargetRotY = targetRotationY + mouseTilt.current.y
        const finalTargetRotX = targetRotationX + mouseTilt.current.x

        s.rotationY += (finalTargetRotY - s.rotationY) * lerpFactor
        s.rotationX += (finalTargetRotX - s.rotationX) * lerpFactor
        s.x += (targetX - s.x) * lerpFactor
        s.y += (targetY - s.y) * lerpFactor
        s.scale += (targetScale - s.scale) * lerpFactor
      } else {
        // In Inspect Mode: centered and scaled for inspection
        s.x += (0 - s.x) * lerpFactor
        s.y += (0 - s.y) * lerpFactor
        s.scale += (1.25 - s.scale) * lerpFactor
      }
    }

    const s = currentState.current
    if (!state.inspectMode) {
      outerRef.current.rotation.y = s.rotationY
      outerRef.current.rotation.x = s.rotationX
    }
    outerRef.current.position.x = s.x
    outerRef.current.position.y = s.y
    outerRef.current.scale.setScalar(s.scale)

    // Hologram wireframe shines while descending through the air
    const worldY = outerRef.current.parent?.position.y ?? outerRef.current.position.y
    if (worldY > 0.05) {
      hologramMaterial.opacity = Math.min(0.85, (worldY / 1.5))
    } else {
      hologramMaterial.opacity = 0.0
    }
  })

  const showBounding =
    state.activeEngine === 'SYS.05' || state.processStep === 3 || state.inspectMode

  return (
    <group ref={outerRef}>
      {/* 1. Solid Turned Hardwood Timber Frame */}
      <mesh
        geometry={timberGeometry}
        material={timberMaterial}
        castShadow
        receiveShadow
      />

      {/* 2. Plush Ergonomic Upholstered Cushions (Seat & Backrest) */}
      <mesh
        geometry={cushionGeometry}
        material={cushionMaterial}
        castShadow
        receiveShadow
      />

      {/* 3. Polished Architectural Champagne Brass Ferrules & Hardware */}
      <mesh
        geometry={brassGeometry}
        material={brassMaterial}
        castShadow
        receiveShadow
      />

      {/* 4. Translucent Wireframe Outlining Cushions in Inspect Mode */}
      {state.inspectMode && (
        <lineSegments geometry={edgeGeometry} material={edgeMaterial} />
      )}

      {/* Hologram Stage Wireframe Pass while descending */}
      <lineSegments geometry={edgeGeometry} material={hologramMaterial} />

      {/* 5. Millimeter Dimension Bounding Box Wireframe (Centered at y = 0.39m) */}
      {showBounding && (
        <group position={[0, 0.39, 0]}>
          <lineSegments geometry={boundingBoxGeo} material={boundingMaterial} />
        </group>
      )}
    </group>
  )
}
