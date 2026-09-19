'use client'

const sdgs = [
  {
    goal: 'GOAL 12',
    name: 'Responsible Consumption and Production',
    accent: '#BF8B2E',
    metric: '67% Fewer Returns',
    detail: 'Eliminating false-expectation purchases cuts packaging waste, reverse freight, and unrecyclable packing foams at the origin.',
  },
  {
    goal: 'GOAL 11',
    name: 'Sustainable Cities and Communities',
    accent: '#FD9D24',
    metric: 'Zero Bulk Landfill',
    detail: 'Preventing misplaced large furniture purchases diverts thousands of tons of bulky wood and foam scrap from municipal waste streams.',
  },
  {
    goal: 'GOAL 09',
    name: 'Industry, Innovation and Infrastructure',
    accent: '#FD6925',
    metric: 'Spatial Commerce',
    detail: 'Transforming legacy physical showrooms into distributed AR staging environments, lowering commercial building energy overheads.',
  },
  {
    goal: 'GOAL 13',
    name: 'Climate Action',
    accent: '#3F7E44',
    metric: 'Avoided Carbon Tonnage',
    detail: 'Direct logistics abatement by removing unnecessary multi-stage diesel freight trips between distribution hubs and living rooms.',
  },
]

export default function SDGs() {
  return (
    <section
      id="sustainability"
      className="relative min-h-screen flex items-center py-28 px-6 lg:px-12"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(239,230,216,0.92) 0%, rgba(239,230,216,0.50) 65%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Split Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Anchor: Environmental Statement & Initiative Badge */}
          <div className="lg:col-span-5 text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-clay/40" />
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-clay font-medium">
                [ 06 / GLOBAL GOALS ]
              </p>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight tracking-tight mb-6">
              Technology in service of the planet.
            </h2>

            <p className="font-sans text-base sm:text-lg text-ink/75 leading-relaxed mb-8">
              PHAROVIEW was engineered not merely as a retail utility, but as a deliberate
              intervention against the multi-billion dollar environmental toll of consumer furniture returns.
            </p>

            {/* Climate Leaders Initiative Badge */}
            <div className="p-6 bg-sand-deep/60 border-l-4 border-clay border-y border-r border-clay/15">
              <p className="font-mono text-xs uppercase tracking-[0.20em] text-clay font-bold mb-1">
                CLIMATE LEADERS PROJECT
              </p>
              <p className="font-serif font-bold text-ink text-base mb-2">
                Team Pyramid X Initiative
              </p>
              <p className="font-sans text-xs text-ink/65 leading-relaxed">
                WE Applied Technology School &bull; Supported by YLF and the Ministry of Environment.
              </p>
            </div>
          </div>

          {/* Right Column: Staggered Editorial SDG Impact Cards */}
          <div className="lg:col-span-7 space-y-5">
            {sdgs.map((s) => (
              <div
                key={s.goal}
                className="p-6 sm:p-7 bg-sand-deep/45 backdrop-blur-sm border border-clay/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-clay/60 transition-all"
                style={{ borderLeftWidth: '4px', borderLeftColor: s.accent }}
              >
                <div className="max-w-md">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-wider"
                      style={{ color: s.accent }}
                    >
                      {s.goal}
                    </span>
                    <span className="text-clay/30">&bull;</span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
                      UN MANDATE
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-ink text-lg mb-2">
                    {s.name}
                  </h3>
                  <p className="font-sans text-ink/70 text-xs sm:text-sm leading-relaxed">
                    {s.detail}
                  </p>
                </div>

                <div className="sm:text-right shrink-0 sm:border-l sm:border-clay/20 sm:pl-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-clay block mb-1">
                    DELIVERABLE
                  </span>
                  <span className="font-serif font-bold text-ink text-lg sm:text-xl">
                    {s.metric}
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
