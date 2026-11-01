'use client'

import MagneticButton from '@/components/common/MagneticButton'
import CurtainWipeTransition from '@/components/common/CurtainWipeTransition'
import { useLanguage } from '@/lib/i18n'

export default function CTA() {
  const { t } = useLanguage()

  return (
    <>
      <section
        id="cta"
        className="relative z-[10] min-h-[60vh] flex items-center justify-center py-24 px-6 lg:px-12 bg-transparent"
      >
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#C89D54]" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] rtl:tracking-normal text-[#C89D54] font-semibold">
              {t.cta.eyebrow}
            </p>
            <span className="w-8 h-px bg-[#C89D54]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] leading-[1.08] tracking-tight rtl:tracking-normal mb-6">
            <span>{t.cta.headingPart1}</span>
            <br />
            <span className="font-serif font-normal italic rtl:not-italic text-[#C89D54]">
              {t.cta.headingPart2}
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#57534E] mb-10 max-w-xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <MagneticButton
              href="#"
              label={t.cta.downloadIos}
              variant="primary"
              className="!rounded-[2px] !px-8 !py-4 shadow-architectural"
              icon={
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              }
            />

            <MagneticButton
              href="/pharoview.apk"
              download="PharoView-AR.apk"
              label={t.cta.downloadAndroid}
              variant="secondary"
              className="!rounded-[2px] !px-8 !py-4 border-[#1C1917]/30 !text-[#1C1917] hover:border-[#C89D54]"
              icon={
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M3.18 23.76c.33.18.72.2 1.08.04l12.2-6.93-2.51-2.51-10.77 9.4zm-.96-20.49c-.14.25-.22.55-.22.88v19.7c0 .33.08.63.22.88l.08.07L13.5 12.5v-.25L2.3 3.2l-.08.07zM20.6 10.3l-2.46-1.4-2.77 2.77 2.77 2.77 2.49-1.42c.71-.4.71-1.06-.03-1.72zM4.26.22L16.46 7.17l-2.51 2.51L3.18.27c.36-.16.75-.14 1.08-.05z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Section Curtain Wipe Transition before Footer */}
      <CurtainWipeTransition />
    </>
  )
}
