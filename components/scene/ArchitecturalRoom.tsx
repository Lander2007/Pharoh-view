'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ProceduralChair from './ProceduralChair'
import { sceneState } from '@/lib/sceneState'

interface ArchitecturalRoomProps {
  scanProgress?: number
  furnitureArrival?: number
  furnitureRotationY?: number
  roomTransformation?: number
  isRTL?: boolean
  isMobile?: boolean
  qualityProfile?: 'high' | 'balanced' | 'performance'
}

/**
 * Creates high-resolution procedural architectural textures:
 * - French Natural Oak plank flooring with subtle board seams and polyurethane satin sheen.
 * - Warm Ivory Venetian plaster with fine mineral trowel grain.
 * - Natural Roman Travertine stone with horizontal sedimentary veining and porous pits.
 * - Minimalist architectural plaster relief art canvas.
 */
function createArchitecturalTextures() {
  if (typeof document === 'undefined') {
    return { floorMap: null, floorRoughness: null, wallMap: null, travertineMap: null, artMap: null }
  }

  // 1. Natural French Oak Plank Floor Texture (1024x1024)
  const floorCanvas = document.createElement('canvas')
  floorCanvas.width = 1024
  floorCanvas.height = 1024
  const fCtx = floorCanvas.getContext('2d')
  if (fCtx) {
    fCtx.fillStyle = '#C8B7A2' // Warm French Oak base
    fCtx.fillRect(0, 0, 1024, 1024)

    const plankWidth = 128
    const plankLength = 512

    for (let col = 0; col < 8; col++) {
      const x = col * plankWidth
      for (let row = 0; row < 3; row++) {
        const offset = (col % 2) * (plankLength / 2)
        const y = row * plankLength - offset

        // Slight plank-to-plank natural color variation
        const toneShift = ((col * 31 + row * 17) % 19) - 9
        fCtx.fillStyle = `rgb(${200 + toneShift}, ${183 + toneShift}, ${162 + toneShift})`
        fCtx.fillRect(x + 1, y + 1, plankWidth - 2, plankLength - 2)

        // Wood grain filaments
        fCtx.strokeStyle = 'rgba(150, 130, 110, 0.12)'
        fCtx.lineWidth = 1
        for (let g = 0; g < 12; g++) {
          const gx = x + 10 + g * 9
          fCtx.beginPath()
          fCtx.moveTo(gx, y)
          fCtx.lineTo(gx + Math.sin(g) * 4, y + plankLength)
          fCtx.stroke()
        }

        // Crisp 1mm shadow bevel between planks
        fCtx.strokeStyle = 'rgba(70, 58, 48, 0.28)'
        fCtx.lineWidth = 1.5
        fCtx.strokeRect(x, y, plankWidth, plankLength)
      }
    }
  }

  const floorMap = new THREE.CanvasTexture(floorCanvas)
  floorMap.wrapS = THREE.RepeatWrapping
  floorMap.wrapT = THREE.RepeatWrapping
  floorMap.repeat.set(3, 3)
  floorMap.colorSpace = THREE.SRGBColorSpace

  // Subtle floor roughness map for realistic satin specular highlights
  const roughCanvas = document.createElement('canvas')
  roughCanvas.width = 512
  roughCanvas.height = 512
  const rCtx = roughCanvas.getContext('2d')
  if (rCtx) {
    rCtx.fillStyle = '#666666'
    rCtx.fillRect(0, 0, 512, 512)
    for (let i = 0; i < 400; i++) {
      rCtx.fillStyle = Math.random() > 0.5 ? '#777777' : '#555555'
      rCtx.fillRect(Math.random() * 512, Math.random() * 512, 12, 2)
    }
  }
  const floorRoughness = new THREE.CanvasTexture(roughCanvas)
  floorRoughness.wrapS = THREE.RepeatWrapping
  floorRoughness.wrapT = THREE.RepeatWrapping
  floorRoughness.repeat.set(3, 3)

  // 2. Warm Ivory Venetian Plaster Wall Texture (512x512)
  const wallCanvas = document.createElement('canvas')
  wallCanvas.width = 512
  wallCanvas.height = 512
  const wCtx = wallCanvas.getContext('2d')
  if (wCtx) {
    wCtx.fillStyle = '#F4EFE6'
    wCtx.fillRect(0, 0, 512, 512)

    // Soft plaster trowel mineral wash
    wCtx.fillStyle = 'rgba(235, 226, 215, 0.35)'
    for (let i = 0; i < 40; i++) {
      const cx = Math.random() * 512
      const cy = Math.random() * 512
      const rad = 30 + Math.random() * 60
      wCtx.beginPath()
      wCtx.arc(cx, cy, rad, 0, Math.PI * 2)
      wCtx.fill()
    }
  }

  const wallMap = new THREE.CanvasTexture(wallCanvas)
  wallMap.wrapS = THREE.RepeatWrapping
  wallMap.wrapT = THREE.RepeatWrapping
  wallMap.repeat.set(2, 2)
  wallMap.colorSpace = THREE.SRGBColorSpace

  // 3. Natural Roman Travertine Stone Texture (512x512)
  const travCanvas = document.createElement('canvas')
  travCanvas.width = 512
  travCanvas.height = 512
  const tCtx = travCanvas.getContext('2d')
  if (tCtx) {
    tCtx.fillStyle = '#D8CBB9'
    tCtx.fillRect(0, 0, 512, 512)

    // Sedimentary horizontal mineral banding
    for (let y = 0; y < 512; y += 4) {
      const alpha = (Math.sin(y * 0.06) + Math.sin(y * 0.14) * 0.4) * 0.08 + 0.06
      tCtx.fillStyle = `rgba(182, 164, 142, ${alpha})`
      tCtx.fillRect(0, y, 512, 3)
    }

    // Natural stone porous pits and subtle mineral inclusions
    tCtx.fillStyle = 'rgba(125, 110, 95, 0.16)'
    for (let i = 0; i < 220; i++) {
      const px = Math.random() * 512
      const py = Math.random() * 512
      tCtx.fillRect(px, py, 2 + Math.random() * 6, 1.2)
    }
  }
  const travertineMap = new THREE.CanvasTexture(travCanvas)
  travertineMap.wrapS = THREE.RepeatWrapping
  travertineMap.wrapT = THREE.RepeatWrapping
  travertineMap.repeat.set(2, 2)
  travertineMap.colorSpace = THREE.SRGBColorSpace

  // 4. Minimalist Architectural Plaster Relief Canvas (512x512)
  const artCanvas = document.createElement('canvas')
  artCanvas.width = 512
  artCanvas.height = 512
  const aCtx = artCanvas.getContext('2d')
  if (aCtx) {
    aCtx.fillStyle = '#EDE7DD'
    aCtx.fillRect(0, 0, 512, 512)

    // Sculptural organic relief arcs with soft cast shadow
    aCtx.strokeStyle = 'rgba(190, 178, 164, 0.45)'
    aCtx.lineWidth = 16
    aCtx.beginPath()
    aCtx.arc(256, 320, 180, Math.PI * 1.08, Math.PI * 1.92)
    aCtx.stroke()

    aCtx.strokeStyle = 'rgba(215, 206, 194, 0.65)'
    aCtx.lineWidth = 14
    aCtx.beginPath()
    aCtx.arc(256, 390, 250, Math.PI * 1.15, Math.PI * 1.85)
    aCtx.stroke()
  }
  const artMap = new THREE.CanvasTexture(artCanvas)
  artMap.colorSpace = THREE.SRGBColorSpace

  return { floorMap, floorRoughness, wallMap, travertineMap, artMap }
}

