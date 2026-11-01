'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export type Language = 'en' | 'ar'
export type Direction = 'ltr' | 'rtl'

export const translations = {
  en: {
    common: {
      soundOn: 'SOUND ON',
      soundOff: 'SOUND OFF',
      scrollToExplore: 'SCROLL TO EXPLORE',
      exitInspect: 'Exit Inspect Mode',
      alxEgypt: 'ALX // EGY',
      online: 'ONLINE',
      fpsLocked: '60 FPS LOCKED',
      sustainable: 'Sustainable',
      secure: 'Secure',
      fast: 'Fast',
      trueScale: 'TRUE SCALE: 1:1 // W:820 • D:840 • H:780mm',
      tolerance: 'TOLERANCE: ±1.8mm',
      orbitHint: 'CLICK & DRAG TO ORBIT 360°',
      xrayWireframe: 'DUAL-LAYER CHARCOAL WIREFRAME + X-RAY',
      activeGeometry: 'INSPECT 3D GEOMETRY // ACTIVE',
      archDimensions: 'ARCHITECTURAL DIMENSIONS',
      dimWidth: 'Width: 820mm',
      dimDepth: 'Depth: 840mm',
      dimHeight: 'Height: 780mm',
      oneToOneScale: '1:1 SCALE',
    },
    preloader: {
      initializing: 'INITIALIZING AR SPATIAL ENGINE',
      calibrating: "CALIBRATING LIDAR DEPTH SENSORS // 31°12'N 29°55'E",
      compiling: 'COMPILING PBR FACET SHADERS // CONTIGUOUS MESH',
      locking: 'LOCKING MILLIMETER PROJECTION MATRIX',
      online: 'SYSTEM ONLINE // CERTAINTY VERIFIED',
      loading3d: 'LOADING 3D GEOMETRY',
    },
    nav: {
      brand: 'PHAROVIEW',
      edition: 'SPATIAL AR',
      problem: 'Problem',
      features: 'Features',
      process: 'Process',
      impact: 'Impact',
      model3d: '3D MODEL',
      getApp: 'GET APP',
      langToggle: 'AR / عربي',
      langCode: 'ar' as Language,
    },
    hero: {
      eyebrow: '[ 01 / AR SPATIAL SCANNER ]',
      headlinePart1: 'Before you pay—',
      headlinePart2: 'see it in your home.',
      body: 'PHAROVIEW combines real-time LiDAR mesh mapping with physics-based PBR materials to place true-to-scale furniture in your home before you pay. Millimeter accuracy. Absolute spatial certainty.',
      lidarMapping: 'LiDAR Mapping',
      millimeterScale: 'Millimeter Scale',
      zeroReturns: 'Zero Returns',
      downloadIos: 'DOWNLOAD FOR IOS',
      downloadAndroid: 'ANDROID',
      inspect3d: '[ + ] INSPECT 3D GEOMETRY',
      orbit360: '✦ 360° ORBIT',
      materialsTitle: 'FINISH SELECTOR',
      swatchWalnut: 'Smoked Walnut',
      swatchBoucle: 'Warm Bouclé',
      swatchOak: 'Natural Oak',
      marquee: 'SPATIAL CERTAINTY • LIDAR MAPPING • MILLIMETER SCALE • ZERO RETURNS • PHAROVIEW AR • TRUE TO SCALE',
    },
    cinematic: {
      chapter1: {
        eyebrow: '— [ 01 / THE EMPTY SPACE ]',
        eyebrowEmpty: '— [ 01 / THE EMPTY SPACE ]',
        eyebrowStaging: '— [ 01 / AR STAGING IN PROGRESS ]',
        eyebrowFurnished: '— [ 01 / SPACE FURNISHED ]',
        headline1: 'Your space.',
        headline2: 'Your vision.',
        headline3: 'Before you buy.',
        subtitle: 'Experience furniture in your actual space, with spatial precision and augmented reality.',
        exploreCta: 'EXPLORE PHAROVIEW',
        discoverCta: 'DISCOVER HOW IT WORKS',
        scrollHint: 'SCROLL TO EXPLORE THE SPACE',
        scrollToFurnish: 'SCROLL TO FURNISH THIS SPACE',
        spaceFullyFurnished: 'SPACE FULLY FURNISHED',
        zeroClearanceBadge: '[ ✓ ZERO CLEARANCE CONFLICTS // READY TO ORDER ]',
        staged: 'STAGED',
      },
      chapter2: {
        eyebrow: '— [ 02 / THE SPATIAL SCAN ]',
        heading: 'Your room. Digitally understood.',
        description: 'Real-time LiDAR point-cloud projection sweeps 4,096 coordinate anchors across your floor plane and walls, locking room boundaries and natural light vectors within milliseconds.',
        tag1: 'FLOOR PLANE // LOCKED',
        tag2: 'SURFACE DETECTION: 99.8%',
        tag3: 'CLEARANCE: 3,420mm',
        tag4: 'LATENCY: < 12ms',
      },
      chapter3: {
        eyebrow: '— [ 03 / THE ARRIVAL ]',
        heading: 'See it before it becomes yours.',
        description: 'The moment of true spatial clarity. Furniture geometry enters and settles onto your floor plane at exact 1:1 architectural scale. Verified against doorways, adjacent walls, and circulation paths.',
        badge1: '1:1 ARCHITECTURAL SCALE',
        badge2: 'PHYSICALLY BASED SHADOW',
        badge3: 'DOORWAY COLLISION: ZERO',
      },
      chapter4: {
        eyebrow: '— [ 04 / THE TRANSFORMATION ]',
        heading: 'From empty space to a clearer vision.',
        description: 'Witness the room transform from an empty floor into a fully realized contemporary living environment. True spatial harmony under natural daylight.',
        caption: 'FULL INTERIOR COHESION // SPATIAL CERTAINTY',
      },
      chapter5: {
        eyebrow: '— [ 05 / TECHNOLOGY & MATERIAL LAB ]',
        heading: 'The Material & Precision Lab.',
        description: 'Inspect physical anisotropic sheen, microscopic roughness, and structural integrity under authentic room illumination.',
        orbitHint: 'CLICK & DRAG TO ORBIT 360°',
      },
      chapter6: {
        eyebrow: '— [ 06 / THE IMPACT ]',
        heading: 'Certainty replacing guesswork.',
        description: 'Eliminating the friction of physical furniture acquisition through millimeter spatial accuracy.',
      },
      chapter7: {
        eyebrow: '— [ 07 / THE ROADMAP & AR EXPERIENCE ]',
        heading: 'See your space differently.',
        description: 'Download PHAROVIEW today for iOS and Android. Transform any product photo into an interactive 3D spatial model.',
      },
    },
    problem: {
      eyebrow: '[ 02 / PROBLEM DEFINITION ]',
      heading: 'The friction in home furnishing.',
      quote: '“Shoppers struggle with wrong sizes, mismatched colors, and costly returns.”',
      quoteWords: ['“Shoppers', 'struggle', 'with', 'wrong', 'sizes,', 'mismatched', 'colors,', 'and', 'costly', 'returns.”'],
      rows: [
        {
          num: '01',
          title: 'Wrong Measurements',
          desc: 'Furniture arrives and fails to clear living room doorways or overpowers tight floorplans.',
          tag: 'DIMENSION CONFLICT',
          spec: 'Delta: +84mm Width Exceeded',
          line1: 'DOOR CLEARANCE: 780mm',
          line2: 'FAIL [-60mm]',
          box: 'SOFA BOUNDING BOX: 840mm',
          note: 'COLLISION DETECTED AT THRESHOLD',
        },
        {
          num: '02',
          title: 'Color Mismatch',
          desc: 'Showroom spotlights wash out undertones; fabric looks completely mismatched in home daylight.',
          tag: 'CHROMATIC DELTA',
          spec: 'ΔE 4.8 / Illuminant D65 vs Tungsten',
          line1: 'LIGHT ESTIMATION: 2700K',
          line2: 'WARM INCANDESCENT',
          box: 'SHOWROOM (4000K) vs HOME (2700K)',
          note: 'FABRIC SHIFT: HONEY → ESPRESSO',
        },
        {
          num: '03',
          title: 'Wasted Money',
          desc: 'Disassembly headaches, 15% to 25% restocking penalties, and freight fees drain consumer budgets.',
          tag: 'REVERSE LOGISTICS',
          spec: 'Avg. Return Penalty: $184.00 USD',
          line1: 'RESTOCKING SURCHARGE',
          line2: '-$120.00',
          box: 'REVERSE FREIGHT DIESEL: -$64.00',
          note: 'NET DEDUCTED: -$184.00 (LOST)',
        },
        {
          num: '04',
          title: 'Time Lost',
          desc: '3 to 6 weeks of waiting for courier pickups, inspections, and refund clearance cycles.',
          tag: 'LATENCY OVERHEAD',
          spec: '28 Business Days Average Cycle',
          line1: 'RETURN SUBMITTED',
          line2: 'DAY 01',
          box: 'INSPECTION & TRANSIT CYCLE',
          note: 'DELAYED HABITATION RECOVERY',
        },
      ],
      simulate: 'SIMULATE →',
      carbonTitle: 'Carbon Footprint Increase',
      carbonDesc: 'Each product return adds reverse logistics overhead, packaging landfills, and contributes to thousands of tons of avoidable diesel freight emissions.',
    },
    solution: {
      eyebrow: '[ 03 / TECHNICAL SPECIFICATIONS ]',
      heading: 'Precision AR, built for furniture.',
      subtitle: 'Six dedicated spatial engines operating simultaneously to deliver true millimeter-accurate virtual staging in real rooms. Hover any card to test live 3D response.',
      activeEngine: 'ACTIVE ENGINE',
      online: '• ONLINE',
      triggerHover: 'TRIGGER: HOVER',
      liveLink: '• LIVE LINK',
      materials: {
        oak: 'Sand Oak',
        boucle: 'Bouclé',
        walnut: 'Walnut',
      },
      engines: [
        {
          code: 'SYS.01',
          label: 'Plane Detection & LiDAR Meshing',
          desc: 'Accurately maps floors, walls, and obstacle clearances using real-time LiDAR and ARCore/ARKit geometry scanning at 60fps.',
          telemetryHeader: 'LIDAR DEPTH MATRIX // LIVE TELEMETRY',
          pointsLabel: 'SURFACE POINTS',
          confidenceLabel: 'DEPTH CONFIDENCE',
          latencyLabel: 'RAYCAST LATENCY',
          lockStatus: 'COORDINATE LOCK: ACTIVE',
          hoverPrompt: 'HOVER TO ENGAGE 3D GRID',
        },
        {
          code: 'SYS.02',
          label: 'Real-time 360° Rotation',
          desc: 'Spin, orbit, and pitch furniture in full 3D space with single-finger physics-smoothed gesture interpolation.',
        },
        {
          code: 'SYS.03',
          label: 'PBR Material Customization',
          desc: 'Swap woods, bouclé linens, and leather finishes in real time with physically accurate roughness and anisotropic sheen.',
        },
        {
          code: 'SYS.04',
          label: 'Model Swapping',
          desc: 'Toggle sectional configurations, arm heights, and scale variants without leaving your room view.',
        },
        {
          code: 'SYS.05',
          label: 'Millimeter Bounding Box',
          desc: 'Overlay precision dimension callouts and doorway clearance brackets verified against architectural floorplans.',
        },
        {
          code: 'SYS.06',
          label: 'Dynamic Light Simulation',
          desc: 'Physically based contact shadows and spherical harmonic irradiance matching ambient room illumination.',
        },
      ],
    },
    process: {
      eyebrow: '[ 04 / PINNED ARCHITECTURAL PROCESS ]',
      heading: 'Four stations from doubt to decision.',
      subtitle: 'A continuous scroll-choreographed workflow synchronizing the 3D spatial model in real time.',
      steps: [
        {
          step: 'STEP_01',
          action: '[ INITIALIZE ]',
          station: 'STATION 01 // LIDAR MESH',
          title: 'Scan the Surface',
          desc: 'Point your camera towards the floor plane. The LiDAR spatial engine sweeps a 4,096-point mesh matrix across room surfaces, identifying floor boundaries and lighting anchors within milliseconds.',
          features: ['LiDAR Surface Meshing', 'Normal Alignment', 'Ambient Lux Reading'],
        },
        {
          step: 'STEP_02',
          action: '[ SELECT ]',
          station: 'STATION 02 // WIREFRAME LOCK',
          title: 'Select Model',
          desc: 'Select certified architectural furniture geometry from the catalog. The chair locks into position as a translucent crystalline wireframe, verifying scale against adjacent walls and doorways.',
          features: ['1:1 Dimension Indexing', 'True Bounding Volumes', 'Sub-Centimeter Anchoring'],
        },
        {
          step: 'STEP_03',
          action: '[ TRANSFORM ]',
          station: 'STATION 03 // PBR MATERIALIZE',
          title: 'Place & Customize',
          desc: 'Rotate 360°, inspect shadow contact falloff, and cycle materials from Nordic Sand Oak to Warm Textured Bouclé and Smoked Walnut in real time under your room’s exact light temperature.',
          features: ['PBR Anisotropic Sheen', 'Dynamic Contact Shadows', 'Real-Time Swatches'],
        },
        {
          step: 'STEP_04',
          action: '[ COMMIT ]',
          station: 'STATION 04 // ZERO COMPROMISE',
          title: 'Order Confidently',
          desc: 'Verify final millimeter clearances with holographic dimension overlays. Share AR capture renders with family and proceed to checkout with zero doubt and zero returns.',
          features: ['Millimeter Clearance Pass', 'No Restocking Risk', 'Direct Cart Handshake'],
        },
      ],
    },
    valueProp: {
      eyebrow: '[ 05 / VERIFIED IMPACT ]',
      heading: 'Real impact, measured.',
      subtitle: 'Quantifiable spatial certainty that protects retail margins, streamlines fulfillment, and eliminates consumer doubt.',
      primaryBadge: 'PRIMARY BENCHMARK',
      primaryTitle: 'Buyer Confidence Verified',
      primaryDesc: 'of verified consumers reported zero hesitation at final checkout after verifying furniture dimensions and scale in AR.',
      histogramTitle: 'CONFIDENCE METRIC HISTOGRAM',
      histogramUsers: 'N = 12,480 USERS',
      systemVerified: '• SYSTEM VERIFIED',
      secondaryCards: [
        {
          code: 'METRIC 02',
          value: '3×',
          label: 'Faster Decision Cycle',
          desc: 'Reduction in days spent deliberating compared to showroom and tape-measure cycles.',
        },
        {
          code: 'METRIC 03',
          value: '↓67%',
          label: 'Return Rate Reduction',
          desc: 'Drop in post-delivery returns caused by scale surprises and doorway clearance conflicts.',
        },
        {
          code: 'METRIC 04',
          value: '±2cm',
          label: 'Placement Accuracy',
          desc: 'LiDAR spatial bounding anchor precision across standard living room floorplans.',
        },
        {
          code: 'METRIC 05',
          value: '∞',
          label: 'Material Combinations',
          desc: 'Instant real-time shader evaluations of woods, bouclés, leathers, and metal finishes.',
        },
      ],
    },
    sdgs: {
      eyebrow: '[ 06 / GLOBAL GOALS ]',
      heading: 'Technology in service of the planet.',
      description: 'PHAROVIEW was engineered not merely as a retail utility, but as a deliberate intervention against the multi-billion dollar environmental toll of consumer furniture returns.',
      climateInitiative: 'CLIMATE LEADERS PROJECT',
      teamPyramid: 'Team Pyramid X Initiative',
      schoolCredit: 'WE Applied Technology School • In Partnership with the Ministry of Environment.',
      deliverable: 'DELIVERABLE',
      cards: [
        {
          goal: 'GOAL 12 — UN MANDATE',
          title: 'Responsible Consumption and Production',
          desc: 'Eliminating false-expectation purchases cuts packaging waste, reverse freight, and unrecyclable packing foams at the origin.',
          metric: '67% Fewer Returns',
          color: '#C89D54',
        },
        {
          goal: 'GOAL 11 — UN MANDATE',
          title: 'Sustainable Cities and Communities',
          desc: 'Preventing misplaced large furniture purchases diverts thousands of tons of bulky wood and foam scrap from municipal waste streams.',
          metric: 'Zero Bulk Landfill',
          color: '#D4A373',
        },
        {
          goal: 'GOAL 09 — UN MANDATE',
          title: 'Industry, Innovation and Infrastructure',
          desc: 'Transforming legacy physical showrooms into distributed AR staging environments, lowering commercial building energy overheads.',
          metric: 'Spatial Commerce',
          color: '#4CC9F0',
        },
        {
          goal: 'GOAL 13 — UN MANDATE',
          title: 'Climate Action',
          desc: 'Direct logistics abatement by removing unnecessary multi-stage diesel freight trips between distribution hubs and living rooms.',
          metric: 'Avoided Carbon Tonnage',
          color: '#8A5E24',
        },
      ],
    },
    futurePlan: {
      eyebrow: '[ 06 / FUTURE ROADMAP ]',
      heading: 'From 2D Image to Immersive 3D Spatial AR.',
      subtitle: 'Transform standard 2D product photos into interactive 3D spatial models and experience them in your room instantly.',
      steps: [
        {
          num: '01',
          step: 'STEP 01',
          title: 'Upload Product Photo',
          desc: 'Snap or upload any flat 2D furniture image from your catalog or phone gallery.',
          tag: 'IMAGE INGESTION',
          detail: 'Multi-angle neural depth estimation',
        },
        {
          num: '02',
          step: 'STEP 02',
          title: 'AI 3D Conversion',
          desc: 'Proprietary AI neural radiance reconstruction converts flat pixels into a true-to-scale 3D mesh with PBR materials.',
          tag: 'NEURAL MESH RECONSTRUCTION',
          detail: 'Contiguous polygonal topology + texture baking',
        },
        {
          num: '03',
          step: 'STEP 03',
          title: 'Spatial AR Display',
          desc: 'Project the synthesized 3D model into your living space at true 1:1 architectural scale via LiDAR spatial tracking.',
          tag: 'TRUE-SCALE AR ANCHOR',
          detail: 'Millimeter spatial lock • 60 FPS verified',
        },
      ],
      aiBadge: 'POWERED BY AI SPATIAL SYNTHESIS',
      comingSoon: 'COMING SOON IN V2.0',
    },
    cta: {
      eyebrow: '[ 07 / GET STARTED ]',
      headingPart1: 'Ready to furnish with',
      headingPart2: 'absolute certainty?',
      subtitle: 'Join thousands of homeowners and architects making zero-compromise furniture decisions with true spatial AR.',
      downloadIos: 'DOWNLOAD FOR IOS',
      downloadAndroid: 'DOWNLOAD FOR ANDROID',
    },
    footer: {
      tagline: 'AR-powered spatial certainty for smarter furniture decisions.',
      quote: '“Ancient architectural wisdom, future spatial vision.”',
      location: 'Alexandria, Egypt',
      navTitle: 'Architecture',
      navLinks: ['LiDAR Mesh', 'PBR Optics', 'Coordinate Lock', 'SDG Verification'],
      projectTitle: 'Project',
      projectLinks: ['Team Pyramid X', 'Climate Leaders', 'WE School', 'Ministry of Environment'],
      initiativeBadge: 'Team Pyramid X — Climate Leaders Project',
      founders: 'Ali Mohamed Ali Hassan & Adel Mohamed Mohamed',
      schoolAffiliation: 'WE Applied Technology School • In Partnership with the Ministry of Environment',
      copyright: '© 2026 PHAROVIEW. All rights reserved. Built for Climate Leaders.',
    },
  },

  ar: {
    common: {
      soundOn: 'تشغيل الصوت',
      soundOff: 'كتم الصوت',
      scrollToExplore: 'مرّر للاستكشاف',
      exitInspect: 'إنهاء وضع الفحص الهندسي',
      alxEgypt: 'الإسكندرية // مصر',
      online: 'متصل الآن',
      fpsLocked: 'معدل ٦٠ إطار/ثانية ثابت',
      sustainable: 'مستدام',
      secure: 'آمن',
      fast: 'سريع',
      trueScale: 'مقياس حقيقي ١:١ // العرض: ٧٤٠ • العمق: ٨١٠ • الارتفاع: ٧٩٠ مم',
      tolerance: 'نسبة التفاوت: ±١.٨ مم',
      orbitHint: 'اسحب للتدوير بزاوية ٣٦٠ درجة',
      xrayWireframe: 'شبكة هندسية كربونية مزدوجة + أشعة سينية',
      activeGeometry: 'فحص الهندسة ثلاثية الأبعاد // نشط',
      archDimensions: 'الأبعاد الهندسية المعمارية',
      dimWidth: 'العرض: ٨٢٠ مم',
      dimDepth: 'العمق: ٨٤٠ مم',
      dimHeight: 'الارتفاع: ٧٨٠ مم',
      oneToOneScale: 'مقياس حقيقي ١:١',
    },
    preloader: {
      initializing: 'جاري تهيئة محرك الواقع المعزز المكاني',
      calibrating: "معايرة حساسات عمق LiDAR // ٣١°١٢'ش ٢٩°٥٥'ق",
      compiling: 'معالجة خامات PBR الفيزيائية // شبكة متصلة',
      locking: 'تثبيت مصفوفة الإسقاط بالمليمتر',
      online: 'النظام متصل // تم التحقق من اليقين المكاني',
      loading3d: 'جاري تحميل المجسمات ثلاثية الأبعاد',
    },
    nav: {
      brand: 'فارو فيو',
      edition: 'النسخة المكانية المعززة',
      problem: 'المشكلة',
      features: 'المميزات',
      process: 'آلية العمل',
      impact: 'الأثر الفعلي',
      model3d: 'المجسم 3D',
      getApp: 'حمّل التطبيق',
      langToggle: 'EN / English',
      langCode: 'en' as Language,
    },
    hero: {
      eyebrow: '[ ٠١ / الماسح المكاني بالواقع المعزز ]',
      headlinePart1: 'قبل أن تدفع—',
      headlinePart2: 'شاهده داخل منزلك أولاً.',
      body: 'يستخدم فارو فيو تقنية الواقع المعزز لوضع قطع الأثاث بأبعادها الحقيقية داخل مساحتك قبل الشراء. بلا مفاجآت، بلا مرتجعات، يقين مكاني تام.',
      lidarMapping: 'مسح ضوئي LiDAR',
      millimeterScale: 'دقة بالمليمتر',
      zeroReturns: 'صفر مرتجعات',
      downloadIos: 'حمل لنظام iOS',
      downloadAndroid: 'حمل لنظام Android',
      inspect3d: '[ + ] فحص الهندسة ثلاثية الأبعاد',
      orbit360: '✦ تدوير تفاعلي 360°',
      materialsTitle: 'اختيار الخامة',
      swatchWalnut: 'خشب الجوز المدخن',
      swatchBoucle: 'صوف البوكليه الدافئ',
      swatchOak: 'خشب البلوط الطبيعي',
      marquee: 'يقين مكاني تام • مسح ضوئي ليدار • دقة بالمليمتر • صفر مرتجعات • فارو فيو للواقع المعزز • أبعاد حقيقية مطابقة',
    },
    cinematic: {
      chapter1: {
        eyebrow: '— [ ٠١ / الفراغ المعماري ]',
        eyebrowEmpty: '— [ ٠١ / الفراغ المعماري ]',
        eyebrowStaging: '— [ ٠١ / جاري التموضع المكاني بالواقع المعزز ]',
        eyebrowFurnished: '— [ ٠١ / تم تأثيث الفراغ بالكامل ]',
        headline1: 'مساحتك الحقيقية.',
        headline2: 'رؤيتك المكانية.',
        headline3: 'قبل أن تشتري.',
        subtitle: 'شاهد الأثاث داخل فراغك الفعلي بأبعاد حقيقية مطابقة، دقة مليمترية، وتقنية الواقع المعزز.',
        exploreCta: 'استكشف فارو فيو',
        discoverCta: 'تعرف على آلية العمل',
        scrollHint: 'مرر لاستكشاف الفراغ المعماري',
        scrollToFurnish: 'مرر لتأثيث هذا الفراغ بالواقع المعزز',
        spaceFullyFurnished: 'تم تأثيث الفراغ بالكامل',
        zeroClearanceBadge: '[ ✓ فحص الخلوص مطابق بالمليمتر // جاهز للطلب ]',
        staged: 'مكتمل',
      },
      chapter2: {
        eyebrow: '— [ ٠٢ / المسح المكاني ]',
        heading: 'غرفتك. مفهومة رقمياً بالكامل.',
        description: 'مسح سحابي فوري بتقنية LiDAR يوزع ٤,٠٩٦ نقطة إحداثية عبر أرضية وجدران غرفتك، ليحدد أبعاد الفراغ ومسارات الضوء الطبيعي في أجزاء من الثانية.',
        tag1: 'مستوى الأرضية // مقفل بدقة',
        tag2: 'دقة رصد الأسطح: ٩٩.٨٪',
        tag3: 'أقصى مساحة فراغ: ٣,٤٢٠ مم',
        tag4: 'زمن استجابة المسح: أقل من ١٢ مللي ثانية',
      },
      chapter3: {
        eyebrow: '— [ ٠٣ / لحظة الوصول والتموضع ]',
        heading: 'شاهده واقعياً قبل أن تدفع قرشاً واحداً.',
        description: 'لحظة اليقين المكاني التام. يهبط المجسم ويتموضع على أرضية غرفتك بمقياس معماري حقيقي ١:١، مع التحقق الدقيق من توافقه مع الأبواب والجدران المحيطة.',
        badge1: 'مقياس معماري حقيقي ١:١',
        badge2: 'ظلال فيزيائية مطابقة لضوء الغرفة',
        badge3: 'احتكاك بالمداخل: صفر',
      },
      chapter4: {
        eyebrow: '— [ ٠٤ / التحول المكاني المتكامل ]',
        heading: 'من فراغ مجرد إلى رؤية حية متكاملة.',
        description: 'تتراجع الكاميرا لتشهد تحول الغرفة من أرضية فارغة إلى فضاء معيشي راقٍ ومتناغم بالكامل مع السجادة والقطع المكملة تحت ضوء النهار الطبيعي.',
        caption: 'تناغم مكاني شامل // يقين قبل الشراء',
      },
      chapter5: {
        eyebrow: '— [ ٠٥ / مختبر الخامات والدقة الهندسية ]',
        heading: 'مختبر الخامات والفحص الهندسي.',
        description: 'افحص لمعان الخامات، ملمس الأقمشة المجهري، وجودة التركيب تحت إضاءة غرفتك الواقعية.',
        orbitHint: 'انقر واسحب للتدوير التفاعلي ٣٦٠°',
      },
      chapter6: {
        eyebrow: '— [ ٠٦ / الأثر والجدوى الفعلية ]',
        heading: 'اليقين المطلق بديلاً للتخمين.',
        description: 'القضاء التام على مشقة شراء الأثاث وإرجاعه عبر دقة مكانية حقيقية بالمليمتر.',
      },
      chapter7: {
        eyebrow: '— [ ٠٧ / خارطة المستقبل وتجربة الواقع المعزز ]',
        heading: 'انظر لمساحتك بمنظور مختلف تماماً.',
        description: 'حمّل تطبيق فارو فيو الآن لنظامي iOS و Android وحوّل أي صورة منتج إلى مجسم مكاني تفاعلي داخل منزلك.',
      },
    },
    problem: {
      eyebrow: '[ ٠٢ / تحديد المشكلة ]',
      heading: 'العقبات المعتادة في تأثيث المنزل.',
      quote: '“يعاني المتسوقون من المقاسات الخاطئة، وتضارب الألوان، وتكاليف الإرجاع الباهظة.”',
      quoteWords: ['“يعاني', 'المتسوقون', 'من', 'المقاسات', 'الخاطئة،', 'وتضارب', 'الألوان،', 'وتكاليف', 'الإرجاع', 'الباهظة.”'],
      rows: [
        {
          num: '٠١',
          title: 'مقاسات غير دقيقة',
          desc: 'يصل الأثاث لمنزلك لتكتشف أنه لا يناسب أبعاد الغرفة أو يعيق حركة الأبواب والممرات.',
          tag: 'تعارض في المقاسات',
          spec: 'الفرق: +٨٤ مم تجاوز في العرض',
          line1: 'خلوص فتحة الباب: ٧٨٠ مم',
          line2: 'غير مطابق [-٦٠ مم]',
          box: 'أبعاد الأريكة الكلية: ٨٤٠ مم',
          note: 'تم رصد اصطدام عند العتبة',
        },
        {
          num: '٠٢',
          title: 'عدم تطابق الألوان',
          desc: 'تبدو درجة اللون والخامة في الواقع مختلفة تماماً عن الصور بسبب إضاءة المعارض البراقة.',
          tag: 'اختلاف لوني',
          spec: 'فارق لوني ΔE 4.8 / إضاءة طبيعية مقابل صفراء',
          line1: 'تقدير الإضاءة: ٢٧٠٠ كلفن',
          line2: 'إضاءة دافئة',
          box: 'المعرض (٤٠٠٠ كلفن) مقابل المنزل (٢٧٠٠ كلفن)',
          note: 'تحول القماش: عسلي ← بني داكن',
        },
        {
          num: '٠٣',
          title: 'إهدار المال',
          desc: 'رسوم الشحن العكسي وإعادة التخزين التي تتراوح بين ١٥٪ إلى ٢٥٪ تستنزف ميزانيتك.',
          tag: 'أعباء الشحن العكسي',
          spec: 'متوسط غرامة الإرجاع: ١٨٤.٠٠ دولار',
          line1: 'رسوم إعادة التخزين',
          line2: '-١٢٠.٠٠$',
          box: 'وقود ديزل الشحن العكسي: -٦٤.٠٠$',
          note: 'صافي المبلغ المخصوم: -١٨٤.٠٠$ (خسارة)',
        },
        {
          num: '٠٤',
          title: 'ضياع الوقت',
          desc: 'أسابيع طويلة من الانتظار لاستبدال القطعة، وفحصها، واسترداد أموالك المدفوعة.',
          tag: 'هدر الوقت التشغيلي',
          spec: 'دورة استرجاع تستغرق ٢٨ يوم عمل',
          line1: 'تم تقديم طلب الإرجاع',
          line2: 'اليوم الأول',
          box: 'دورة الفحص والشحن العكسي',
          note: 'تأخر استقرار تأثيث المنزل',
        },
      ],
      simulate: 'محاكاة ←',
      carbonTitle: 'زيادة في البصمة الكربونية',
      carbonDesc: 'كل عملية إرجاع تضيف أعباءً لوجستية وتساهم في آلاف الأطنان من الانبعاثات الكربونية الناتجة عن شاحنات الديزل التي يمكن تجنبها.',
    },
    solution: {
      eyebrow: '[ ٠٣ / المواصفات التقنية ]',
      heading: 'واقع معزز فائق الدقة، صُمم خصيصاً للأثاث.',
      subtitle: 'ستة محركات مكانية متخصصة تعمل في آنٍ واحد لتقديم معاينة افتراضية بدقة المليمتر داخل الغرف الحقيقية. مرر المؤشر لاختبار الاستجابة التفاعلية.',
      activeEngine: 'محرك نشط',
      online: '• متصل الآن',
      triggerHover: 'التفعيل: تمرير الفأرة',
      liveLink: '• اتصال مباشر',
      materials: {
        oak: 'خشب البلوط الرملي',
        boucle: 'قماش البوكليه الدافئ',
        walnut: 'خشب الجوز المدخن',
      },
      engines: [
        {
          code: 'SYS.01',
          label: 'رصد الأسطح والأرضيات',
          desc: 'يمسح الأرضيات والجدران والأسطح بدقة متناهية باستخدام حساسات LiDAR وتقنيات ARCore/ARKit بمعدل ٦٠ إطاراً في الثانية.',
          telemetryHeader: 'مصفوفة عمق LIDAR // بث مباشر للأبعاد',
          pointsLabel: 'نقاط المسح السطحي',
          confidenceLabel: 'دقة العمق المعتمدة',
          latencyLabel: 'زمن استجابة الأشعة',
          lockStatus: 'تثبيت الإحداثيات: نشط',
          hoverPrompt: 'مرر لتفعيل الشبكة الهندسية',
        },
        {
          code: 'SYS.02',
          label: 'دوران لحظي بـ ٣٦٠ درجة',
          desc: 'قم بتدوير الأثاث وتحريكه في الفراغ ثلاثي الأبعاد بسلاسة تامة عبر إيماءات لمس أحادية فيزيائية فائقة الدقة.',
        },
        {
          code: 'SYS.03',
          label: 'تخصيص الألوان والخامات',
          desc: 'بدّل بين أنواع الأخشاب والأقمشة والجلود في الوقت الفعلي مع محاكاة فيزيائية لانعكاس وبريق الخامات الحقيقية.',
        },
        {
          code: 'SYS.04',
          label: 'التبديل الفوري للموديلات',
          desc: 'استعرض أحجاماً وتكوينات وتصميمات متعددة للقطعة دون مغادرة شاشة الكاميرا أو فقدان موضع التثبيت.',
        },
        {
          code: 'SYS.05',
          label: 'قياسات هندسية بالمليمتر',
          desc: 'إظهار خطوط القياس والأبعاد المحيطة بالقطعة للتحقق من المساحات وممرات الأبواب بدقة المخططات الهندسية.',
        },
        {
          code: 'SYS.06',
          label: 'محاكاة الإضاءة والظلال',
          desc: 'ظلال تلامس ديناميكية ومحاكاة فيزيائية لتقدير إضاءة الغرفة الفعلية وانعكاسها الدقيق على الخامات.',
        },
      ],
    },
    process: {
      eyebrow: '[ ٠٤ / خطوات الاستخدام المعمارية ]',
      heading: 'أربع محطات من الشك إلى القرار المؤكد.',
      subtitle: 'مسار عمل متزامن يحرك المجسم المكاني ثلاثي الأبعاد مباشرة أثناء التمرير.',
      steps: [
        {
          step: 'خطوة_٠١',
          action: '[ التهيئة ]',
          station: 'المحطة ٠١ // مسح شبكة LIDAR',
          title: 'امسح مساحة الغرفة',
          desc: 'افتح تطبيق فارو فيو ووجّه الكاميرا نحو الأرضية لتفعيل المسح الضوئي التلقائي للأبعاد وتحديد حدود الغرفة ومصادر الضوء خلال أجزاء من الثانية.',
          features: ['مسح الأسطح بالـ LiDAR', 'محاذاة المحاور', 'قراءة مستوى الإضاءة'],
        },
        {
          step: 'خطوة_٠٢',
          action: '[ الاختيار ]',
          station: 'المحطة ٠٢ // تثبيت الهيكل الهندسي',
          title: 'اختر قطعة الأثاث',
          desc: 'تصفح كتالوج المجسمات ثلاثية الأبعاد المعتمدة أو امسح رمز QR لتحميل القطعة بهيكلها الهندسي الدقيق داخل مساحتك للتحقق من ملاءمتها للجدران.',
          features: ['مقاييس حقيقية ١:١', 'أبعاد حجمية موثقة', 'تثبيت مكاني فائق الدقة'],
        },
        {
          step: 'خطوة_٠٣',
          action: '[ التخصيص ]',
          station: 'المحطة ٠٣ // تجسيد خامات PBR',
          title: 'ثبّت القطعة وخصّصها',
          desc: 'حرك القطعة بزاوية ٣٦٠ درجة، وافحص سقوط الظلال، واختبر تدرجات الأقمشة من البلوط الرملي إلى البوكليه والجوز المدخن تحت إضاءة غرفتك الفعلية.',
          features: ['بريق الخامات الفيزيائي', 'ظلال تلامس ديناميكية', 'عينات ألوان حية'],
        },
        {
          step: 'خطوة_٠٤',
          action: '[ الاعتماد ]',
          station: 'المحطة ٠٤ // يقين مطلق بلا تنازل',
          title: 'اطلب بثقة مطلقة',
          desc: 'تحقق من خلوص الممرات والمقاسات النهائية عبر خطوط القياس الهولوجرامية. شارك لقطات الواقع المعزز مع عائلتك وأتمم الشراء بلا أدنى تردد أو خوف من الإرجاع.',
          features: ['اجتياز اختبار الخلوص', 'أمان تام من رسوم الإرجاع', 'ربط فوري بسلة الشراء'],
        },
      ],
    },
    valueProp: {
      eyebrow: '[ ٠٥ / نتائج موثقة ]',
      heading: 'أثر حقيقي، بالأرقام.',
      subtitle: 'يقين مكاني ملموس يحمي هوامش ربح المتاجر، ويسرّع دورات الشحن، ويمنح المستهلك راحة بال تامة.',
      primaryBadge: 'المؤشر المرجعي الرئيسي',
      primaryTitle: 'ثقة المشتري المؤكدة',
      primaryDesc: 'من المستهلكين المعتمدين أكدوا عدم ترددهم إطلاقاً عند إتمام الشراء بعد التحقق من أبعاد الأثاث ومقاييسه في الواقع المعزز.',
      histogramTitle: 'رسم بياني لمؤشر ثقة المستهلك',
      histogramUsers: 'العينة = ١٢,٤٨٠ مستخدم',
      systemVerified: '• موثق تقنياً',
      secondaryCards: [
        {
          code: 'مؤشر ٠٢',
          value: '٣×',
          label: 'قرار شراء أسرع',
          desc: 'انخفاض في عدد الأيام المستغرقة لاتخاذ القرار مقارنة بزيارات المعارض التقليدية وشريط القياس.',
        },
        {
          code: 'مؤشر ٠٣',
          value: '↓٦٧٪',
          label: 'انخفاض معدل المرتجعات',
          desc: 'تراجع كبير في طلبات الإرجاع بعد الاستلام الناتجة عن مفاجآت المقاسات أو ضيق المداخل.',
        },
        {
          code: 'مؤشر ٠٤',
          value: '±٢ سم',
          label: 'دقة التثبيت المكاني',
          desc: 'دقة استشعار وتثبيت الأبعاد عبر حساسات LiDAR في مختلف مساحات الغرف القياسية.',
        },
        {
          code: 'مؤشر ٠٥',
          value: '∞',
          label: 'تشكيلات الخامات',
          desc: 'معاينة لحظية لا نهائية لتدرجات الأخشاب، أقمشة البوكليه، الجلود، والتشطيبات المعدنية.',
        },
      ],
    },
    sdgs: {
      eyebrow: '[ ٠٦ / أهداف الاستدامة العالمية ]',
      heading: 'التكنولوجيا في خدمة الكوكب.',
      description: 'لم يُصمم فارو فيو كمجرد أداة تسوق، بل كحل بيئي مبتكر للحد من الهدر الملياري والانبعاثات الناتجة عن إرجاع وشحن الأثاث حول العالم.',
      climateInitiative: 'مشروع قادة المناخ',
      teamPyramid: 'مبادرة فريق Pyramid X',
      schoolCredit: 'مدرسة WE للتكنولوجيا التطبيقية • بالشراكة مع وزارة البيئة.',
      deliverable: 'المخرج البيئي',
      cards: [
        {
          goal: 'الهدف ١٢ — الأمم المتحدة',
          title: 'الاستهلاك والإنتاج المسؤولان',
          desc: 'القضاء على المشتريات غير المطابقة للتوقعات يقلل نفايات التغليف والشحن العكسي والفوم غير القابل للتدوير من المنبع.',
          metric: 'مرتجعات أقل بنسبة ٦٧٪',
          color: '#C89D54',
        },
        {
          goal: 'الهدف ١١ — الأمم المتحدة',
          title: 'مدن ومجتمعات مستدامة',
          desc: 'منع شراء قطع الأثاث الضخمة غير المناسبة يحمي المدن من آلاف الأطنان من مخلفات الأخشاب والنفايات الضخمة.',
          metric: 'صفر نفايات أثاث ضخمة',
          color: '#D4A373',
        },
        {
          goal: 'الهدف ٠٩ — الأمم المتحدة',
          title: 'الصناعة والابتكار والهياكل الأساسية',
          desc: 'تحويل صالات العرض التقليدية إلى بيئات عرض مكانية بالواقع المعزز، مما يقلل استهلاك الطاقة في المباني التجارية.',
          metric: 'تجارة مكانية ذكية',
          color: '#4CC9F0',
        },
        {
          goal: 'الهدف ١٣ — الأمم المتحدة',
          title: 'العمل المناخي',
          desc: 'خفض الانبعاثات اللوجستية مباشرة عبر إلغاء رحلات شاحنات الديزل المتكررة غير الضرورية بين المخازن والمنازل.',
          metric: 'خفض أطنان الانبعاثات الكربونية',
          color: '#8A5E24',
        },
      ],
    },
    futurePlan: {
      eyebrow: '[ ٠٦ / خارطة المستقبل ]',
      heading: 'من صورة ثنائية الأبعاد إلى واقع معزز ثلاثي الأبعاد.',
      subtitle: 'تصور المنتج وتحويله إلى مجسم ثلاثي الأبعاد (3D Model) يعرض أمامك في غرفتك فوراً!',
      steps: [
        {
          num: '٠١',
          step: 'الخطوة الأولى',
          title: 'ارفع صورة المنتج',
          desc: 'التقط أو ارفع صورة مسطحة ثنائية الأبعاد لأي قطعة أثاث من هاتفك أو المتجر.',
          tag: 'استقبال وتحليل الصورة',
          detail: 'تقدير العمق العصبي متعدد الزوايا',
        },
        {
          num: '٠٢',
          step: 'الخطوة الثانية',
          title: 'التحويل إلى مجسم 3D',
          desc: 'خوارزميات الذكاء الاصطناعي تحول الصورة المسطحة إلى مجسم ثلاثي الأبعاد حقيقي مع خاماته الأصلية.',
          tag: 'إعادة بناء الشبكة ثلاثية الأبعاد',
          detail: 'بناء طوبولوجي متصل + معالجة الخامات الفيزيائية',
        },
        {
          num: '٠٣',
          step: 'الخطوة الثالثة',
          title: 'العرض التفاعلي أمامك',
          desc: 'إسقاط المجسم ثلاثي الأبعاد في غرفتك بمقياسه الطبيعي الحقيقي ١:١ وتجربته قبل الشراء.',
          tag: 'تثبيت مكاني بمقياس حقيقي',
          detail: 'تثبيت بالمليمتر عبر LiDAR • ٦٠ إطار/ثانية',
        },
      ],
      aiBadge: 'مدعوم بالذكاء الاصطناعي التوليدي المكاني',
      comingSoon: 'قريباً في التحديث القادم V2.0',
    },
    cta: {
      eyebrow: '[ ٠٧ / ابدأ الآن ]',
      headingPart1: 'هل أنت مستعد لتأثيث منزلك',
      headingPart2: 'بيقين تام؟',
      subtitle: 'انضم إلى آلاف أصحاب المنازل ومهندسي الديكور الذين يتخذون قرارات تأثيث دقيقة بلا تنازلات عبر الواقع المعزز.',
      downloadIos: 'حمل لنظام iOS',
      downloadAndroid: 'حمل لنظام Android',
    },
    footer: {
      tagline: 'ثقة مدعومة بالواقع المعزز لقرارات تأثيث أذكى.',
      quote: '“حكمة معمارية عريقة، رؤية مكانية مستقبلية.”',
      location: 'الإسكندرية، مصر',
      navTitle: 'الهندسة المعمارية',
      navLinks: ['مسح LiDAR', 'بصريات PBR', 'تثبيت الإحداثيات', 'أهداف الاستدامة'],
      projectTitle: 'المشروع',
      projectLinks: ['فريق Pyramid X', 'قادة المناخ', 'مدرسة WE', 'وزارة البيئة'],
      initiativeBadge: 'فريق Pyramid X — مشروع قادة المناخ',
      founders: 'علي محمد علي حسن و عادل محمد محمد',
      schoolAffiliation: 'مدرسة WE للتكنولوجيا التطبيقية • بالشراكة مع وزارة البيئة',
      copyright: '© ٢٠٢٦ فارو فيو (PHAROVIEW). جميع الحقوق محفوظة. صُمم لمبادرة قادة المناخ.',
    },
  },
} as const

export type Translations = typeof translations.en

interface LanguageContextType {
  lang: Language
  dir: Direction
  isRTL: boolean
  t: Translations
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'pharoview_preferred_lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null
      if (saved === 'en' || saved === 'ar') {
        setLang(saved)
      } else if (typeof navigator !== 'undefined' && navigator.language.startsWith('ar')) {
        setLang('ar')
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return

    const dir: Direction = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = dir

    if (lang === 'ar') {
      document.documentElement.classList.add('lang-ar')
      document.documentElement.classList.remove('lang-en')
    } else {
      document.documentElement.classList.add('lang-en')
      document.documentElement.classList.remove('lang-ar')
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {}

    // Refresh ScrollTrigger and animations on language change
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)
  }, [lang, mounted])

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  const setLanguage = (newLang: Language) => {
    setLang(newLang)
  }

  const dir: Direction = lang === 'ar' ? 'rtl' : 'ltr'
  const isRTL = lang === 'ar'
  const t = translations[lang] as unknown as Translations

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir,
        isRTL,
        t,
        toggleLanguage,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
