import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00bb7f',
          50: '#e6fff7',
          100: '#b3ffe6',
          500: '#00bb7f',
          600: '#009966',
          700: '#00774d',
        },
        cta: {
          DEFAULT: '#ff9800',
          light: '#ffb74d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-clash)', 'var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
