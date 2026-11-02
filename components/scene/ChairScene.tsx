'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import ArchitecturalRoom from './ArchitecturalRoom'
import {
  interpolateCinematicFrame,
  interpolateHeroCamera,
  interpolateHeroCameraMobile,
} from '@/lib/cinematicTimeline'
import { useScrollProgress } from '@/lib/useScrollProgress'
import { useSceneState, sceneState } from '@/lib/sceneState'
import CanvasErrorBoundary from '@/components/common/CanvasErrorBoundary'
import { useLanguage } from '@/lib/i18n'
import { useDeviceCapabilities } from '@/lib/useDeviceCapabilities'

/**
 * Ultra-lightweight architectural vignette (100% GPU CSS hardware accelerated, zero SVG filter passes).
 */
function GrainTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(28, 25, 23, 0.06) 100%)',
      }}
      aria-hidden="true"
    />
  )
}

/**
 * Ultra-fast single-mesh soft radial ground shadow (0 offscreen passes, 0 blur shaders, exactly 1 quad draw call).
 * Replaces expensive multi-pass ContactShadows for locked 60 FPS performance.
 */
function SoftGroundShadow({
  position,
  opacity,
}: {
  position: [number, number, number]
  opacity: number
}) {
  const shadowTex = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 126)
      grad.addColorStop(0, 'rgba(26, 20, 15, 0.96)')
      grad.addColorStop(0.28, 'rgba(32, 24, 18, 0.65)')
      grad.addColorStop(0.65, 'rgba(42, 32, 22, 0.22)')
      grad.addColorStop(1, 'rgba(42, 32, 22, 0.0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 256, 256)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  if (opacity <= 0.01) return null

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.4, 2.2]} />
      <meshBasicMaterial
        map={shadowTex || undefined}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  )
}

function CameraController({
  targetPos,
  targetLookAt,
  targetFov,
  inspectMode,
}: {
  targetPos: [number, number, number]
  targetLookAt: [number, number, number]
  targetFov: number
  inspectMode: boolean
}) {
  const { camera } = useThree()
  const currentTarget = useRef(new THREE.Vector3(...targetLookAt))
  const posVec = useMemo(() => new THREE.Vector3(), [])
  const targetVec = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (inspectMode) return // In inspect mode, OrbitControls takes charge

    const factor = Math.min(delta * 6.0, 0.25)
    posVec.set(...targetPos)
    camera.position.lerp(posVec, factor)

    targetVec.set(...targetLookAt)
    currentTarget.current.lerp(targetVec, factor)
    camera.lookAt(currentTarget.current)

    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov += (targetFov - camera.fov) * factor
      camera.updateProjectionMatrix()
    }
  })

  return null
}

