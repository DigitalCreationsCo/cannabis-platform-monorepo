/** @type {import('tailwindcss').Config} */

const sharedConfig = require('./tailwind.shared.config.js');

module.exports = {
	...sharedConfig,
	content: {
		relative: true,
		files: [...sharedConfig.content, './src/**/*.{js,jsx,ts,tsx}'],
	},
};
