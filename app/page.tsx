'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import Solution from '@/components/sections/Solution'
import HowItWorks from '@/components/sections/HowItWorks'
import ValueProp from '@/components/sections/ValueProp'
import SDGs from '@/components/sections/SDGs'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

// Dynamic import for 3D scene (no SSR)
const ChairScene = dynamic(() => import('@/components/scene/ChairScene'), {
  ssr: false,
})

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search)
      const sec = sp.get('section')
      if (sec) {
        const scrollToSec = () => {
          const el = document.getElementById(sec)
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' })
          }
        }
        scrollToSec()
        setTimeout(scrollToSec, 50)
        setTimeout(scrollToSec, 150)
        setTimeout(scrollToSec, 400)
      }
    }
  }, [])

  return (
    <main className="relative">
      {/* Fixed 3D scene behind everything */}
      <ChairScene />

      {/* Scrollable content */}
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <ValueProp />
        <SDGs />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}