function SceneContent({
  isRTL,
  isMobile,
  qualityProfile,
  shadowMapSize,
  enableRealtimeShadows,
}: {
  isRTL: boolean
  isMobile: boolean
  qualityProfile: string
  shadowMapSize: number
  enableRealtimeShadows: boolean
}) {
  const progress = useScrollProgress()
  const frame = interpolateCinematicFrame(progress, isMobile)
  const { inspectMode, heroFurnishProgress } = useSceneState()

  // Timeline camera orientation
  const timelineCameraPos: [number, number, number] = isRTL
    ? [-frame.cameraPos[0], frame.cameraPos[1], frame.cameraPos[2]]
    : frame.cameraPos
  const timelineCameraTarget: [number, number, number] = isRTL
    ? [-frame.cameraTarget[0], frame.cameraTarget[1], frame.cameraTarget[2]]
    : frame.cameraTarget

  // Smooth camera interpolation during pinned Hero 3-stage sequence
  const heroCam = isMobile
    ? interpolateHeroCameraMobile(heroFurnishProgress, isRTL)
    : interpolateHeroCamera(heroFurnishProgress, isRTL)
  const isHeroActive = heroFurnishProgress < 0.999 && progress < 0.25

  const cameraPos = isHeroActive ? heroCam.pos : timelineCameraPos
  const cameraTarget = isHeroActive ? heroCam.target : timelineCameraTarget
  const cameraFov = isHeroActive ? heroCam.fov : frame.cameraFov

  // Center chair in portrait mobile, offset on desktop
  const chairPos = isMobile ? (isRTL ? -0.05 : 0.05) : (isRTL ? -0.55 : 0.55)

  // Ground shadow opacity (fades in as chair lands at y = 0.00)
  let shadowOpacity = 0.52 * frame.furnitureArrival
  if (isHeroActive) {
    if (heroFurnishProgress < 0.40) shadowOpacity = 0
    else if (heroFurnishProgress <= 0.65) shadowOpacity = 0.52 * ((heroFurnishProgress - 0.40) / 0.25)
    else shadowOpacity = 0.52
  }

  return (
    <>
      <CameraController
        targetPos={cameraPos}
        targetLookAt={cameraTarget}
        targetFov={cameraFov}
        inspectMode={inspectMode}
      />

      {/* Atmospheric Natural Sunlight Streaming from Slim Bronze Window Wall */}
      <directionalLight
        position={[-7, 5.8, 1.2]}
        intensity={frame.sunIntensity}
        color="#FFF3E0"
        castShadow={enableRealtimeShadows}
        shadow-mapSize={enableRealtimeShadows ? [shadowMapSize, shadowMapSize] : [256, 256]}
        shadow-camera-near={1.0}
        shadow-camera-far={18}
        shadow-camera-left={-6.5}
        shadow-camera-right={6.5}
        shadow-camera-top={6.5}
        shadow-camera-bottom={-6.5}
        shadow-bias={-0.0004}
      />

      {/* Soft Ambient Sky Fill */}
      <ambientLight intensity={0.5 * frame.ambientWarmth} color="#F4EFE6" />

      {/* Natural Architectural Floor & Sky Bounce */}
      <hemisphereLight
        intensity={0.6 * frame.ambientWarmth}
        color="#FFF8F0"
        groundColor="#D6C8B5"
      />

      {/* Gentle Fill for Realistic Contrast & Shadow Definition */}
      <directionalLight position={[4, 3, 2]} intensity={0.3} color="#F4EFE6" />

      <Suspense fallback={null}>
        <ArchitecturalRoom
          scanProgress={frame.scanProgress}
          furnitureArrival={frame.furnitureArrival}
          furnitureRotationY={frame.furnitureRotationY}
          roomTransformation={frame.roomTransformation}
          isRTL={isRTL}
          isMobile={isMobile}
          qualityProfile={qualityProfile as 'high' | 'balanced' | 'performance'}
        />

        {/* OrbitControls enabled exclusively in Inspect Mode */}
        {inspectMode && (
          <OrbitControls
            makeDefault
            enableZoom={true}
            minDistance={1.2}
            maxDistance={5.5}
            target={new THREE.Vector3(chairPos, 0.44, 0.35)}
            dampingFactor={0.08}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN,
            }}
          />
        )}

        {/* Ultra-performant Soft Radial Ground Shadow (0 offscreen passes, 60 FPS locked) */}
        <SoftGroundShadow
          position={[chairPos, 0.001, 0.35]}
          opacity={shadowOpacity}
        />
      </Suspense>
    </>
  )
}

export function getOptimalWebGLContext(
  canvas: HTMLCanvasElement | OffscreenCanvas
): WebGLRenderingContext | WebGL2RenderingContext | null {
  try {
    const gl = (canvas as HTMLCanvasElement).getContext('webgl2', {
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    if (gl) return gl as WebGL2RenderingContext
  } catch {}

  try {
    const gl = (canvas as HTMLCanvasElement).getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'default',
    })
    if (gl) return gl as WebGLRenderingContext
  } catch {}

  return null
}

function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2', { powerPreference: 'high-performance' }) ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    return !!gl
  } catch (err) {
    return false
  }
}

