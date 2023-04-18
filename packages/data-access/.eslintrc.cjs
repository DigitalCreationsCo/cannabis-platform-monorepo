const {
  getDefaultIgnorePatterns,
} = require('@cd/eslint-config/src/helpers');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@cd/eslint-config/typescript',
    '@cd/eslint-config/sonar',
    '@cd/eslint-config/regexp',
    // Apply prettier and disable incompatible rules
    '@cd/eslint-config/prettier',
  ],
  overrides: [
    // optional overrides per project file match
    {
      files: ['**/*seed.ts'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
};
