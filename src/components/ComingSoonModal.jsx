import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ComingSoonModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="coming-soon-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="coming-soon-modal glass-strong"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
          >
            <h3 id="coming-soon-title">Coming Soon</h3>
            <p>Our iOS app is on its way! Stay tuned.</p>
            <button type="button" className="btn btn-gold" onClick={onClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
