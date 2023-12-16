require('@cd/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
	root: true,
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
	ignorePatterns: [...getDefaultIgnorePatterns(), '**/*.css'],
	extends: [
		'@cd/eslint-config/src/bases/typescript',
		'@cd/eslint-config/src/bases/regexp',
		'@cd/eslint-config/src/bases/sonar',
		'@cd/eslint-config/src/bases/jest',
		'@cd/eslint-config/src/bases/rtl',
		'@cd/eslint-config/src/bases/react',
		'@cd/eslint-config/src/bases/prettier',
		'plugin:storybook/recommended',
		'plugin:storybook/recommended',
	],
	rules: {
		// optional overrides per project
	},
	overrides: [
		// optional overrides per project file match
	],
};
