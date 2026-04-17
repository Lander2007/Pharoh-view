import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import '../styles/stats-counter.css'

export default function StatsCounter() {
  const stats = [
    { 
      value: 10000000, 
      suffix: '+', 
      label: 'Furniture Models', 
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      value: 98, 
      suffix: '%', 
      label: 'Accuracy Rate', 
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    },
    { 
      value: 50000, 
      suffix: '+', 
      label: 'Happy Users', 
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      value: 40, 
      suffix: '%', 
      label: 'Return Reduction', 
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ]

  return (
    <section className="stats-counter section-padding">
      <div className="max-width-container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, delay }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = stat.value
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, stat.value])

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K'
    }
    return num
  }

  return (
    <motion.div
      ref={ref}
      className="stat-card glass-strong"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)'
      }}
    >
      <motion.div 
        className="stat-icon"
        animate={{ 
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        {stat.icon}
      </motion.div>
      <div className="stat-value">
        {formatNumber(count)}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  )
}
