import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import FloatingChair from './3d/FloatingChair'
import ParticleBackground from './ParticleBackground'
import '../styles/hero.css'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="hero pharaonic-pattern">
      <ParticleBackground />
      <div className="hero-content max-width-container">
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero-headline">
            Before you pay...
            <span className="text-gradient-gold"> see it in your home</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subheadline">
            The smart AR application for visualizing products in real-time
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta-group">
            <button className="btn btn-gold glow-gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span>Download for iOS</span>
            </button>
            <button className="btn btn-gold-outline glow-gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
              </svg>
              <span>Download for Android</span>
            </button>
          </motion.div>

          <div className="hero-confetti-fill" aria-hidden="true">
            <span className="hcf-dot" style={{top:'18%',left:'8%',width:'3px',height:'3px',opacity:0.55}}></span>
            <span className="hcf-dot" style={{top:'35%',left:'22%',width:'2px',height:'2px',opacity:0.4}}></span>
            <span className="hcf-dot" style={{top:'12%',left:'48%',width:'4px',height:'4px',opacity:0.35}}></span>
            <span className="hcf-dot" style={{top:'55%',left:'5%',width:'2px',height:'2px',opacity:0.45}}></span>
            <span className="hcf-dot" style={{top:'70%',left:'30%',width:'3px',height:'3px',opacity:0.3}}></span>
            <span className="hcf-dot" style={{top:'80%',left:'60%',width:'2px',height:'2px',opacity:0.5}}></span>
            <span className="hcf-dot" style={{top:'25%',left:'75%',width:'3px',height:'3px',opacity:0.38}}></span>
            <span className="hcf-dot" style={{top:'48%',left:'88%',width:'2px',height:'2px',opacity:0.42}}></span>
            <span className="hcf-dot" style={{top:'90%',left:'15%',width:'4px',height:'4px',opacity:0.28}}></span>
            <span className="hcf-dot" style={{top:'60%',left:'50%',width:'2px',height:'2px',opacity:0.36}}></span>
            <span className="hcf-diamond" style={{top:'10%',left:'35%',opacity:0.22}}></span>
            <span className="hcf-diamond" style={{top:'65%',left:'80%',opacity:0.18}}></span>
            <span className="hcf-diamond" style={{top:'42%',left:'14%',opacity:0.2}}></span>
            <span className="hcf-cross" style={{top:'30%',left:'60%',opacity:0.15}}></span>
            <span className="hcf-cross" style={{top:'75%',left:'42%',opacity:0.13}}></span>
          </div>
        </motion.div>

        <motion.div
          className="hero-canvas-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Suspense fallback={<div className="canvas-loader">Loading AR Model...</div>}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
              <pointLight position={[-10, -10, 10]} intensity={0.5} color="#F7E7CE" />
              <FloatingChair />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>

      <div className="hero-gradient-overlay"></div>
    </section>
  )
}
