'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/common/SmoothScrollProvider'
import PageWipePreloader from '@/components/common/PageWipe'
import Nav from '@/components/sections/Nav'
import CinematicStory from '@/components/sections/CinematicStory'
import Problem from '@/components/sections/Problem'
import Solution from '@/components/sections/Solution'
import HowItWorks from '@/components/sections/HowItWorks'
import ValueProp from '@/components/sections/ValueProp'
import SDGs from '@/components/sections/SDGs'
import FuturePlan from '@/components/sections/FuturePlan'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'
import { useLanguage } from '@/lib/i18n'

// Dynamic import for persistent 3D architectural living room scene (no SSR)
const ChairScene = dynamic(() => import('@/components/scene/ChairScene'), {
  ssr: false,
})

export default function Home() {
  const { lang, isRTL } = useLanguage()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search)
      const sec = sp.get('section')
      if (sec) {
        const scrollToSec = () => {
          const el = document.getElementById(sec)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
        setTimeout(scrollToSec, 200)
      }
    }
  }, [])

  return (
    <SmoothScrollProvider>
      {/* Initial Architectural Page Wipe Preloader */}
      <PageWipePreloader />

      {/* Layer 3: Top Floating Luxury Architectural Glass Dock (z-[100]) */}
      <Nav />

      {/* Layer 0: Fixed 3D Spatial Architectural Living Room (z-[1] - persistent full 3D environment) */}
      <ChairScene />

      {/* Main container keyed by lang so switching languages cleanly remounts DOM and resets GSAP */}
      <main
        key={lang}
        dir={isRTL ? 'rtl' : 'ltr'}
        className="relative min-h-screen text-[#1C1917] selection:bg-[#A4774B]/25"
      >
        {/* Pinned 3D Architectural Furnishing Sequence (Hero) */}
        <CinematicStory />

        {/* Verified Authentic Sections with Perfect Information */}
        <Problem />
        <Solution />
        <HowItWorks />
        <ValueProp />
        <SDGs />
        <FuturePlan />
        <CTA />

        {/* Complete Architectural Team Footer */}
        <Footer />
      </main>
    </SmoothScrollProvider>
  )
}
