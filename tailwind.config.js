import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindAnimate from 'tailwindcss-animate';
import twDefaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        inter: ['Inter', ...twDefaultTheme.fontFamily.sans],
        'jetbrains-mono': ['"Jetbrains Mono"', twDefaultTheme.fontFamily.mono],
        'space-grotesk': ['"Space Grotesk"', twDefaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindAnimate, tailwindScrollbar({ nocompatible: true })],
};
