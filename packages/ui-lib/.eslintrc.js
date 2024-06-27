require('@cd/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
	ignorePatterns: [...getDefaultIgnorePatterns()],
	extends: [
		'@cd/eslint-config/src/bases/typescript',
		'@cd/eslint-config/src/bases/regexp',
		'@cd/eslint-config/src/bases/sonar',
		'@cd/eslint-config/src/bases/jest',
		'@cd/eslint-config/src/bases/rtl',
		'@cd/eslint-config/storybook',
		'@cd/eslint-config/src/bases/react',
		'@cd/eslint-config/src/bases/prettier',
	],
	rules: {
		// 'import/no-unresolved': 'off',
	},
	overrides: [
		// optional overrides per project file match
	],
};
