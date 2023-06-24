module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'dashboard',
        'shop',
        'widget',
        'ui',
        'core',
        'data',
        'main',
        'location',
        'dispatch',
        'image',
        'payments',
      ],
    ],
  },
};
