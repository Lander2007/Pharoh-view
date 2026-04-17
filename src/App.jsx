import React from 'react'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import StatsCounter from './components/StatsCounter'
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
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <MobileMenu />
      <div className="pharoview-app">
        <ScrollProgress />
        <FloatingNav />
        <Hero />
        <Problem />
        <Solution />
        <StatsCounter />
        <ValueProposition />
        <Testimonials />
        <Sustainability />
        <CTA />
        <Footer />
        <BackToTop />
      </div>
    </>
  )
}
