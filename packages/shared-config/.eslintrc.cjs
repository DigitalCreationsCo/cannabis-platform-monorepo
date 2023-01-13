module.exports = {
    extends: [
        'eslint:recommended',
        'eslint-config-prettier',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
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
    ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
