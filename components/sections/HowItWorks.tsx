'use client'

const steps = [
  {
    step: 'STEP_01',
    action: '[ INITIALIZE ]',
    title: 'Scan the Surface',
    desc: 'Launch PHAROVIEW and point your camera toward the floor to trigger automatic LiDAR surface meshing.',
  },
  {
    step: 'STEP_02',
    action: '[ SELECT ]',
    title: 'Select Model',
    desc: 'Browse certified 3D furniture models or scan a showroom QR tag to pull true-to-scale geometry into your room.',
  },
  {
    step: 'STEP_03',
    action: '[ TRANSFORM ]',
    title: 'Place & Customize',
    desc: 'Drag, orbit 360°, inspect shadow falloff, test fabric colorways, and overlay precision clearance guides.',
  },
  {
    step: 'STEP_04',
    action: '[ COMMIT ]',
    title: 'Order Confidently',
    desc: 'Share AR screenshots for family consensus or proceed directly to checkout knowing the fit is absolute.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative min-h-screen flex items-center py-28 px-6 lg:px-12"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(239,230,216,0.92) 0%, rgba(239,230,216,0.50) 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-clay/40" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-clay font-medium">
              [ 04 / USER WORKFLOW ]
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight tracking-tight mb-4">
            Four steps from doubt to decision.
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink/70 leading-relaxed">
            A frictionless path designed to eliminate the anxiety of ordering large-scale home pieces.
          </p>
        </div>

        {/* Step Cards with Editorial Pipeline Layout (NO circle bullets) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="relative p-7 bg-sand-deep/45 backdrop-blur-sm border-t-2 border-t-clay border-x border-b border-clay/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.20em] mb-6">
                  <span className="font-bold text-clay">{s.step}</span>
                  <span className="text-gold font-semibold">{s.action}</span>
                </div>

                <div className="mb-4">
                  <span className="font-mono text-3xl font-bold text-ink/25 block mb-1">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-ink text-xl">
                    {s.title}
                  </h3>
                </div>

                <p className="font-sans text-ink/70 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-clay/15 flex items-center gap-2">
                <div className="h-1 flex-1 bg-clay/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full"
                    style={{ width: `${(idx + 1) * 25}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-clay/70">{(idx + 1) * 25}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
