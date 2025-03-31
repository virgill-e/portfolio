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

        'linkedin-blue': '#0A66C2',
        'discord-purple': '#5865F2',
        'github-grey': '#24292E',
        'mail-blue': '#0072C6',
        'cv-teal': '#0F766E'
      },
      fontFamily: {
        'lostar': ['Lostar', 'sans-serif'],
        'neuemontreal' : ['Neuemontreal', 'sans-serif']
      }
    },
  },
  plugins: [],
}