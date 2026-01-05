import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      colors: {
        uw: {
          black: 'var(--uw-black)',
          gold: 'var(--uw-gold)',
          dark: 'var(--uw-dark)',
          gray: 'var(--uw-gray)',
          white: 'var(--uw-white)',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
