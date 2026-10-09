/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        console: {
          bg: '#111113',
          surface: '#18181C',
          border: 'rgba(255, 255, 255, 0.08)',
          cream: '#FDE3CF',
          creamBase: '#CAA58A',
          orange: '#EC6426',
          orangeBase: '#AD4017',
          amber: '#F8A91F',
          amberBase: '#BC7512',
          forest: '#2E573A',
          forestBase: '#193A23',
          leaf: '#72AC43',
          leafBase: '#487A26',
          pink: '#E4A5CA',
          pinkBase: '#B76F9B',
          brown: '#66271B',
          brownBase: '#40150E',
          blackKey: '#252525',
          blackBase: '#101010',
        },
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1.5, 0.4, 1)',
        mechanical: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
