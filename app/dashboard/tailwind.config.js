/** @type {import('tailwindcss').Config} */

const sharedConfig = require('@cd/ui-lib/tailwind.config.js');

module.exports = {
  ...sharedConfig,
  content: {
    relative: true,
    files: [
      ...sharedConfig.content.files,
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
  },
};
