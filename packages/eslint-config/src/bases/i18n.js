module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['plugin:i18next/recommended'],
	rules: {
		'i18next/no-literal-string': 'off', // off for now, we need to fix this
	},
	overrides: [],
};
