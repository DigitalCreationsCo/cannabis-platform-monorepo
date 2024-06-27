/** @type {import('tailwindcss').Config} */

const sharedConfig = require('@cd/ui-lib/tailwind.config.js');

module.exports = {
  ...sharedConfig,
  content: {
    relative: true,
    files: [
      ...sharedConfig.content.files,
      './src/**/*.{js,jsx,ts,tsx}',
    ],
  }
};