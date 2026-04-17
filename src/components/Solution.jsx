import React from 'react'
import { motion } from 'framer-motion'
import '../styles/solution.css'

export default function Solution() {
  const features = [
    {
      title: 'Plane Detection',
      description: 'Automatically detects floors, walls, and surfaces in your space',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Real-time Rotation',
      description: 'Rotate furniture 360° to see it from every angle',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Color Customization',
      description: 'Change colors instantly to match your décor',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
    {
      title: 'Model Swapping',
      description: 'Compare multiple furniture pieces side-by-side',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Precise Measurements',
      description: 'Get exact dimensions in your space',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 8v4M10 8v2M13 8v4M16 8v2M7 16v-2M10 16v-2M13 16v-2M16 16v-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Lighting Simulation',
      description: 'See how furniture looks in different lighting conditions',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 4v1m5.66 1.34-.7.7m3.04 4.96h-1m-1.34 5.66-.7-.7M12 19v1m-5.66-1.34.7-.7m-3.04-4.96h1m1.34-5.66.7.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="solution section-padding">
      <div className="max-width-container">
        <motion.div
          className="solution-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">The Solution</h2>
          <p className="section-subtitle">
            PHAROVIEW uses cutting-edge AR technology to bring furniture to life
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="feature-card glass-strong golden-aura"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateZ: 2,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-glow"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="solution-highlight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="highlight-content">
            <h3>How It Works</h3>
            <ol className="steps">
              <li>
                <span className="step-number">1</span>
                <span>Open PHAROVIEW and point your camera at your space</span>
              </li>
              <li>
                <span className="step-number">2</span>
                <span>Select furniture from our 10M+ model library</span>
              </li>
              <li>
                <span className="step-number">3</span>
                <span>Place, rotate, and customize in real-time</span>
              </li>
              <li>
                <span className="step-number">4</span>
                <span>Make confident purchase decisions</span>
              </li>
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
