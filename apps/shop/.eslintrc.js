const {
  getDefaultIgnorePatterns,
} = require('@cd/eslint-config/src/helpers');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns(), '.next', '.out'],
  extends: [
    '@cd/eslint-config/typescript',
    '@cd/eslint-config/sonar',
    '@cd/eslint-config/regexp',
    '@cd/eslint-config/jest',
    '@cd/eslint-config/react',
    '@cd/eslint-config/tailwind',
    '@cd/eslint-config/rtl',
    // Add specific rules for nextjs
    'plugin:@next/next/core-web-vitals',
    // Apply prettier and disable incompatible rules
    '@cd/eslint-config/prettier',
  ],
  rules: {
    // https://github.com/vercel/next.js/discussions/16832
    '@next/next/no-img-element': 'off',
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [
    {
      files: ['next.config.mjs'],
      rules: {
        'import/order': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['src/pages/\\_*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
  ],
};
