module.exports = {
    extends: [
        "/packages/shared-config/.eslintrc.cjs",
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    plugins: ['react', 'react-hooks'],
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React to use.
            version: 'detect',
        },
        // Tells eslint how to resolve imports
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.png', '.css'],
            },
        },
    },
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/react-in-jsx-scope': 'off',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
};
