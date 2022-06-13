const { colors: defaultColors } = require('tailwindcss/defaultTheme');
const { accentColors } = require('./src/data/colors');

const colors = {
  ...defaultColors,
  ...{
    "white-smoke": "#F8F8F8",
    "slate": "#C0C2C9",
    "bluz": "#2eaeff",
    "pinkz": {
      "50" : "#f9e3ea",
      "100" : "#f2bfcf",
      "200" : "#ea9ab3",
      "500" : "#e27598",
      "800" : "#db507c"
    },
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