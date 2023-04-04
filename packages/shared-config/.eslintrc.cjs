module.exports = {
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'eslint:recommended'],
    plugins: ['prettier'],
    rules: {
        eqeqeq: 'error',
        'no-console': 'off',
        'prettier/prettier': 'error'
    },
    env: {
        browser: true,
        node: true,
        jest: true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.css']
            }
        }
    },
    ignorePatterns: ['**/node_modules', 'build', 'dist', 'public']
};
