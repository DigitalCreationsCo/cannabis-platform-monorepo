require('@gras/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@gras/eslint-config/src/helpers');

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json'
	},
	ignorePatterns: [...getDefaultIgnorePatterns(), '.eslintrc.cjs'],
	extends: [
		'@gras/eslint-config/src/bases/typescript',
		'@gras/eslint-config/src/bases/regexp',
		'@gras/eslint-config/src/bases/sonar',
		'@gras/eslint-config/src/bases/jest',
		'@gras/eslint-config/src/bases/i18n',
		'@gras/eslint-config/src/bases/rtl',
		'@gras/eslint-config/src/bases/storybook',
		'@gras/eslint-config/src/bases/react',
		'@gras/eslint-config/src/bases/prettier-plugin',
	],
	rules: {
		'@typescript-eslint/naming-convention': ['off'],
	},
	overrides: [
		// optional overrides per project file match
	]
};
