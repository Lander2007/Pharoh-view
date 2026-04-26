import React from 'react'
import { motion } from 'framer-motion'
import '../styles/problem.css'

export default function Problem() {
  const problems = [
    {
      title: 'Wrong Measurements',
      description: 'Furniture arrives and doesn\'t fit your space',
      color: '#D4AF37',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 8v4M10 8v2M13 8v4M16 8v2M7 16v-2M10 16v-2M13 16v-2M16 16v-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Color Mismatch',
      description: 'The color looks completely different in person',
      color: '#D4AF37',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
    {
      title: 'Wasted Money',
      description: 'Returns and restocking fees drain your budget',
      color: '#D4AF37',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Time Loss',
      description: 'Weeks of waiting for returns and replacements',
      color: '#D4AF37',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="problem section-padding">
      <div className="max-width-container">
        <motion.div
          className="problem-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Problem vs. Solution</h2>
          <p className="section-subtitle">
            Shoppers struggle with wrong sizes, mismatched colors, and costly returns.
            PHAROVIEW solves this with in-home AR visualization that improves confidence
            and reduces waste.
          </p>
        </motion.div>

        <motion.div
          className="problems-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              className="problem-card glass golden-aura"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="problem-icon" 
                style={{ color: problem.color }}
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {problem.icon}
              </motion.div>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
              <div className="problem-accent" style={{ background: problem.color }}></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="problem-impact-card glass-strong"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="problem-impact-label">Environmental Impact</span>
          <h3 className="problem-impact-title">+25% to 30% Carbon Footprint Increase</h3>
          <p className="problem-impact-text">
            Each product return adds logistics overhead and contributes to thousands of
            tons of avoidable carbon emissions.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
