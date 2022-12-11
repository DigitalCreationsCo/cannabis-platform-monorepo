<<<<<<< Updated upstream:packages/shared-config/.eslintrc.js
module.exports = require('./eslint-config');
=======
module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier', 'react', 'react-hooks'],
    rules: {
        eqeqeq: 'error',
        'no-console': 'warn',
        'prettier/prettier': 'error',
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
>>>>>>> Stashed changes:packages/shared-config/.eslintrc.cjs
