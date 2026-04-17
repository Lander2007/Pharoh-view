import React from 'react'
import { motion } from 'framer-motion'
import '../styles/sustainability.css'

export default function Sustainability() {
  const goals = [
    {
      number: '12',
      title: 'Responsible Consumption',
      description: 'Reduce waste by eliminating unnecessary returns and promoting conscious purchasing decisions',
      impact: '50K tons of waste prevented annually',
      icon: (
        <img 
          src="/recycle.png" 
          alt="Recycle icon" 
          style={{ 
            width: '40px', 
            height: '40px',
            filter: 'brightness(0) saturate(100%) invert(68%) sepia(45%) saturate(548%) hue-rotate(8deg) brightness(93%) contrast(87%)'
          }} 
        />
      ),
    },
    {
      number: '11',
      title: 'Sustainable Living',
      description: 'Design smarter, more sustainable living spaces through better product visualization',
      impact: '1M+ homes optimized',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      number: '9',
      title: 'Innovation in E-commerce',
      description: 'Transform the furniture industry through cutting-edge AR technology',
      impact: '$2B market impact',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2 2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="m2 17 10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      number: '13',
      title: 'Climate Action',
      description: 'Reduce CO2 emissions from return shipping and logistics',
      impact: '100K tons CO2 saved',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round"/>
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="sustainability section-padding">
      <div className="max-width-container">
        <motion.div
          className="sustainability-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Sustainability Goals</h2>
          <p className="section-subtitle">
            PHAROVIEW aligns with UN Sustainable Development Goals
          </p>
        </motion.div>

        <motion.div
          className="sdg-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {goals.map((goal, idx) => (
            <motion.div
              key={idx}
              className="sdg-card glass-strong golden-aura"
              variants={itemVariants}
            >
              <div className="sdg-number">{goal.number}</div>
              <div className="sdg-icon">{goal.icon}</div>
              <h3>{goal.title}</h3>
              <p className="sdg-description">{goal.description}</p>
              <div className="sdg-impact">
                <span className="impact-label">Impact:</span>
                <span className="impact-value">{goal.impact}</span>
              </div>
              <div className="sdg-glow"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="sustainability-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>Join the Sustainable Shopping Revolution</h3>
          <p>Every download contributes to a greener planet</p>
          <button className="btn btn-gold glow-gold">
            Learn More About Our Impact
          </button>
        </motion.div>
      </div>
    </section>
  )
}
