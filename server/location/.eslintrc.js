const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
	root: true,
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
	ignorePatterns: [...getDefaultIgnorePatterns()],
	extends: [
		'@cd/eslint-config/typescript',
		'@cd/eslint-config/regexp',
		'@cd/eslint-config/sonar',
		'@cd/eslint-config/jest',
		'@cd/eslint-config/rtl',
		// Apply prettier and disable incompatible rules
		'@cd/eslint-config/prettier',
	],
	rules: {
		// optional overrides per project
	},
	overrides: [
		// optional overrides per project file match
	],
};
