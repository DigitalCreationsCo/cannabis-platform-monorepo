module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier', 'react', 'react-hooks'],
    rules: {
        eqeqeq: 'error',
        'no-console': 'warn',
        'prettier/prettier': 'error',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
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
    ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
