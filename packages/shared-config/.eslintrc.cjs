module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        'eslint-config-prettier',
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
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.css'],
            },
        },
    },
    ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
