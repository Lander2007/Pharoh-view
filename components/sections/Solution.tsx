'use client'

const features = [
  {
    code: 'SYS.01',
    label: 'Plane Detection',
    desc: 'Accurately maps floors, walls, and horizontal surfaces using LiDAR and ARCore/ARKit geometry scanning.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.75">
        <path d="M3 17l9 4 9-4M3 12l9 4 9-4M3 7l9 4 9-4" />
      </svg>
    ),
  },
  {
    code: 'SYS.02',
    label: 'Real-time Rotation',
    desc: 'Spin, orbit, and position furniture in full 3D space with high-precision single-touch gestures.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.75">
        <path d="M21 12a9 9 0 11-3-6.7L21 8m0 0V3m0 5h-5" />
      </svg>
    ),
  },
  {
    code: 'SYS.03',
    label: 'Color Customization',
    desc: 'Swap materials, fabrics, and wood finishes in real time to match your existing room decor instantly.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 010 18z" fill="currentColor" fillOpacity="0.25" />
      </svg>
    ),
  },
  {
    code: 'SYS.04',
    label: 'Model Swapping',
    desc: 'Browse multiple size variants, sectional configurations, and styles without leaving your room view.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.75">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    code: 'SYS.05',
    label: 'Precise Measurements',
    desc: 'Overlay millimeter-accurate dimensional bounding boxes so you verify clearances before delivery.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.75">
        <path d="M2 12h20M6 8l-4 4 4 4M18 8l4 4-4 4" />
      </svg>
    ),
  },
  {
    code: 'SYS.06',
    label: 'Lighting Simulation',
    desc: 'Physically based dynamic contact shadows and ambient light estimation match your room bulbs.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.75">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
]

export default function Solution() {
  return (
    <section
      id="features"
      className="relative min-h-screen flex items-center py-28 px-6 lg:px-12"
    >
      {/* Soft backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 75% at 75% 50%, rgba(227,213,190,0.92) 0%, rgba(227,213,190,0.50) 55%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-clay/40" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-clay font-medium">
              [ 03 / TECHNICAL SPECIFICATIONS ]
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight tracking-tight mb-4">
            Precision AR, built for furniture.
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink/70 leading-relaxed">
            Six dedicated spatial engines operating simultaneously to deliver true millimeter-accurate
            virtual staging in real rooms.
          </p>
        </div>

        {/* Asymmetric 2-Column Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f) => (
            <div
              key={f.code}
              className="p-7 sm:p-8 bg-sand-deep/40 backdrop-blur-sm border border-clay/20 hover:border-gold/60 transition-colors group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.20em] text-gold font-semibold">
                    {f.code}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-sand flex items-center justify-center text-clay group-hover:text-gold group-hover:scale-110 transition-all border border-clay/20">
                    {f.icon}
                  </div>
                </div>
                <h3 className="font-serif font-bold text-ink text-xl mb-3">
                  {f.label}
                </h3>
                <p className="font-sans text-ink/70 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-clay/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-clay/60">
                <span>ACTIVE ENGINE</span>
                <span className="text-gold">&bull; ONLINE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
