import React from 'react'
import { motion } from 'framer-motion'
import logoImage from '../../pharoview_logo_splash-removebg-preview.png'
import '../styles/footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#', external: false },
      { label: 'Security', href: '#', external: false },
      { label: 'Roadmap', href: '#', external: false },
    ],
    Company: [
      { label: 'About', href: '#', external: false },
      { label: 'Contact', href: '#', external: false },
      { label: 'Careers', href: '#', external: false },
    ],
    Legal: [
      { label: 'Privacy', href: '#', external: false },
      { label: 'Terms', href: '#', external: false },
      { label: 'Cookies', href: '#', external: false },
    ],
    Social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com', external: true },
      { label: 'YouTube', href: 'https://www.youtube.com', external: true },
    ],
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
              <img
                src={logoImage}
                alt="Pharoview logo"
                className="footer-logo"
                loading="lazy"
                decoding="async"
              />
              <h3>PHAROVIEW</h3>
              <p>AR-powered confidence for smarter furniture decisions.</p>
              <div className="brand-tagline">Ancient wisdom, future vision.</div>
              <div className="team-credits">
                <p><strong>Team Pyramid X</strong> - Climate Leaders Project</p>
                <p>Ali Mohamed Ali Hassan & Adel Mohamed Mohamed</p>
                <p>WE Applied Technology School</p>
                <p>Supported by YLF and the Ministry of Environment</p>
              </div>
              <div className="footer-contact">
                <a href="mailto:adelmohammed2008262@gmail.com" className="footer-mini-link">adelmohammed2008262@gmail.com</a>
                <span className="footer-separator">|</span>
                <a href="mailto:alimohamed1011108@gmail.com" className="footer-mini-link">alimohamed1011108@gmail.com</a>
                <span className="footer-separator">|</span>
                <span>Alexandria, Egypt</span>
              </div>
              <div className="footer-contact">
                <a href="tel:+201227758433" className="footer-mini-link">+20 12 27758433</a>
                <span className="footer-separator">|</span>
                <a href="tel:+201102069798" className="footer-mini-link">01102069798</a>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-section">
              <h4>{category}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-link"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer noopener' : undefined}
                    >
                      {link.label}
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
            <p>&copy; {currentYear} PHAROVIEW. All rights reserved. Built for Climate Leaders.</p>
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
