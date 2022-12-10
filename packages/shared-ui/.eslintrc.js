module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended', 'eslint-config-prettier'],
    plugins: ['prettier', '@typescript-eslint', 'simple-import-sort'],
    rules: {
        eqeqeq: 'error',

            semi: 'error',
        'no-console': 'warn',
        'prettier/prettier': 'error',
        'no-undef': 'off',
        'no-unused-vars': 'warn',
        'prefer-const': 'error',
        'no-irregular-whitespace': 'error',
        'no-trailing-spaces': 'error',
        'no-empty-function': 'error',
        'no-duplicate-imports': 'error',
        'newline-after-var': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        camelcase: 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
            node: true,
        es6: true,
        jest: true,
    },
    settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
        },
    }
};
