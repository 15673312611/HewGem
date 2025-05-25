/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 