export default function ArchitecturalRoom({
  scanProgress = 0,
  furnitureArrival = 0,
  furnitureRotationY = 0.38,
  roomTransformation = 0,
  isRTL = false,
  isMobile = false,
  qualityProfile = 'high',
}: ArchitecturalRoomProps) {
  const roomGroupRef = useRef<THREE.Group>(null!)
  const chairGroupRef = useRef<THREE.Group>(null!)
  const scanGroupRef = useRef<THREE.Group>(null!)
  const transformationGroupRef = useRef<THREE.Group>(null!)
  const leftCurtainRef = useRef<THREE.Mesh>(null!)
  const rightCurtainRef = useRef<THREE.Mesh>(null!)
  const reticleGroupRef = useRef<THREE.Group>(null!)
  const reticleMatRef = useRef<THREE.MeshBasicMaterial>(null!)

  // Hero AR Room Furnishing Refs
  const lidarFloorGridRef = useRef<THREE.Group>(null!)
  const lidarGridMatRef = useRef<THREE.LineBasicMaterial>(null!)
  const rugMeshRef = useRef<THREE.Mesh>(null!)
  const sideTableGroupRef = useRef<THREE.Group>(null!)
  const shockwaveRef = useRef<THREE.Mesh>(null!)
  const shockwaveMatRef = useRef<THREE.MeshBasicMaterial>(null!)
  const lampPointLightRef = useRef<THREE.PointLight>(null!)
  const lampShadeMatRef = useRef<THREE.MeshStandardMaterial>(null!)

  // 1:1 True Scale Lock Badge Texture for LiDAR Floor Grid
  const scaleLockTex = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'rgba(28, 25, 23, 0.88)'
      ctx.fillRect(0, 0, 512, 128)
      ctx.strokeStyle = '#D4AF37'
      ctx.lineWidth = 4
      ctx.strokeRect(4, 4, 504, 120)
      ctx.fillStyle = '#38BDF8'
      ctx.font = 'bold 30px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('[ 1:1 TRUE SCALE LOCK ]', 256, 64)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  // [ + READY TO STAGE ] Floor Badge Texture for initial AR Reticle
  const readyToStageTex = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'rgba(28, 25, 23, 0.88)'
      ctx.fillRect(0, 0, 512, 128)
      ctx.strokeStyle = '#C89D54'
      ctx.lineWidth = 4
      ctx.strokeRect(4, 4, 504, 120)
      ctx.fillStyle = '#E8D8C3'
      ctx.font = 'bold 28px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('[ + READY TO STAGE ]', 256, 64)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  // 10x10 Precision Laser Bounding Grid Geometry
  const lidarGridLinesGeo = useMemo(() => {
    const points: THREE.Vector3[] = []
    const size = 1.9
    const step = 0.19
    const half = size / 2
    for (let i = -half; i <= half + 0.001; i += step) {
      points.push(new THREE.Vector3(i, -half, 0), new THREE.Vector3(i, half, 0))
      points.push(new THREE.Vector3(-half, i, 0), new THREE.Vector3(half, i, 0))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  const { floorMap, floorRoughness, wallMap, travertineMap, artMap } = useMemo(
    createArchitecturalTextures,
    []
  )

  // ==========================================
  // PBR ARCHITECTURAL MATERIALS
  // ==========================================
  // 1. Natural French Oak Floor
  const floorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D8CAB8'),
      map: floorMap || undefined,
      roughnessMap: floorRoughness || undefined,
      roughness: 0.38,
      metalness: 0.03,
    })
  }, [floorMap, floorRoughness])

  // 2. Warm Ivory Venetian Plaster Walls
  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F4EFE6'),
      map: wallMap || undefined,
      roughness: 0.88,
      metalness: 0.01,
      side: THREE.DoubleSide,
    })
  }, [wallMap])

  // 3. Slim Refined Dark Bronze Window Frames & Baseboards (#3A312A)
  const bronzeFrameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3A312A'),
      roughness: 0.32,
      metalness: 0.45,
    })
  }, [])

  // 4. Ultra-Clear Low-Iron Architectural Glass (Fast Standard Material, 0 Transmission Passes)
  const glassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F8F5EE'),
      transparent: true,
      opacity: 0.2,
      roughness: 0.04,
      metalness: 0.12,
    })
  }, [])

  // 5. Architectural Wool Rug Material (#E8DFD3)
  const rugMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E8DFD3'),
      roughness: 0.92,
      metalness: 0.0,
    })
  }, [])

  // 6. Natural Travertine Stone Material (#D7CABE)
  const travertineMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D7CABE'),
      map: travertineMap || undefined,
      roughness: 0.58,
      metalness: 0.02,
    })
  }, [travertineMap])

  // 7. Polished Natural Bronze Accent Material (#A4774B)
  const bronzeAccentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#A4774B'),
      roughness: 0.22,
      metalness: 0.82,
    })
  }, [])

  // 8. Translucent Sheer Linen Curtains (Fast Standard Material, 0 Transmission Passes)
  const curtainMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FAF6EE'),
      transparent: true,
      opacity: 0.85,
      roughness: 0.88,
      side: THREE.DoubleSide,
    })
  }, [])

  // 9. Warm Architectural Recessed LED Cove Lighting Strip
  const coveEmissiveMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFEECB'),
    })
  }, [])

  // 10. Minimalist Plaster Relief Art Piece Material
  const artMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EDE7DD'),
      map: artMap || undefined,
      roughness: 0.82,
      metalness: 0.01,
    })
  }, [artMap])

  // 11. Sculptural Olive Tree Foliage & Stem Materials
  const leafMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#58644E'),
      roughness: 0.65,
      metalness: 0.02,
      side: THREE.DoubleSide,
    })
  }, [])

  const barkMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#46392D'),
      roughness: 0.82,
      metalness: 0.05,
    })
  }, [])

  // 12. Spatial LiDAR Scanning Wireframe Grid
  const lidarGridGeo = useMemo(() => {
    const grid = new THREE.GridHelper(12, 24, '#A4774B', '#C89D54')
    return grid.geometry
  }, [])

  // ==========================================
  // SLIM ARCHITECTURAL WINDOW ASSEMBLY
  // Integrated into the left exterior wall opening (24mm slim profiles)
  // ==========================================
  const windowAssembly = useMemo(() => {
    const group = new THREE.Group()

    // Outer Slim Perimeter Frame (Opening: 3.2m height, 5.4m length, wall at x = -4.7)
    const frameDepth = 0.08
    const frameThick = 0.024 // 24mm ultra-slim profile

    // Header & Threshold
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, frameThick, 5.4), bronzeFrameMaterial)
    topBar.position.set(-4.7, 3.2, 0)
    group.add(topBar)

    const botBar = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, frameThick, 5.4), bronzeFrameMaterial)
    botBar.position.set(-4.7, 0.012, 0)
    group.add(botBar)

    // Side Jambs
    const leftJamb = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, 3.2, frameThick), bronzeFrameMaterial)
    leftJamb.position.set(-4.7, 1.6, -2.7)
    group.add(leftJamb)

    const rightJamb = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, 3.2, frameThick), bronzeFrameMaterial)
    rightJamb.position.set(-4.7, 1.6, 2.7)
    group.add(rightJamb)

    // Single Ultra-Slim Central Vertical Mullion (20mm wide)
    const centerMullion = new THREE.Mesh(new THREE.BoxGeometry(frameDepth, 3.2, 0.02), bronzeFrameMaterial)
    centerMullion.position.set(-4.7, 1.6, 0)
    group.add(centerMullion)

    // 2 Large Panoramic Clear Glass Panes
    const glassPane = new THREE.Mesh(new THREE.BoxGeometry(0.012, 3.16, 2.68), glassMaterial)
    glassPane.position.set(-4.7, 1.6, -1.34)
    group.add(glassPane)

    const glassPane2 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 3.16, 2.68), glassMaterial)
    glassPane2.position.set(-4.7, 1.6, 1.34)
    group.add(glassPane2)

    return group
  }, [bronzeFrameMaterial, glassMaterial])

  // ==========================================
  // ELEGANT PLEATED SHEER LINEN CURTAINS
  // Corrugated vertical drapery folds flanking the window opening
  // ==========================================
  const curtainGeometries = useMemo(() => {
    // Left & Right pleated curtain panels
    const createPleatedCurtain = (width: number, height: number) => {
      const geo = new THREE.PlaneGeometry(width, height, 16, 1)
      const pos = geo.getAttribute('position')
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        // Authentic undulating sinusoidal pleats
        const pleat = Math.sin((x / width) * Math.PI * 8) * 0.04
        pos.setZ(i, pleat)
      }
      geo.computeVertexNormals()
      return geo
    }

    const leftGeo = createPleatedCurtain(1.2, 3.6)
    const rightGeo = createPleatedCurtain(1.2, 3.6)
    return { leftGeo, rightGeo }
  }, [])

  // ==========================================
  // SCULPTURAL ARCHITECTURAL FLOOR LAMP
  // Minimalist bronze rod, honed dark base, soft glowing opal shade
  // ==========================================
  const floorLamp = useMemo(() => {
    const group = new THREE.Group()

    // Heavy dark bronze / black granite cylinder base
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.15, 0.04, 24), bronzeFrameMaterial)
    base.position.set(0, 0.02, 0)
    group.add(base)

    // Ultra-slim vertical stem (1.85m tall)
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1.84, 12), bronzeFrameMaterial)
    stem.position.set(0, 0.94, 0)
    group.add(stem)

    // Cantilever horizontal top arm
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.42, 12), bronzeFrameMaterial)
    arm.rotation.z = Math.PI / 2
    arm.position.set(-0.18, 1.84, 0)
    group.add(arm)

    // Glowing opal glass sphere shade (ignited during Stage 3: 75% to 100%)
    const shadeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFF5E4'),
      emissive: new THREE.Color('#FFE4B5'),
      emissiveIntensity: 0.0,
      roughness: 0.2,
    })
    lampShadeMatRef.current = shadeMat
    const shade = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), shadeMat)
    shade.position.set(-0.36, 1.76, 0)
    group.add(shade)

    return group
  }, [bronzeFrameMaterial])

  // ==========================================
  // SCULPTURAL ARCHITECTURAL INDOOR PLANT (Olive Tree)
  // Positioned neatly in the rear left window corner
  // ==========================================
  const indoorTree = useMemo(() => {
    const group = new THREE.Group()

    // Fluted cylindrical raw travertine planter (0.52m tall)
    const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.21, 0.52, 24), travertineMaterial)
    planter.position.set(0, 0.26, 0)
    planter.castShadow = true
    planter.receiveShadow = true
    group.add(planter)

    // Dark organic potting soil
    const soilMat = new THREE.MeshStandardMaterial({ color: '#2B231D', roughness: 0.95 })
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.02, 20), soilMat)
    soil.position.set(0, 0.51, 0)
    group.add(soil)

    // Sculpted organic olive branches
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.038, 1.1, 10), barkMaterial)
    trunk.position.set(0, 1.05, 0)
    trunk.rotation.z = -0.06
    group.add(trunk)

    // Branch 1
    const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.02, 0.65, 8), barkMaterial)
    b1.position.set(0.15, 1.6, 0.05)
    b1.rotation.z = -0.45
    group.add(b1)

    // Branch 2
    const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.6, 8), barkMaterial)
    b2.position.set(-0.14, 1.7, -0.05)
    b2.rotation.z = 0.42
    group.add(b2)

    // Foliage clusters (delicate matte olive leaves)
    const clusterGeo = new THREE.SphereGeometry(0.24, 8, 8)
    const c1 = new THREE.Mesh(clusterGeo, leafMaterial)
    c1.scale.set(1.4, 0.9, 1.2)
    c1.position.set(0.32, 1.88, 0.1)
    group.add(c1)

    const c2 = new THREE.Mesh(clusterGeo, leafMaterial)
    c2.scale.set(1.3, 0.85, 1.1)
    c2.position.set(-0.28, 1.95, -0.08)
    group.add(c2)

    const c3 = new THREE.Mesh(clusterGeo, leafMaterial)
    c3.scale.set(1.2, 0.8, 1.0)
    c3.position.set(0.02, 2.12, 0.04)
    group.add(c3)

    return group
  }, [travertineMaterial, barkMaterial, leafMaterial])

  useFrame((state, delta) => {
    // Gentle natural breeze swaying the linen curtains
    const time = state.clock.getElapsedTime()
    if (leftCurtainRef.current) {
      leftCurtainRef.current.rotation.z = Math.sin(time * 0.9) * 0.012
      leftCurtainRef.current.position.y = 1.8 + Math.cos(time * 0.7) * 0.005
    }
    if (rightCurtainRef.current) {
      rightCurtainRef.current.rotation.z = Math.sin(time * 0.85 + 1.2) * 0.012
      rightCurtainRef.current.position.y = 1.8 + Math.cos(time * 0.65 + 0.8) * 0.005
    }

    // 2. HERO AR ROOM FURNISHING SEQUENCE (Driven by pinned ScrollTrigger: sceneState.heroProgress)
    const heroP = sceneState.heroProgress

    // Initial floor reticle (pulses gently at heroP = 0, fades out during Stage 1)
    if (reticleGroupRef.current && reticleMatRef.current) {
      const pulse = 0.65 + Math.sin(time * 2.4) * 0.2
      const opacity = pulse * Math.max(0, 1 - heroP * 4.0)
      reticleMatRef.current.opacity = opacity
      reticleGroupRef.current.visible = opacity > 0.01
    }

    // STAGE 1: Expanding LiDAR Floor Bounding Grid (0% to 25%)
    if (lidarFloorGridRef.current && lidarGridMatRef.current) {
      if (heroP < 0.25) {
        const gridP = Math.min(1, heroP / 0.20)
        const scale = THREE.MathUtils.lerp(0.05, 1.0, gridP)
        lidarFloorGridRef.current.scale.set(scale, scale, 1)
        lidarGridMatRef.current.opacity = gridP * 0.85
        lidarFloorGridRef.current.visible = gridP > 0.01
      } else if (heroP < 0.75) {
        lidarFloorGridRef.current.scale.set(1, 1, 1)
        lidarGridMatRef.current.opacity = 0.45 * (1 - (heroP - 0.25) / 0.55)
        lidarFloorGridRef.current.visible = true
      } else {
        lidarGridMatRef.current.opacity = Math.max(0.1, 0.45 - (heroP - 0.75) * 0.35)
        lidarFloorGridRef.current.visible = true
      }
    }

    // STAGE 2A: The Area Rug (25% to 45%)
    if (rugMeshRef.current) {
      if (heroP < 0.24) {
        rugMeshRef.current.scale.set(0.001, 0.001, 1)
        rugMeshRef.current.visible = false
      } else if (heroP <= 0.45) {
        const rugP = (heroP - 0.25) / 0.20
        const scale = THREE.MathUtils.lerp(0.01, 1.0, rugP)
        rugMeshRef.current.scale.set(scale, scale, 1)
        rugMeshRef.current.visible = true
      } else {
        rugMeshRef.current.scale.set(1, 1, 1)
        rugMeshRef.current.visible = true
      }
    }

    // STAGE 2B: The Signature 3D Armchair (40% to 65%)
    if (chairGroupRef.current) {
      if (heroP < 0.40) {
        chairGroupRef.current.position.y = 3.5
        chairGroupRef.current.visible = false
      } else if (heroP <= 0.65) {
        const chairP = (heroP - 0.40) / 0.25
        const eased = 1 - Math.pow(1 - chairP, 3) // power3.out ease!
        const y = THREE.MathUtils.lerp(3.5, 0.0, eased)
        const rotY = THREE.MathUtils.lerp(-0.6, 0.35, eased)
        chairGroupRef.current.position.y = y
        chairGroupRef.current.rotation.y = isRTL ? -rotY : rotY
        chairGroupRef.current.scale.setScalar(1.0)
        chairGroupRef.current.visible = true
      } else {
        chairGroupRef.current.position.y = 0.0
        const rotY = heroP >= 1.0 && furnitureRotationY !== 0.38 ? furnitureRotationY : 0.35
        chairGroupRef.current.rotation.y = isRTL ? -rotY : rotY
        chairGroupRef.current.scale.setScalar(1.0)
        chairGroupRef.current.visible = true
      }
    }

    // Touchdown Shockwave Ring when chair lands at y === 0 (p >= 0.62 to 0.76)
    if (shockwaveRef.current && shockwaveMatRef.current) {
      if (heroP >= 0.62 && heroP <= 0.76) {
        const swP = (heroP - 0.62) / 0.14
        const radius = THREE.MathUtils.lerp(0.3, 2.2, swP)
        shockwaveRef.current.scale.set(radius, radius, 1)
        shockwaveMatRef.current.opacity = (1 - swP) * 0.85
        shockwaveRef.current.visible = true
      } else {
        shockwaveRef.current.visible = false
      }
    }

    // STAGE 2C: Accent Side Table (60% to 75%)
    if (sideTableGroupRef.current) {
      if (heroP < 0.60) {
        sideTableGroupRef.current.position.y = 2.5
        sideTableGroupRef.current.visible = false
      } else if (heroP <= 0.75) {
        const tableP = (heroP - 0.60) / 0.15
        const easedTable = 1 - Math.pow(1 - tableP, 3)
        const y = THREE.MathUtils.lerp(2.5, 0.0, easedTable)
        sideTableGroupRef.current.position.y = y
        sideTableGroupRef.current.visible = true
      } else {
        sideTableGroupRef.current.position.y = 0.0
        sideTableGroupRef.current.visible = true
      }
    }

    // STAGE 3: Floor Lamp Ignition (75% to 100%)
    if (lampShadeMatRef.current && lampPointLightRef.current) {
      if (heroP < 0.75) {
        lampShadeMatRef.current.emissiveIntensity = 0.0
        lampPointLightRef.current.intensity = 0.0
      } else {
        const lampP = Math.min(1, (heroP - 0.75) / 0.20)
        lampShadeMatRef.current.emissiveIntensity = 2.5 * lampP
        lampPointLightRef.current.intensity = 3.5 * lampP
      }
    }
  })

  // Ground placement coordinates for furniture: perfectly centered in portrait mobile, offset on desktop
  const chairX = isMobile ? (isRTL ? -0.05 : 0.05) : (isRTL ? -0.55 : 0.55)
  const chairZ = 0.35

  return (
    <group ref={roomGroupRef}>
      {/* =========================================================================
          1. ARCHITECTURAL ROOM ENVELOPE (Floor, Plaster Walls, Reveals)
      ========================================================================= */}
      {/* Natural French Oak Plank Floor with Specular Sunlight Reception */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        material={floorMaterial}
        receiveShadow
      >
        <planeGeometry args={[14, 14]} />
      </mesh>

      {/* Main Warm Ivory Plaster Back Wall */}
      <mesh
        position={[0, 1.95, -4.6]}
        material={wallMaterial}
        receiveShadow
      >
        <planeGeometry args={[14, 3.9]} />
      </mesh>

      {/* Travertine Stone Architectural Feature Panel Cladding (Back Wall Center-Right) */}
      <mesh
        position={[1.2, 1.95, -4.58]}
        material={travertineMaterial}
        receiveShadow
      >
        <planeGeometry args={[3.8, 3.9]} />
      </mesh>

      {/* Architectural Shadow Reveal Grooves (15mm vertical craft gaps) */}
      <mesh position={[-0.7, 1.95, -4.57]}>
        <boxGeometry args={[0.015, 3.9, 0.015]} />
        <meshBasicMaterial color="#3A312A" />
      </mesh>
      <mesh position={[3.1, 1.95, -4.57]}>
        <boxGeometry args={[0.015, 3.9, 0.015]} />
        <meshBasicMaterial color="#3A312A" />
      </mesh>

      {/* Minimalist Monochrome Plaster Relief Art Piece mounted on Travertine Panel */}
      <mesh position={[1.4, 2.1, -4.55]} material={artMaterial} receiveShadow castShadow>
        <boxGeometry args={[1.5, 2.0, 0.04]} />
      </mesh>

      {/* Right Ivory Plaster Wall with Warm Light Falloff */}
      <mesh
        position={[5.2, 1.95, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        material={wallMaterial}
        receiveShadow
      >
        <planeGeometry args={[14, 3.9]} />
      </mesh>

      {/* Architectural Recessed Display Niche in Right Wall */}
      {/* Niche Back Wall */}
      <mesh position={[5.42, 1.7, -0.6]} rotation={[0, -Math.PI / 2, 0]} material={travertineMaterial}>
        <planeGeometry args={[1.8, 1.4]} />
      </mesh>
      {/* Niche Travertine Bottom Shelf */}
      <mesh position={[5.3, 0.99, -0.6]} material={travertineMaterial}>
        <boxGeometry args={[0.26, 0.03, 1.82]} />
      </mesh>
      {/* Niche Top Header */}
      <mesh position={[5.3, 2.41, -0.6]} material={bronzeFrameMaterial}>
        <boxGeometry args={[0.26, 0.02, 1.82]} />
      </mesh>
      {/* Warm LED Cove Light Strip inside Niche */}
      <mesh position={[5.28, 2.39, -0.6]} material={coveEmissiveMaterial}>
        <boxGeometry args={[0.04, 0.01, 1.78]} />
      </mesh>
      {/* Niche Ceramic Vessel inside Niche */}
      <mesh position={[5.3, 1.25, -0.4]} material={bronzeAccentMaterial} castShadow>
        <cylinderGeometry args={[0.11, 0.08, 0.44, 24]} />
      </mesh>

      {/* Left Wall Solid Sections (Framing the Panoramic Window Opening) */}
      <mesh position={[-4.7, 1.95, -3.7]} rotation={[0, Math.PI / 2, 0]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[2.0, 3.9]} />
      </mesh>
      <mesh position={[-4.7, 1.95, 3.7]} rotation={[0, Math.PI / 2, 0]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[2.0, 3.9]} />
      </mesh>
      <mesh position={[-4.7, 3.55, 0]} rotation={[0, Math.PI / 2, 0]} material={wallMaterial}>
        <planeGeometry args={[5.4, 0.7]} />
      </mesh>

      {/* Architectural Dropped Ceiling with Perimeter Recessed Light Slot */}
      <mesh
        position={[0, 3.9, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={wallMaterial}
      >
        <planeGeometry args={[14, 14]} />
      </mesh>

      {/* Perimeter Warm LED Cove Light Strips (Washing walls with indirect architectural glow) */}
      <mesh position={[0, 3.88, -4.56]} material={coveEmissiveMaterial}>
        <boxGeometry args={[13.8, 0.015, 0.04]} />
      </mesh>
      <mesh position={[5.16, 3.88, 0]} rotation={[0, -Math.PI / 2, 0]} material={coveEmissiveMaterial}>
        <boxGeometry args={[13.8, 0.015, 0.04]} />
      </mesh>

      {/* Slim Architectural Dark Bronze Baseboards (35mm high) with shadow reveal */}
      <mesh position={[0, 0.018, -4.58]} material={bronzeFrameMaterial}>
        <boxGeometry args={[13.9, 0.035, 0.012]} />
      </mesh>
      <mesh position={[5.18, 0.018, 0]} rotation={[0, -Math.PI / 2, 0]} material={bronzeFrameMaterial}>
        <boxGeometry args={[13.9, 0.035, 0.012]} />
      </mesh>

      {/* =========================================================================
          2. SLIM BRONZE PANORAMIC WINDOW SYSTEM & PLEATED SHEER LINEN DRAPERY
      ========================================================================= */}
      <primitive object={windowAssembly} />

      {/* Recessed Ceiling Curtain Track */}
      <mesh position={[-4.58, 3.65, 0]} material={bronzeFrameMaterial}>
        <boxGeometry args={[0.04, 0.025, 5.6]} />
      </mesh>

      {/* Left Pleated Sheer Linen Curtain Panel (Gently swaying in breeze) */}
      <mesh
        ref={leftCurtainRef}
        geometry={curtainGeometries.leftGeo}
        material={curtainMaterial}
        position={[-4.56, 1.8, -2.1]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Right Pleated Sheer Linen Curtain Panel */}
      <mesh
        ref={rightCurtainRef}
        geometry={curtainGeometries.rightGeo}
        material={curtainMaterial}
        position={[-4.56, 1.8, 2.1]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Outdoor Bright Patio Horizon Ambient Wash */}
      <mesh position={[-8.5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[22, 10]} />
        <meshBasicMaterial color="#EDE5DA" />
      </mesh>

      {/* =========================================================================
          3. REFINED ARCHITECTURAL INTERIOR PROPS (Far Corners, Zero Interference)
      ========================================================================= */}
      {/* Minimalist Bronze Floor Lamp in Far Right Corner */}
      <primitive object={floorLamp} position={[4.1, 0, -3.4]} />
      {/* Warm PointLight Casting Cozy Illumination when Lamp Ignites in Stage 3 */}
      <pointLight
        ref={lampPointLightRef}
        position={[3.74, 1.76, -3.4]}
        color="#FFE4B5"
        intensity={0}
        distance={8.5}
        decay={2}
      />

      {/* Sculptural Indoor Olive Tree in Far Left Window Corner */}
      <primitive object={indoorTree} position={[-3.8, 0, -3.1]} />

      {/* =========================================================================
          4. SUBTLE PHAROVIEW SPATIAL VISUALIZATION LAYER
      ========================================================================= */}
      {/* Chapter 02: Spatial LiDAR Scanning Grid */}
      <group ref={scanGroupRef} position={[0, 0.015, 0]}>
        <lineSegments geometry={lidarGridGeo}>
          <lineBasicMaterial
            color="#A4774B"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      {/* Fine Architectural Laser Elevation Datum (Back Wall: H: 3.90m) */}
      <group position={[-1.6, 0, -4.56]}>
        {/* Fine vertical measurement line */}
        <mesh position={[0, 1.95, 0]}>
          <boxGeometry args={[0.003, 3.8, 0.002]} />
          <meshBasicMaterial color="#A4774B" transparent opacity={0.35} />
        </mesh>
        {/* Top & Bottom tick markers */}
        <mesh position={[0, 3.85, 0]}>
          <boxGeometry args={[0.06, 0.003, 0.002]} />
          <meshBasicMaterial color="#A4774B" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.06, 0.003, 0.002]} />
          <meshBasicMaterial color="#A4774B" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Floor Spatial Datum Anchor Crosshairs (4 corner points at y = 0.002) */}
      <group position={[0, 0.002, 0]}>
        {[
          [-2.2, -2.2],
          [2.2, -2.2],
          [-2.2, 1.8],
          [2.2, 1.8],
        ].map(([cx, cz], i) => (
          <group key={i} position={[cx, 0, cz]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.12, 0.003]} />
              <meshBasicMaterial color="#A4774B" transparent opacity={0.35} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.003, 0.12]} />
              <meshBasicMaterial color="#A4774B" transparent opacity={0.35} />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          AR FLOOR TARGET RETICLE (Center-Foreground Target Ring at 0% scroll)
      ========================================================================= */}
      <group
        ref={reticleGroupRef}
        position={[chairX, 0.003, chairZ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh>
          <ringGeometry args={[0.72, 0.728, 64]} />
          <meshBasicMaterial
            ref={reticleMatRef}
            color="#8C6239"
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[0.48, 0.486, 48]} />
          <meshBasicMaterial
            color="#A4774B"
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[0.16, 0.003]} />
          <meshBasicMaterial color="#8C6239" transparent opacity={0.65} depthWrite={false} />
        </mesh>
        <mesh>
          <planeGeometry args={[0.003, 0.16]} />
          <meshBasicMaterial color="#8C6239" transparent opacity={0.65} depthWrite={false} />
        </mesh>
        {[
          [-0.78, -0.78],
          [0.78, -0.78],
          [-0.78, 0.78],
          [0.78, 0.78],
        ].map(([bx, by], i) => (
          <group key={i} position={[bx, by, 0]}>
            <mesh position={[bx > 0 ? -0.04 : 0.04, 0, 0]}>
              <planeGeometry args={[0.08, 0.003]} />
              <meshBasicMaterial color="#8C6239" transparent opacity={0.5} depthWrite={false} />
            </mesh>
            <mesh position={[0, by > 0 ? -0.04 : 0.04, 0]}>
              <planeGeometry args={[0.003, 0.08]} />
              <meshBasicMaterial color="#8C6239" transparent opacity={0.5} depthWrite={false} />
            </mesh>
          </group>
        ))}

        {/* Floating [ + READY TO STAGE ] Floor Reticle Badge */}
        {readyToStageTex && (
          <mesh position={[0, -0.96, 0.001]}>
            <planeGeometry args={[0.64, 0.16]} />
            <meshBasicMaterial map={readyToStageTex} transparent opacity={0.92} depthWrite={false} />
          </mesh>
        )}
      </group>

      {/* =========================================================================
          STAGE 1: EXPANDING LIDAR FLOOR BOUNDING GRID [ 1:1 TRUE SCALE LOCK ]
      ========================================================================= */}
      <group
        ref={lidarFloorGridRef}
        position={[chairX, 0.0025, chairZ]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.05}
        visible={false}
      >
        <lineSegments geometry={lidarGridLinesGeo}>
          <lineBasicMaterial
            ref={lidarGridMatRef}
            color="#D4AF37"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </lineSegments>

        {/* 4 Laser Measurement Corner Brackets */}
        {[
          [-0.95, -0.95],
          [0.95, -0.95],
          [-0.95, 0.95],
          [0.95, 0.95],
        ].map(([bx, by], i) => (
          <group key={i} position={[bx, by, 0]}>
            <mesh position={[bx > 0 ? -0.08 : 0.08, 0, 0]}>
              <planeGeometry args={[0.16, 0.004]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.9} depthWrite={false} />
            </mesh>
            <mesh position={[0, by > 0 ? -0.08 : 0.08, 0]}>
              <planeGeometry args={[0.004, 0.16]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.9} depthWrite={false} />
            </mesh>
          </group>
        ))}

        {/* Floating [ 1:1 TRUE SCALE LOCK ] Floor Measurement Tag */}
        {scaleLockTex && (
          <mesh position={[0, -1.06, 0.001]}>
            <planeGeometry args={[0.62, 0.15]} />
            <meshBasicMaterial map={scaleLockTex} transparent opacity={0.95} depthWrite={false} />
          </mesh>
        )}
      </group>

      {/* =========================================================================
          STAGE 2A: ARCHITECTURAL LOW-PROFILE WOOL AREA RUG (25% to 45%)
      ========================================================================= */}
      <mesh
        ref={rugMeshRef}
        position={[chairX, 0.002, chairZ - 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={rugMaterial}
        scale={[0.001, 0.001, 1]}
        visible={false}
        receiveShadow
      >
        <planeGeometry args={[2.7, 2.5]} />
      </mesh>

      {/* =========================================================================
          STAGE 2B: 3D ARCHITECTURAL ARMCHAIR (40% to 65%)
      ========================================================================= */}
      <group
        ref={chairGroupRef}
        position={[chairX, 3.5, chairZ]}
        scale={1.0}
        visible={false}
      >
        <ProceduralChair
          targetRotationY={isRTL ? -0.35 : 0.35}
          targetRotationX={0.03}
          targetX={0}
          targetY={0}
          targetScale={1.0}
        />
      </group>

      {/* Touchdown Shockwave Ring when chair lands at y === 0 */}
      <mesh
        ref={shockwaveRef}
        position={[chairX, 0.003, chairZ]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.25}
        visible={false}
      >
        <ringGeometry args={[0.96, 1.0, 64]} />
        <meshBasicMaterial
          ref={shockwaveMatRef}
          color="#38BDF8"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>

      {/* =========================================================================
          STAGE 2C: MINIMALIST CYLINDER SIDE TABLE (60% to 75%)
      ========================================================================= */}
      <group
        ref={sideTableGroupRef}
        position={[isRTL ? chairX - (isMobile ? 0.72 : 0.85) : chairX + (isMobile ? 0.72 : 0.85), 2.5, chairZ + 0.08]}
        visible={false}
      >
        <mesh
          position={[0, 0.22, 0]}
          material={travertineMaterial}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.22, 0.22, 0.44, 32]} />
        </mesh>

        <mesh
          position={[0, 0.448, 0]}
          material={bronzeAccentMaterial}
          castShadow
        >
          <cylinderGeometry args={[0.15, 0.15, 0.016, 32]} />
        </mesh>
      </group>

      {/* Far Corner Sculptural Travertine Pedestal & Ceramic Vessel (Tucked cleanly into far wall corner) */}
      <group position={[isRTL ? 3.6 : -3.6, 0, -3.2]}>
        <mesh
          position={[0, 0.42, 0]}
          material={travertineMaterial}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.48, 0.84, 0.48]} />
        </mesh>
        <mesh
          position={[0, 0.98, 0]}
          material={bronzeAccentMaterial}
          castShadow
        >
          <cylinderGeometry args={[0.12, 0.08, 0.28, 24]} />
        </mesh>
      </group>
    </group>
  )
}
