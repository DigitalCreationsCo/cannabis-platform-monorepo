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
		'@cd/eslint-config/src/bases/sonar',
		'@cd/eslint-config/src/bases/regexp',
		// Apply prettier and disable incompatible rules
		'@cd/eslint-config/src/bases/prettier',
	],
	overrides: [
		// optional overrides per project file match
		{
			files: ['**/*seed.ts'],
			rules: {
				'sonarjs/no-duplicate-string': 'off',
			},
		},
	],
};
