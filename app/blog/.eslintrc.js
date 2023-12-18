require('@cd/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
	root: true,
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
	ignorePatterns: [...getDefaultIgnorePatterns(), '.next', '.out'],
	settings: {
		'import/resolver': {
			typescript: {
				project: ['tsconfig.json'],
			},
			node: {},
		},
	},
	extends: [
		'@cd/eslint-config/src/bases/typescript',
		'@cd/eslint-config/src/bases/sonar',
		'@cd/eslint-config/src/bases/regexp',
		'@cd/eslint-config/src/bases/jest',
		'@cd/eslint-config/src/bases/react',
		'@cd/eslint-config/src/bases/tailwind',
		'@cd/eslint-config/src/bases/rtl',
		'plugin:@next/next/core-web-vitals',
		'@cd/eslint-config/src/bases/prettier',
	],
	rules: {
		'@next/next/no-img-element': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
	},
	overrides: [
		{
			files: ['next.config.mjs'],
			rules: {
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
