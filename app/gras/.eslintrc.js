require('@cd/eslint-config/src/patch/modern-module-resolution');
const { getDefaultIgnorePatterns } = require('@cd/eslint-config/src/helpers');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [...getDefaultIgnorePatterns(), '.next', '.out'],
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'prettier',
    // 'next/core-web-vitals',
    // 'plugin:i18next/recommended',
    '@cd/eslint-config/src/bases/typescript',
    '@cd/eslint-config/src/bases/sonar',
    '@cd/eslint-config/src/bases/regexp',
    '@cd/eslint-config/src/bases/jest',
    '@cd/eslint-config/src/bases/react',
    '@cd/eslint-config/src/bases/tailwind',
    '@cd/eslint-config/src/bases/rtl',
    // Add specific rules for nextjs
    'plugin:@next/next/core-web-vitals',
    // Apply prettier and disable incompatible rules
    '@cd/eslint-config/src/bases/prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'i18next'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // Disable the rule for JavaScript files
      },
    },
    {
      files: ['seed.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: [
        'components/defaultLanding/**/*.tsx',
        'components/emailTemplates/**/*.tsx',
        'pages/index.tsx',
      ],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
