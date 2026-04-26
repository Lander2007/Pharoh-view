import React from 'react'
import { motion } from 'framer-motion'
import '../styles/testimonials.css'

export default function Testimonials() {
  return (
    <section className="testimonials section-padding">
      <div className="max-width-container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">The Future Plan Is That</h2>
          <p className="section-subtitle">
            We will add AI within the app to suggest the most suitable furniture style and
            color for the room.
          </p>
        </motion.div>

        <motion.div
          className="future-plan-card glass-strong"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="future-plan-label">AI Roadmap</span>
          <h3 className="future-plan-title">Personalized Room Styling Suggestions</h3>
          <p className="future-plan-text">
            We will add AI within the app to suggest the most suitable furniture style and
            color for the room.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
