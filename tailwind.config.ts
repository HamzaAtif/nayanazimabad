import type { Config } from 'tailwindcss';

/**
 * Brand palette: warm sand + Karachi sky blue + deep teal ink.
 * Contrast pairs used for body text pass WCAG AA (>= 4.5:1):
 *  - ink (#0f2b2e) on sand (#f6f1e7) = 12.6:1
 *  - ink on white  = 14.4:1
 *  - white on teal (#0f5c5c) = 6.6:1
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfbf6',
          100: '#f6f1e7',
          200: '#e9e0cd',
          300: '#d8c9ab',
          400: '#c2ac86',
        },
        teal: {
          50: '#eef7f6',
          100: '#d3ebe8',
          200: '#a6d7d1',
          400: '#2f8f88',
          600: '#0f5c5c',
          700: '#0c4a4a',
          900: '#052b2b',
        },
        ink: {
          DEFAULT: '#0f2b2e',
          soft: '#3d5a5d',
        },
        gold: {
          400: '#d9a94b',
          500: '#c08a2e',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 43, 46, 0.06), 0 12px 32px -12px rgba(15, 43, 46, 0.28)',
        panel: '0 24px 60px -20px rgba(5, 43, 43, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
