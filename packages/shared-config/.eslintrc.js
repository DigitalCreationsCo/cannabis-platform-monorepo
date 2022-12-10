module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'next', 'next/core-web-vitals'],
    plugins: ['prettier', 'react', 'react-hooks', 'simple-import-sort', ],
    rules: {
        // eqeqeq: 'error',
        // semi: 'error',
        'no-console': 'warn',
        'prettier/prettier': ['error'],
        '@next/next/no-html-link-for-pages': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'no-unused-vars': 'error',
        'prefer-const': 'error',
        'no-irregular-whitespace': 'error',
        'no-trailing-spaces': 'error',
        'no-empty-function': 'error',
        'no-duplicate-imports': 'error',
        'newline-after-var': 'error',
        'camelcase': 'error',
    },
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
        next: {
            rootDir: ['apps/*/', 'packages/*/'],
        },
    },
    ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};