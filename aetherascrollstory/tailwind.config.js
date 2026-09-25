/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        muted: '#6F6F6F',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
