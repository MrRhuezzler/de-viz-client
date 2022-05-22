const { colors: defaultColors } = require('tailwindcss/defaultTheme');
const { accentColors } = require('./src/data/colors');

const colors = {
  ...defaultColors,
  ...{
    "white-smoke": "#F8F8F8"
  },
  ...accentColors
}

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors
    },
  },
  plugins: [],
}