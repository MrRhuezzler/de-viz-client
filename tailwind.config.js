const { colors: defaultColors } = require('tailwindcss/defaultTheme');
const { accentColors } = require('./src/data/colors');

const colors = {
  ...defaultColors,
  ...{
    "white-smoke": "#F8F8F8",
    "slate": "#C0C2C9",
    "bluz": "#2eaeff",
    "pinkz": "#e27396",
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
      colors,
      fontFamily: {
        'mont': ['Montserrat', 'sans-serif'],
        'robo': ['"Roboto Flex"', 'sans-serif']
      }
    },
  },
  plugins: [],
}