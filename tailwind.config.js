/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxurious Gold Palette
        'gold': {
          '50': '#fef9f0',
          '100': '#fdf2e1',
          '200': '#fce5c3',
          '300': '#fad8a5',
          '400': '#f7cb87',
          '500': '#f4be69',
          '600': '#d4af37', // Burnished Gold
          '700': '#b8941f',
          '800': '#9c7a1a',
          '900': '#806015',
          'champagne': '#F7E7CE',
          'burnished': '#D4AF37',
          'brass': '#B8860B',
        },
        // Deep backgrounds
        'bronze': {
          '900': '#1a1410',
          '800': '#2d2420',
          '700': '#403530',
        },
        'dark': {
          'gold': '#0f0a05',
          'bronze': '#1a1410',
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F7E7CE 50%, #B8860B 100%)',
        'gold-gradient-dark': 'linear-gradient(135deg, #1a1410 0%, #2d2420 50%, #1a1410 100%)',
        'gold-gradient-text': 'linear-gradient(135deg, #F7E7CE 0%, #D4AF37 50%, #B8860B 100%)',
        'pharaonic-glow': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.3), transparent)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.5)',
        'gold-glow-xl': '0 0 60px rgba(212, 175, 55, 0.6)',
        'gold-inner': 'inset 0 0 20px rgba(212, 175, 55, 0.2)',
        'champagne-glow': '0 0 20px rgba(247, 231, 206, 0.3)',
      },
      textShadow: {
        'gold': '0 0 10px rgba(212, 175, 55, 0.5)',
        'gold-lg': '0 0 20px rgba(212, 175, 55, 0.6)',
      },
      backdropBlur: {
        'gold': 'blur(12px)',
      },
      borderColor: {
        'gold-light': 'rgba(212, 175, 55, 0.3)',
        'gold-medium': 'rgba(212, 175, 55, 0.5)',
        'gold-dark': 'rgba(212, 175, 55, 0.1)',
      },
      animation: {
        'gold-pulse': 'gold-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gold-shimmer': 'gold-shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'gold-pulse': {
          '0%, 100%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        'gold-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
