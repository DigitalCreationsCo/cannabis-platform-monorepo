require('@gras/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@gras/eslint-config/src/helpers');

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
	ignorePatterns: [...getDefaultIgnorePatterns(), '.next', '.out', '.eslintrc.js'],
	extends: [
		'@gras/eslint-config/src/bases/typescript',
		'@gras/eslint-config/src/bases/sonar',
		'@gras/eslint-config/src/bases/regexp',
		'@gras/eslint-config/src/bases/jest',
		'@gras/eslint-config/src/bases/react',
		'@gras/eslint-config/src/bases/tailwind',
		'@gras/eslint-config/src/bases/rtl',
		// Add specific rules for nextjs
		'plugin:@next/next/core-web-vitals',
		// Apply prettier and disable incompatible rules
		'@gras/eslint-config/src/bases/prettier-plugin',
	],
	rules: {
		'@typescript-eslint/naming-convention': 'off',
		// https://github.com/vercel/next.js/discussions/16832
		'@next/next/no-img-element': 'off',
		// For the sake of example
		// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
		'jsx-a11y/anchor-is-valid': 'off',
	},
	overrides: [
		{
			files: ['next.config.mjs'],
			rules: {
				'import/order': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
			},
		},
		{
			files: ['src/**/*.{ts,tsx}'],
			rules: {
				'react/display-name': 'off',
			},
		},
	],
};
