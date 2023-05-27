const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../apps/shop/**/*.{jsx,tsx}',
    '../../apps/app/**/*.{jsx,tsx}',
    '../../apps/delivery-widget/src/**/*.{jsx,tsx}',
    '../../packages/ui-lib/src/**/*.{jsx,tsx}',
    '../../packages/native-ui/src/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#14a33d',
        'primary-light': '#17c649',
        secondary: '#13622a',
        'secondary-light': '#4BBE6E',
        inverse: '#fff2da',
        'inverse-soft': '#f9f7f2',
        accent: '#a49b8a',
        'accent-soft': '#bbb5a9',

        dark: '#3e3a3a',
        'dark-soft': '#a8a8a8',

        light: '#ffffff',
        'light-soft': '#c6c0b5',

        error: '#dd1616',

        yellow: '#FFF244',
      },
    },
  },
  plugins: [],
}

