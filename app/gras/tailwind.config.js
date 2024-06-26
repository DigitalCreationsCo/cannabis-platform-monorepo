const sharedConfig = require('../../packages/ui-lib/tailwind.config.js');

module.exports = {
  ...sharedConfig,
  content: [
    ...sharedConfig.content,
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
};
