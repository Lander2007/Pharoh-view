'use client'

import { useRef } from 'react'
import { useLanguage } from '@/lib/i18n'
import TiltCard from '@/components/common/TiltCard'

export default function FuturePlan() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const fp = t.futurePlan

  return (
    <section
      id="future-plan"
      ref={sectionRef}
      className="relative z-10 py-32 px-6 lg:px-16 overflow-hidden bg-transparent"
      style={{ padding: '120px 6vw' }}
    >
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left rtl:text-right">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C89D54]" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] rtl:tracking-normal text-[#C89D54] font-semibold">
              {fp.eyebrow}
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-[2px] text-[10px] font-mono font-bold bg-[#C89D54]/15 text-[#8C6239] border border-[#C89D54]/30">
              {fp.comingSoon}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] leading-[1.15] tracking-tight rtl:tracking-normal mb-4">
            {fp.heading}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl">
            {fp.subtitle}
          </p>
        </div>

        {/* 3-Step Interactive Pipeline: 3 Equal-Width Frosted Architectural Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-stretch">
          {fp.steps.map((step, idx) => {
            return (
              <div key={step.num} className="relative flex flex-col group">
                <TiltCard
                  className="h-full p-8 rounded-[2px] transition-all duration-300 flex flex-col justify-between text-left rtl:text-right glass-architectural text-[#1C1917] border border-[#1C1917]/15 shadow-architectural hover:border-[#C89D54]/80 hover:shadow-2xl"
                >
                  <div>
                    {/* Card Header Strip */}
                    <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#1C1917]/10 font-mono text-[11px] tracking-wider rtl:tracking-normal">
                      <span className="font-bold text-[#C89D54]">{step.step}</span>
                      <span className="opacity-70 text-[10px] text-[#57534E] uppercase">{step.tag}</span>
                    </div>

                    {/* Step Visual Stage (Apple-Grade Interactive Simulation) */}
                    <div className="relative w-full h-48 mb-6 rounded-[2px] border border-[#1C1917]/15 bg-[#EDE4D8] overflow-hidden flex items-center justify-center shadow-inner">
                      {/* Blueprint Grid pattern */}
                      <div className="absolute inset-0 bg-blueprint-grid opacity-35" />

                      {idx === 0 && (
                        /* Step 1: 2D Photo Scan with Animated Laser Sweep */
                        <div className="relative w-36 h-40 border border-[#C89D54]/60 rounded-[4px] flex flex-col items-center justify-center p-3 bg-[#F5EEE6] text-[#1C1917] shadow-md overflow-hidden">
                          {/* Animated Scanning Laser Beam */}
                          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4CC9F0] to-transparent animate-pulse shadow-[0_0_8px_#4CC9F0]"
                            style={{
                              top: '25%',
                              animation: 'scanSweep 3s ease-in-out infinite alternate',
                            }}
                          />
                          {/* Photo Icon & Detection Nodes */}
                          <div className="relative w-16 h-16 rounded-full border border-dashed border-[#C89D54]/80 flex items-center justify-center bg-[#FAF5EE] mb-2">
                            <svg className="w-8 h-8 text-[#C89D54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <circle cx="12" cy="13" r="3" strokeWidth={1.5} />
                            </svg>
                            {/* Corner Detection Nodes */}
                            <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                            <span className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                          </div>
                          <span className="font-mono text-[9px] font-bold text-[#8C6239] tracking-wider uppercase">
                            2D RGB CAPTURE
                          </span>
                          <span className="font-mono text-[8px] text-[#78716C] mt-0.5">
                            AUTO EDGE DETECTION
                          </span>
                        </div>
                      )}

                      {idx === 1 && (
                        /* Step 2: AI Neural 3D Gaussian Mesh Reconstruction */
                        <div className="relative w-40 h-40 flex items-center justify-center">
                          {/* Holographic Pulse Rings */}
                          <div className="absolute w-32 h-32 rounded-full border border-[#4CC9F0]/30 animate-ping opacity-20" />
                          <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#C89D54]/50 animate-spin" style={{ animationDuration: '24s' }} />

                          {/* 3D Wireframe Mesh Cube */}
                          <div className="relative w-24 h-24 border border-[#C89D54] rounded-[2px] flex items-center justify-center bg-[#F5EEE6]/85 shadow-lg transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                            <svg className="w-12 h-12 text-[#C89D54]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeWidth={1.4} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                              <line x1="12" y1="22" x2="12" y2="12" strokeWidth={1.4} strokeDasharray="2 2" />
                            </svg>
                            {/* Neural Point Nodes */}
                            <span className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#4CC9F0] -translate-x-1 -translate-y-1" />
                            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#C89D54] translate-x-1 -translate-y-1" />
                            <span className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-[#C89D54] -translate-x-1 translate-y-1" />
                            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#4CC9F0] translate-x-1 translate-y-1" />
                          </div>

                          <div className="absolute bottom-1 font-mono text-[8px] text-[#8C6239] font-bold tracking-widest uppercase bg-[#F5EEE6]/90 px-2 py-0.5 rounded-[2px] border border-[#C89D54]/30">
                            NEURAL POINT CLOUD
                          </div>
                        </div>
                      )}

                      {idx === 2 && (
                        /* Step 3: Spatial AR True-Scale Room Placement */
                        <div className="relative w-40 h-40 flex flex-col items-center justify-center bg-[#F5EEE6]/80 rounded-[2px] p-2">
                          {/* AR Floor Reticle & Perspective Grid */}
                          <div className="absolute inset-2 border border-[#C89D54]/40 rounded-[2px]" />
                          <span className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#C89D54]" />
                          <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#C89D54]" />
                          <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#C89D54]" />
                          <span className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#C89D54]" />

                          {/* 3D Chair Anchor Silhouette */}
                          <div className="relative z-10 flex flex-col items-center">
                            <svg className="w-14 h-14 text-[#C89D54] drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeWidth={1.6} d="M6 19v-4a2 2 0 012-2h8a2 2 0 012 2v4M6 19h12M9 13V5a2 2 0 012-2h2a2 2 0 012 2v8M6 21v-2M18 21v-2" />
                            </svg>
                            {/* Live Dimension Indicator Tag */}
                            <div className="mt-1 flex items-center gap-1 font-mono text-[8px] text-[#2A9D8F] font-bold bg-[#FAF5EE] px-1.5 py-0.5 rounded-[2px] border border-[#2A9D8F]/40 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-pulse" />
                              <span>1:1 SCALE // W:740mm</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-2xl mb-3 text-[#1C1917]">
                      {step.title}
                    </h3>

                    <p className="font-sans text-sm leading-relaxed mb-6 text-[#57534E]">
                      {step.desc}
                    </p>
                  </div>

                  {/* Card Footer Telemetry */}
                  <div className="pt-4 border-t border-[#1C1917]/10 font-mono text-[10px] flex items-center justify-between text-[#78716C]">
                    <span className="font-semibold text-[#8C6239]">{step.detail}</span>
                    <span className="font-bold text-[#C89D54] tracking-widest">STEP 0{idx + 1}</span>
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>

        {/* Bottom AI Synthesis Engine Banner: Warm Frosted Architectural Styling */}
        <div className="mt-12 p-6 glass-architectural text-[#1C1917] rounded-[2px] border border-[#C89D54]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C89D54] animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#8C6239] font-bold">
              {fp.aiBadge}
            </p>
          </div>
          <p className="font-mono text-xs text-[#57534E]">
            {isRTL ? 'دقة مليمترية • بناء سحابي فوري • متاح قريباً لكافة المستخدمين' : 'Millimeter Precision • Instant Cloud Synthesis • Coming in V2.0'}
          </p>
        </div>
      </div>
    </section>
  )
}
