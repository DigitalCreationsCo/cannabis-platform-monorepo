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
};
