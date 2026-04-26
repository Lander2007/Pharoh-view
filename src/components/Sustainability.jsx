import React from 'react'
import { motion } from 'framer-motion'
import recycleIcon from '../../recycle.png'
import '../styles/sustainability.css'

export default function Sustainability() {
  const goals = [
    {
      number: '12',
      title: 'Goal 12: Responsible Consumption',
      description: 'Reducing resource waste and over-consumption by minimizing unnecessary product returns.',
      impact: 'Lower material waste and reverse-logistics load',
      icon: (
        <img 
          src={recycleIcon} 
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
      title: 'Goal 11: Sustainable Cities',
      description: 'Improving city living quality through smart interior planning and better space decisions.',
      impact: 'Smarter homes with fewer purchasing mistakes',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      number: '9',
      title: 'Goal 9: Industry Innovation',
      description: 'Driving innovation in e-commerce through practical AR visualization technology.',
      impact: 'Stronger digital commerce and retail innovation',
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
      description: 'Climate action by reducing carbon emissions from returned shipments and repeated delivery cycles.',
      impact: 'Direct reduction in transport-related CO2 emissions',
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
            PHAROVIEW contributes to key UN Sustainable Development Goals
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
              className={`sdg-card glass-strong golden-aura ${goal.number === '13' ? 'climate-priority' : ''}`}
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
          <h3>Climate Leaders Program Impact</h3>
          <p>Every confident purchase helps reduce avoidable returns and emissions.</p>
          <button className="btn btn-gold glow-gold">
            Explore Our Sustainability Vision
          </button>
        </motion.div>
      </div>
    </section>
  )
}
