/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      backgroundImage : {
        'hero-pattern': 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url("/src/background.jpg")'
      },
    },
  },
  plugins: [],
}

