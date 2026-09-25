import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#F4F1EB',
          100: '#F4F1EB',
          200: '#E9E5DD',
          300: '#B5ADA0',
          400: '#77736C',
          500: '#171715',
        },
        ink: '#171715',
        clay: '#B5ADA0',
        paper: '#FFFFFF',
        line: 'rgba(23, 23, 21, 0.12)',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7.2vw, 7.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 5.4vw, 5.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.6vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.4rem, 2.2vw, 2.25rem)', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        micro: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
      },
      borderRadius: {
        soft: '2px',
        tile: '6px',
      },
      opacity: {
        8: '0.08',
        12: '0.12',
        15: '0.15',
        18: '0.18',
        22: '0.22',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
      },
      maxWidth: {
        shell: '1680px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
