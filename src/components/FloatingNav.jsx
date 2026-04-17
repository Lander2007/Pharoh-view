import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/floating-nav.css'

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)

      // Detect active section
      const sections = ['hero', 'problem', 'solution', 'value-proposition', 'sustainability', 'cta']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.querySelector(`.${section}`)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionClass) => {
    const element = document.querySelector(`.${sectionClass}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'value-proposition', label: 'Value Proposition' },
    { id: 'sustainability', label: 'SDGs' },
    { id: 'cta', label: 'Download' },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="floating-nav"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ x: 0 }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={item.label}
            >
              <span className="nav-label">{item.label}</span>
            </motion.button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
