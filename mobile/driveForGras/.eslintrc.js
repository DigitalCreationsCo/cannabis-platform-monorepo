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
		'@gras/eslint-config/src/bases/typescript',
		'@gras/eslint-config/src/bases/regexp',
		'@gras/eslint-config/src/bases/sonar',
		'@gras/eslint-config/src/bases/jest',
		'@gras/eslint-config/src/bases/rtl',
		'@gras/eslint-config/src/bases/react',
		'@gras/eslint-config/src/bases/prettier',
		'plugin:storybook/recommended',
	],
	rules: {
		// optional overrides per project
	},
	overrides: [
		// optional overrides per project file match
	],
};
