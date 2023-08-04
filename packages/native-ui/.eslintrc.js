const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
	root: true,
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
		// '@cd/eslint-config/src/bases/storybook',
		'@cd/eslint-config/src/bases/react',
		// Apply prettier and disable incompatible rules
		'@cd/eslint-config/src/bases/prettier',
	],
	rules: {
		// optional overrides per project
	},
	overrides: [
		// optional overrides per project file match
	],
};
