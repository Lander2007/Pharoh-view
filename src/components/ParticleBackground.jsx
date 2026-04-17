import React, { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: null, y: null })
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Particle colors - shades of gold to match the luxurious theme
    const colors = ['#D4AF37', '#F7E7CE', '#B8860B', '#E5C77A', '#C9A961']

    // Particle class
    class Particle {
      constructor() {
        this.reset()
        // Random initial position
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
      }

      reset() {
        this.size = Math.random() * 3 + 1 // 1-4px
        this.isDash = Math.random() > 0.5 // 50% chance of being a dash
        this.dashLength = Math.random() * 8 + 4 // 4-12px for dashes
        this.speedX = (Math.random() - 0.5) * 0.5 // Slow drift
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.6 + 0.3 // 0.3-0.9
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02 // Slight rotation
        this.originalX = this.x
        this.originalY = this.y
      }

      update() {
        // Drift movement
        this.x += this.speedX
        this.y += this.speedY

        // Rotation animation for dashes
        if (this.isDash) {
          this.rotation += this.rotationSpeed
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Mouse repulsion
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = this.x - mouseRef.current.x
          const dy = this.y - mouseRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const repelRadius = 120

          if (distance < repelRadius) {
            const force = (repelRadius - distance) / repelRadius
            const angle = Math.atan2(dy, dx)
            const repelX = Math.cos(angle) * force * 3
            const repelY = Math.sin(angle) * force * 3
            
            this.x += repelX
            this.y += repelY
          }
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.size

        if (this.isDash) {
          // Draw dash
          ctx.translate(this.x, this.y)
          ctx.rotate(this.rotation)
          ctx.beginPath()
          ctx.moveTo(-this.dashLength / 2, 0)
          ctx.lineTo(this.dashLength / 2, 0)
          ctx.stroke()
        } else {
          // Draw dot
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 200; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }

    // Touch handlers
    const handleTouchMove = (e) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mouseRef.current.x = touch.clientX - rect.left
      mouseRef.current.y = touch.clientY - rect.top
    }

    const handleTouchEnd = () => {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }

    // Window resize handler
    const handleResize = () => {
      resizeCanvas()
      // Reinitialize particles on resize
      initParticles()
    }

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('resize', handleResize)

    // Start animation
    initParticles()
    animate()

    // Cleanup
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 0,
      }}
    />
  )
}
