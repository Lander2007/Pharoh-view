import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: '#F5EEE6',
        'sand-deep': '#EFE6D8',
        'sand-light': '#FAF5EE',
        ink: '#1C1917',
        'ink-muted': '#57534E',
        'ink-light': '#78716C',
        'ink-faint': 'rgba(28, 25, 23, 0.45)',
        gold: '#C89D54',
        'gold-light': '#D4AF37',
        'gold-muted': 'rgba(200, 157, 84, 0.35)',
        terracotta: '#D4A373',
        clay: '#BFA88F',
        espresso: '#1C1917',

        // Backwards compatibility mappings
        'dark-void': '#1C1917',
        'dark-brown': '#292524',
        'dark-brown-deep': '#1C1917',
        'pharo-gold': '#C89D54',
        'tech-cyan': '#C89D54', // Replaced blue neon with warm architectural gold
        'warm-cream': '#F5EEE6',
        'muted-tan': '#BFA88F',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Space Mono', 'SF Mono', 'monospace'],
      },
      boxShadow: {
        architectural: '0 20px 40px -15px rgba(28, 25, 23, 0.08)',
        'architectural-gold': '0 20px 50px -15px rgba(200, 157, 84, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
