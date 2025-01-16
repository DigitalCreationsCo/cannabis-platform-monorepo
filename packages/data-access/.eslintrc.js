require('@gras/eslint-config/src/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@gras/eslint-config/src/helpers');

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
	ignorePatterns: [...getDefaultIgnorePatterns()],
	extends: [
		'@gras/eslint-config/src/bases/typescript',
		'@gras/eslint-config/src/bases/sonar',
		'@gras/eslint-config/src/bases/regexp',
		'@gras/eslint-config/src/bases/jest',
		// Apply prettier and disable incompatible rules
		'@gras/eslint-config/src/bases/prettier-plugin',
	],
	overrides: [
		// optional overrides per project file match
		{
			files: ['**/*seed.mts'],
			rules: {
				'sonarjs/no-duplicate-string': 'off',
			},
		},
	],
};
