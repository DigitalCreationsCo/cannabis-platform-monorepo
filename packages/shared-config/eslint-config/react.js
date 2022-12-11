module.exports = {
    extends: ['shared-config/eslint-config', 'plugin:react/recommended'],
    plugins: ['react', 'react-hooks'],
    rules: {
        'react/display-name': 'off',
        'react/no-children-prop': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
