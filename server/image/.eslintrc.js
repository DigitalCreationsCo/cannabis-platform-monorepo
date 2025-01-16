require('@gras/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@gras/eslint-config/src/helpers');

module.exports = {
	root: true,
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
	ignorePatterns: [...getDefaultIgnorePatterns()],
	extends: [
		'@gras/eslint-config/src/bases/src/bases/typescript',
		'@gras/eslint-config/src/bases/src/bases/regexp',
		'@gras/eslint-config/src/bases/src/bases/sonar',
		'@gras/eslint-config/src/bases/src/bases/jest',
		'@gras/eslint-config/src/bases/src/bases/rtl',
		// Apply prettier and disable incompatible rules
		'@gras/eslint-config/src/bases/src/bases/prettier',
	],
	rules: {
		// optional overrides per project
	},
	overrides: [
		// optional overrides per project file match
	],
};
