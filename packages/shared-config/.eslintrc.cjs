module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'eslint-config-prettier'],
    plugins: ['prettier'],
    rules: {
        eqeqeq: 'error',
        'no-console': 'off',
        'prettier/prettier': 'error',
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
    },
    ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
