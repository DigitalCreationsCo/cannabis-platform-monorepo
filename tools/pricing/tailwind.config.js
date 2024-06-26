const sharedConfig = require('../../packages/ui-lib/tailwind.config.js');

module.exports = {
  ...sharedConfig,
  content: [
    ...sharedConfig.content,
	'./src/**/*.{js,jsx,ts,tsx}',
  ],
};