/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['GE SS', 'Roboto', 'sans-serif'],
        'arabic': ['GE SS', 'Cairo', 'sans-serif'],
        'digits': ['Digits Calibri', 'GE SS', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
