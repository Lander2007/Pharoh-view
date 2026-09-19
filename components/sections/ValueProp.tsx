'use client'

const metrics = [
  {
    value: '94%',
    label: 'Buyer Confidence',
    desc: 'of consumers reported zero hesitation at final checkout after verifying furniture dimensions in AR.',
    featured: true,
  },
  {
    value: '3×',
    label: 'Faster Decision Cycle',
    desc: 'Reduction in days spent deliberating compared to showroom and tape-measure cycles.',
    featured: false,
  },
  {
    value: '↓67%',
    label: 'Return Rate Reduction',
    desc: 'Drop in post-delivery returns caused by scale surprises and doorway clearance conflicts.',
    featured: false,
  },
  {
    value: '±2cm',
    label: 'Placement Accuracy',
    desc: 'LiDAR spatial bounding anchor precision across standard living room floorplans.',
    featured: false,
  },
  {
    value: '∞',
    label: 'Material Combinations',
    desc: 'Instant real-time shader evaluations of woods, bouclés, leathers, and metal finishes.',
    featured: false,
  },
]

export default function ValueProp() {
  const primary = metrics[0]
  const supporting = metrics.slice(1)

  return (
    <section
      id="value"
      className="relative min-h-screen flex items-center py-28 px-6 lg:px-12"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 70% at 25% 55%, rgba(227,213,190,0.94) 0%, rgba(227,213,190,0.55) 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-clay/40" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-clay font-medium">
              [ 05 / VERIFIED IMPACT ]
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight tracking-tight mb-4">
            Real impact, measured.
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink/70 leading-relaxed">
            Quantifiable certainty that protects retail margins and consumer peace of mind.
          </p>
        </div>

        {/* Asymmetric Stats Layout: Large Emphasized Hero Card + Smaller Supporting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Emphasized Stat Card (Spans 5 Columns) */}
          <div className="lg:col-span-5 p-8 sm:p-10 bg-sand-deep/60 backdrop-blur-sm border-2 border-clay flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-gold font-bold">
                  PRIMARY METRIC
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
              </div>

              <div className="font-serif text-7xl sm:text-8xl lg:text-9xl font-bold text-clay leading-none tracking-tight mb-4">
                {primary.value}
              </div>

              <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                {primary.label}
              </h3>

              <p className="font-sans text-ink/75 text-base leading-relaxed">
                {primary.desc}
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-clay/20 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-clay">
              <span>BENCHMARK DATA</span>
              <span>VERIFIED 2026</span>
            </div>
          </div>

          {/* Supporting Metrics 2x2 Grid (Spans 7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {supporting.map((s, i) => (
              <div
                key={i}
                className="p-7 bg-sand-deep/40 backdrop-blur-sm border border-clay/20 flex flex-col justify-between hover:border-clay/50 transition-colors"
              >
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-clay/60 block mb-3">
                    METRIC 0{i + 2}
                  </span>
                  <p className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-2">
                    {s.value}
                  </p>
                  <h4 className="font-serif font-bold text-ink text-base mb-2">
                    {s.label}
                  </h4>
                  <p className="font-sans text-ink/70 text-xs sm:text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-clay/15 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-mono text-[10px] text-clay/70 uppercase tracking-widest">
                    SYSTEM VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
