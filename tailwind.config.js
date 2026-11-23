/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xpnd: {
          snow: '#F9F8F6',
          surface: '#F3EFEA',
          oak: '#D4C0AC',
          taupe: '#8B746B',
          carbon: '#1A1817',
          sand: '#E5D4C0',
          espresso: '#5E4B43',
          alabaster: '#DFDDDA',
          grey: '#5C5A58',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
      },
      borderRadius: {
        'apple-sm': '16px',
        'apple': '24px',
        'apple-lg': '28px',
        'apple-xl': '36px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(26, 24, 23, 0.04)',
        'elevated': '0 12px 32px -4px rgba(26, 24, 23, 0.06)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
