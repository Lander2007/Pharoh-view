import React from 'react'
import { motion } from 'framer-motion'
import '../styles/footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Compliance'],
    Social: ['Twitter', 'Instagram', 'LinkedIn', 'YouTube'],
  }

  return (
    <footer className="footer">
      <div className="max-width-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-section">
            <div className="footer-brand">
              <h3>PHAROVIEW</h3>
              <p>The future of furniture shopping is here</p>
              <div className="brand-tagline">Pharo-Tech: Ancient Wisdom, Future Vision</div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-section">
              <h4>{category}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="footer-divider"></div>
          <div className="footer-credits">
            <p>&copy; {currentYear} PHAROVIEW. All rights reserved.</p>
            <div className="footer-badges">
              <span className="badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sustainable
              </span>
              <span className="badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Secure
              </span>
              <span className="badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Fast
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
