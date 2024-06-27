module.exports = {
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			globalReturn: false,
		},
		ecmaVersion: 2015,
		project: [
			'tsconfig.json',
			'packages/*/tsconfig.json',
			'app/*/tsconfig.json',
			'server/*/tsconfig.json',
			'tools/*/tsconfig.json',
			'mobile/*/tsconfig.json',
		],
		sourceType: 'module',
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx', '.mts'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true, // Always try to resolve types under `@types` package
				project: [
					'tsconfig.json',
					'packages/*/tsconfig.json',
					'app/*/tsconfig.json',
				],
			},
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/stylistic-type-checked', // allows for flexible project level configuration
	],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'import/no-cycle': 1,
		'import/default': ['off'],
		// Caution this rule is slow https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
		'import/namespace': 'off', // ['error'] If you want the extra check (typechecking will spot most issues already)
		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
		'no-duplicate-imports': 'off',
		'import/no-named-as-default': ['warn'],
		'import/no-named-as-default-member': ['warn'],
		'import/no-duplicates': ['error'],
		'import/order': [
			'warn',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
				],
				alphabetize: { order: 'asc', caseInsensitive: true },
			},
		],
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': [
			'error',
			{ allow: ['private-constructors'] },
		],

		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_', ignoreRestSiblings: true },
		],
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
		'@typescript-eslint/prefer-nullish-coalescing': 'warn',
		'@typescript-eslint/prefer-optional-chain': 'warn',
		'@typescript-eslint/prefer-for-of': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
		],
		'@typescript-eslint/ban-tslint-comment': ['error'],
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				minimumDescriptionLength: 10,
				'ts-ignore': false,
				'ts-nocheck': true,
				'ts-check': false,
			},
		],
		'spaced-comment': [
			'error',
			'always',
			{
				line: {
					markers: ['/'],
					exceptions: ['-', '+'],
				},
				block: {
					markers: ['!'],
					exceptions: ['*'],
					balanced: true,
				},
			},
		],
		'linebreak-style': ['error', 'unix'],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				format: ['camelCase'],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'forbid',
				filter: {
					regex: '^(Content-Type)$',
					match: false,
				},
			},
			{
				selector: 'variable',
				format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
				leadingUnderscore: 'allowSingleOrDouble',
			},
			{
				selector: ['function'],
				format: ['camelCase'],
				leadingUnderscore: 'allow',
			},
			{
				selector: 'parameter',
				format: ['camelCase', 'PascalCase'],
				leadingUnderscore: 'allow',
			},
			{
				selector: 'class',
				format: ['PascalCase'],
			},
			{
				selector: 'classProperty',
				format: ['camelCase'],
				leadingUnderscore: 'allow',
				filter: {
					regex: '^(Content-Type)$',
					match: false,
				},
			},
			{
				selector: 'objectLiteralProperty',
				format: [
					'camelCase',
					// Some external libraries use snake_case for params
					'snake_case',
					// Env variables are generally uppercase
					'UPPER_CASE',
					// DB / Graphql might use PascalCase for relationships
					'PascalCase',
				],
				leadingUnderscore: 'allowSingleOrDouble',
				trailingUnderscore: 'allowSingleOrDouble',
				filter: {
					regex: '^(Content-Type)$',
					match: false,
				},
			},
			{
				selector: 'objectLiteralMethod',
				format: null,
				leadingUnderscore: 'allowSingleOrDouble',
				trailingUnderscore: 'allowSingleOrDouble',
			},
			{
				selector: ['typeAlias', 'interface'],
				format: ['PascalCase'],
			},
			{
				selector: ['typeProperty'],
				format: ['camelCase'],
				// For graphql __typename
				leadingUnderscore: 'allowSingleOrDouble',
			},
			{
				selector: ['typeParameter'],
				format: ['PascalCase'],
			},
		],
	},
	overrides: [
		{
			files: ['*.mjs'],
			parserOptions: {
				ecmaVersion: 2015,
				sourceType: 'module',
			},
			rules: {
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/consistent-type-exports': 'off',
				'@typescript-eslint/consistent-type-imports': 'off',
			},
		},
		{
			// commonjs or assumed
			files: ['*.js', '*.cjs'],
			parserOptions: {
				ecmaVersion: 2015,
			},
			rules: {
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/consistent-type-exports': 'off',
				'@typescript-eslint/consistent-type-imports': 'off',
				'import/order': 'off',
			},
		},
	],
};