function Architectural2DStage({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden bg-[#F3EEE5]">
      <div className="relative flex flex-col items-center">
        <div className="w-80 h-80 rounded-full border border-[#A4774B]/20 flex items-center justify-center">
          <svg
            viewBox="0 0 240 240"
            className="w-48 h-48 text-[#29231E]/60 drop-shadow-sm"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="20" y="20" width="200" height="200" stroke="#A4774B" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M60 160 C60 100, 180 100, 180 160" stroke="#29231E" strokeWidth="2" />
            <line x1="50" y1="160" x2="190" y2="160" stroke="#A4774B" strokeWidth="1.5" />
            <line x1="70" y1="160" x2="60" y2="200" stroke="#29231E" strokeWidth="2" />
            <line x1="170" y1="160" x2="180" y2="200" stroke="#29231E" strokeWidth="2" />
          </svg>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#A4774B]">
          PHAROVIEW SPATIAL CANVAS
        </p>
      </div>
    </div>
  )
}

export default function ChairScene() {
  const { t, isRTL } = useLanguage()
  const canvasRef = useRef<HTMLDivElement>(null)
  const { inspectMode, materialVariant } = useSceneState()
  const capabilities = useDeviceCapabilities()
  const [hasWebGL, setHasWebGL] = useState(false)
  const [tested, setTested] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const supported = isWebGLSupported()
      setHasWebGL(supported)
    } catch {
      setHasWebGL(false)
    } finally {
      setTested(true)
    }

    const handleVisibility = () => {
      if (canvasRef.current) {
        canvasRef.current.style.visibility = document.hidden ? 'hidden' : 'visible'
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <>
      <div
        ref={canvasRef}
        className={`fixed inset-0 transition-all duration-500 ${
          inspectMode
            ? 'z-40 pointer-events-auto bg-[#1C1917]/75 backdrop-blur-md'
            : 'z-[1] pointer-events-none'
        }`}
        aria-hidden={!inspectMode}
      >
        <GrainTexture />

        <CanvasErrorBoundary fallback={<Architectural2DStage isRTL={isRTL} />}>
          {tested && hasWebGL ? (
            <Canvas
              shadows
              camera={{ position: [-1.4, 1.48, 4.3], fov: 41 }}
              dpr={[1, 1.5]}
              performance={{ min: 0.6 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.15,
              }}
              onCreated={({ gl }) => {
                gl.shadowMap.enabled = true
                gl.shadowMap.type = THREE.PCFShadowMap
              }}
            >
              <SceneContent
                isRTL={isRTL}
                isMobile={capabilities.isMobile}
                qualityProfile={capabilities.qualityProfile}
                shadowMapSize={capabilities.shadowMapSize}
                enableRealtimeShadows={capabilities.enableRealtimeShadows}
              />
            </Canvas>
          ) : (
            tested && <Architectural2DStage isRTL={isRTL} />
          )}
        </CanvasErrorBoundary>
      </div>

      {/* Inspect Mode 3D HUD & Exit Button */}
      {inspectMode && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 sm:p-10 text-left rtl:text-right select-none">
          {/* Top HUD */}
          <div className="flex justify-between items-start">
            <div className="glass-architectural-dark p-4 rounded-[2px] font-mono text-[10px] text-[#A4774B] border border-[#A4774B]/40">
              <p className="font-bold text-xs text-[#F3EEE5] mb-1">{t.common.activeGeometry}</p>
              <p className="text-[#DED2C0]">{t.common.xrayWireframe}</p>
              <p className="text-[#FAF5EE]/70 mt-1">{t.common.orbitHint}</p>
            </div>

            <div className="glass-architectural-dark p-4 rounded-[2px] font-mono text-[10px] text-[#A4774B] border border-[#A4774B]/40 text-right rtl:text-left">
              <p className="font-bold text-[#F3EEE5]">{t.common.archDimensions}</p>
              <p className="text-[#FAF5EE]/80 mt-1">
                {t.common.dimWidth} &bull; {t.common.dimHeight} &bull; {t.common.dimDepth}
              </p>
              <p className="text-[#A4774B] mt-0.5">{t.common.tolerance}</p>
            </div>
          </div>

          {/* Bottom Floating Toolbar: Material Swatches + Exit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            {/* Live Material Swatches */}
            <div className="glass-architectural-dark px-4 py-2 rounded-none border border-[#A4774B]/40 shadow-2xl flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-[#A4774B] uppercase tracking-wider pr-2 border-r border-[#A4774B]/30 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-2">
                {t.hero.materialsTitle}
              </span>
              <button
                type="button"
                onClick={() => sceneState.setMaterialVariant('oak')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none font-mono text-[10px] transition-all cursor-pointer ${
                  materialVariant === 'oak'
                    ? 'bg-[#F3EEE5] text-[#1C1917] font-bold shadow-md'
                    : 'text-[#FAF5EE]/70 hover:text-[#FAF5EE] hover:bg-white/10'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#C29A6E]" />
                <span>{t.hero.swatchOak}</span>
              </button>
              <button
                type="button"
                onClick={() => sceneState.setMaterialVariant('boucle')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none font-mono text-[10px] transition-all cursor-pointer ${
                  materialVariant === 'boucle'
                    ? 'bg-[#F3EEE5] text-[#1C1917] font-bold shadow-md'
                    : 'text-[#FAF5EE]/70 hover:text-[#FAF5EE] hover:bg-white/10'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#EDE5D8]" />
                <span>{t.hero.swatchBoucle}</span>
              </button>
              <button
                type="button"
                onClick={() => sceneState.setMaterialVariant('walnut')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none font-mono text-[10px] transition-all cursor-pointer ${
                  materialVariant === 'walnut'
                    ? 'bg-[#F3EEE5] text-[#1C1917] font-bold shadow-md'
                    : 'text-[#FAF5EE]/70 hover:text-[#FAF5EE] hover:bg-white/10'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#362519]" />
                <span>{t.hero.swatchWalnut}</span>
              </button>
            </div>

            {/* Exit Button */}
            <button
              type="button"
              onClick={() => sceneState.toggleInspectMode(false)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none bg-[#1C1917] text-[#F3EEE5] font-mono text-xs uppercase tracking-wider font-bold shadow-2xl hover:bg-[#A4774B] transition-all cursor-pointer"
            >
              <span>✕</span>
              <span>{t.common.exitInspect}</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
