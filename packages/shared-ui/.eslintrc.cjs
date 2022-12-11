<<<<<<< HEAD
// module.exports = require("shared-config/.eslintrc.js");

module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
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
=======
module.exports = {
  extends: [
    '../../node_modules/shared-config/.eslintrc.cjs',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier'
  ],
  plugins: ['prettier', 'react', 'react-hooks'],
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
},
rules: {
  'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
},
>>>>>>> topic/eslint
};
