/** @type {import('tailwindcss').Config} */

const sharedConfig = require('./tailwind.shared.config.js');

module.exports = {
	...sharedConfig,
	content: {
		relative: true,
		files: [
			...sharedConfig.content,
			'./pages/**/*.{js,ts,jsx,tsx}',
			'./components/**/*.{js,ts,jsx,tsx}',
		],
	},
};
