require('@cd/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json'
	},
	ignorePatterns: [...getDefaultIgnorePatterns(), '.eslintrc.cjs'],
	extends: [
		'@cd/eslint-config/src/bases/typescript',
		'@cd/eslint-config/src/bases/regexp',
		'@cd/eslint-config/src/bases/sonar',
		'@cd/eslint-config/src/bases/jest',
		'@cd/eslint-config/src/bases/i18n',
		'@cd/eslint-config/src/bases/rtl',
		'@cd/eslint-config/src/bases/storybook',
		'@cd/eslint-config/src/bases/react',
		'@cd/eslint-config/src/bases/prettier-plugin',
	],
	rules: {
		'@typescript-eslint/naming-convention': ['off'],
	},
	overrides: [
		// optional overrides per project file match
	]
};
