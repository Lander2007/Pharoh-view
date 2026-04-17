import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingChair() {
  const groupRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  // Create a simple chair geometry since we don't have a model file
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation based on mouse position
      groupRef.current.rotation.x += (mouseRef.current.y * 0.5 - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y += (mouseRef.current.x * 0.5 - groupRef.current.rotation.y) * 0.05

      // Floating animation
      groupRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Chair seat */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          emissive="#F7E7CE"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Chair back */}
      <mesh position={[0, 1, -0.3]}>
        <boxGeometry args={[1.2, 1.5, 0.15]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          emissive="#F7E7CE"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Front left leg */}
      <mesh position={[-0.4, -0.8, 0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 1.6, 16]} />
        <meshStandardMaterial
          color="#F7E7CE"
          metalness={0.95}
          roughness={0.05}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Front right leg */}
      <mesh position={[0.4, -0.8, 0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 1.6, 16]} />
        <meshStandardMaterial
          color="#F7E7CE"
          metalness={0.95}
          roughness={0.05}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Back left leg */}
      <mesh position={[-0.4, -0.8, -0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 1.6, 16]} />
        <meshStandardMaterial
          color="#F7E7CE"
          metalness={0.95}
          roughness={0.05}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Back right leg */}
      <mesh position={[0.4, -0.8, -0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 1.6, 16]} />
        <meshStandardMaterial
          color="#F7E7CE"
          metalness={0.95}
          roughness={0.05}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Decorative golden glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.15}
          transparent
          opacity={0.08}
          wireframe={false}
        />
      </mesh>
    </group>
  )
}
