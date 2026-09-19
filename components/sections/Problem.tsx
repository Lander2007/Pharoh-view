'use client'

const problems = [
  {
    num: '01',
    title: 'Wrong Measurements',
    desc: "Furniture arrives and doesn't fit your space.",
  },
  {
    num: '02',
    title: 'Color Mismatch',
    desc: 'The color looks completely different in person.',
  },
  {
    num: '03',
    title: 'Wasted Money',
    desc: 'Returns and restocking fees drain your budget.',
  },
  {
    num: '04',
    title: 'Time Lost',
    desc: 'Weeks of waiting for exchanges or replacements.',
  },
]

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative min-h-screen flex items-center py-28 px-6 lg:px-12"
    >
      {/* Soft asymmetric backdrop to preserve text legibility over 3D chair layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 75% at 25% 50%, rgba(239,230,216,0.94) 0%, rgba(239,230,216,0.60) 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left-Aligned Problem List Block */}
        <div className="lg:col-span-8 max-w-3xl text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-clay/40" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-clay font-medium">
              [ 02 / PROBLEM DEFINITION ]
            </p>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight tracking-tight mb-4">
            The friction in home furnishing.
          </h2>

          <p className="font-sans text-lg sm:text-xl text-clay font-medium leading-relaxed max-w-2xl mb-12">
            &ldquo;Shoppers struggle with wrong sizes, mismatched colors, and costly returns.&rdquo;
          </p>

          {/* Left-Aligned Numbered List with Dividers */}
          <div className="border-t border-clay/25 divide-y divide-clay/20">
            {problems.map((p) => (
              <div
                key={p.num}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group"
              >
                <span className="font-mono text-xs font-semibold tracking-widest text-gold shrink-0 w-8">
                  {p.num}
                </span>
                <h3 className="font-serif font-bold text-ink text-lg sm:text-xl w-60 shrink-0">
                  {p.title}
                </h3>
                <p className="font-sans text-ink/75 text-sm sm:text-base leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Environmental Impact Stat Block */}
          <div className="mt-12 p-6 sm:p-8 bg-sand-deep/60 backdrop-blur-sm border-l-4 border-clay border-y border-r border-clay/15">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="shrink-0">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-clay tracking-tight">
                  +25% to 30%
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.20em] text-ink/60 font-semibold mt-1">
                  Carbon Footprint Increase
                </p>
              </div>
              <div className="sm:border-l sm:border-clay/20 sm:pl-8">
                <p className="font-sans text-sm text-ink/80 leading-relaxed">
                  Each product return adds logistics overhead and contributes to thousands of tons
                  of avoidable carbon emissions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area for 3D Chair perspective */}
        <div className="hidden lg:block lg:col-span-4" />
      </div>
    </section>
  )
}
