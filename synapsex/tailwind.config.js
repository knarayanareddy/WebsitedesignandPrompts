/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Every Tailwind family resolves to the primary product font.
        sans: ['"Space Mono"', 'monospace'],
        serif: ['"Space Mono"', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Anton SC"', '"Space Mono"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
