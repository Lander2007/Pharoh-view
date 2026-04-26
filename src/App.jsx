import React, { useState } from 'react'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import ValueProposition from './components/ValueProposition'
import Testimonials from './components/Testimonials'
import Sustainability from './components/Sustainability'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import FloatingNav from './components/FloatingNav'
import MobileMenu from './components/MobileMenu'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'
import ComingSoonModal from './components/ComingSoonModal'

export default function App() {
  const [isIosModalOpen, setIsIosModalOpen] = useState(false)

  return (
    <>
      <LoadingScreen />
      <MobileMenu />
      <div className="pharoview-app">
        <ScrollProgress />
        <FloatingNav />
        <Hero onIosClick={() => setIsIosModalOpen(true)} />
        <Problem />
        <Solution />
        <ValueProposition />
        <Testimonials />
        <Sustainability />
        <CTA onIosClick={() => setIsIosModalOpen(true)} />
        <Footer />
        <BackToTop />
      </div>
      <ComingSoonModal isOpen={isIosModalOpen} onClose={() => setIsIosModalOpen(false)} />
    </>
  )
}
