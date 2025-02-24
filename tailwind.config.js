/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        'dark-background':'#121212',
        'dark-text':'#ffffff',
      },
    },
  },
  plugins: [],
}



