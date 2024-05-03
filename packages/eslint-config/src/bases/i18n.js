module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['plugin:i18next/recommended'],
	plugins: ['i18next'],
	overrides: [
		// {
		// 	files: [],
		// 	rules: {
		// 		'i18next/no-literal-string': 'off',
		// 	},
		// },
	],
};
