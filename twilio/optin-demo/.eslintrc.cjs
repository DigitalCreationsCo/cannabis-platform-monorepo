require('@cd/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
	root: true,
	ignorePatterns: [...getDefaultIgnorePatterns(), 'test'],
	extends: [
		'@cd/eslint-config/src/bases/regexp',
		'@cd/eslint-config/src/bases/jest',
		'@cd/eslint-config/src/bases/rtl',
		// Apply prettier and disable incompatible rules
		'@cd/eslint-config/src/bases/prettier-plugin',
	],
	rules: {
		// optional overrides per project
	},
	overrides: [
		// optional overrides per project file match
	],
};
