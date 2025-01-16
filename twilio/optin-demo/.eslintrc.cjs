require('@gras/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@gras/eslint-config/src/helpers');

module.exports = {
	root: true,
	ignorePatterns: [...getDefaultIgnorePatterns(), 'test'],
	extends: [
		'@gras/eslint-config/src/bases/regexp',
		'@gras/eslint-config/src/bases/jest',
		'@gras/eslint-config/src/bases/rtl',
		// Apply prettier and disable incompatible rules
		'@gras/eslint-config/src/bases/prettier-plugin',
	],
	rules: {
		// optional overrides per project
	},
	overrides: [
		// optional overrides per project file match
	],
};
