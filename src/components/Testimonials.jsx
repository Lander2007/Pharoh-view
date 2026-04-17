import React from 'react'
import { motion } from 'framer-motion'
import '../styles/testimonials.css'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Interior Designer',
      image: 'SJ',
      text: 'PHAROVIEW has revolutionized how I work with clients. They can see exactly how furniture will look in their space before purchasing.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Homeowner',
      image: 'MC',
      text: 'I saved thousands by avoiding returns. The AR visualization is incredibly accurate and easy to use.',
      rating: 5,
    },
    {
      name: 'Emma Williams',
      role: 'Furniture Store Owner',
      image: 'EW',
      text: 'Our return rate dropped by 40% after implementing PHAROVIEW. Customers are more confident in their purchases.',
      rating: 5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="testimonials section-padding">
      <div className="max-width-container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Join thousands of satisfied customers who transformed their shopping experience
          </p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="testimonial-card glass-strong golden-aura"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.image}</div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
