/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'custom-olive': '#606c37',
        'custom-forest': '#283618',
        'custom-cream': '#FEFAE0',
        'custom-amber': '#DDA15E',
        'custom-bronze': '#BC6C25',
      },
      fontFamily: {
        'lostar': ['Lostar', 'sans-serif']
      }
    },
  },
  plugins: [],
}