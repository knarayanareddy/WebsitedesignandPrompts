/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        stage: '#201e1f',
        accent: '#fc4109',
        cobalt: '#1a37c9',
      },
    },
  },
  plugins: [],
};
