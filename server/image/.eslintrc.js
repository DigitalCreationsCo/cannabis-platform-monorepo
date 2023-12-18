require('@cd/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
	root: true,
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
	ignorePatterns: [...getDefaultIgnorePatterns()],
	extends: [
		'@cd/eslint-config/src/bases/src/bases/typescript',
		'@cd/eslint-config/src/bases/src/bases/regexp',
		'@cd/eslint-config/src/bases/src/bases/sonar',
		'@cd/eslint-config/src/bases/src/bases/jest',
		'@cd/eslint-config/src/bases/src/bases/rtl',
		// Apply prettier and disable incompatible rules
		'@cd/eslint-config/src/bases/src/bases/prettier',
	],
	rules: {
		// optional overrides per project
	},
	overrides: [
		// optional overrides per project file match
	],
};
