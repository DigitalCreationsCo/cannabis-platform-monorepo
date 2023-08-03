const jestPatterns = {
	files: ['**/?(*.)+(test).{js,jsx,ts,tsx}']
};

module.exports = {
	env: {
		es6: true,
		node: true
	},
	overrides: [
		{
			// Perf: To ensure best performance enable eslint-plugin-jest for test files only.
			files: jestPatterns.files,
			// @see https://github.com/jest-community/eslint-plugin-jest
			extends: ['plugin:jest/recommended'],
			rules: {
				'jest/prefer-hooks-in-order': 'error',
				'jest/prefer-hooks-on-top': 'error',
				'jest/no-duplicate-hooks': 'error',
				'jest/no-test-return-statement': 'error',
				'jest/prefer-strict-equal': 'error',
				'jest/prefer-to-have-length': 'error',
				'jest/consistent-test-it': ['error', { fn: 'it' }],
				// Relax rules that are known to be slow and less useful in a test context
				'import/namespace': 'off',
				'import/default': 'off',
				'import/no-duplicates': 'off',
				// Relax rules that makes writing tests easier
				'import/no-named-as-default-member': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'@typescript-eslint/no-object-literal-type-assertion': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/ban-ts-comment': 'off'
			}
		}
	]
};
