module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'terraform',
        'cluster',
        'pipe',
        'dashboard',
        'shop',
        'widget',
        'mobile',
        'ui',
        'core',
        'db',
        'main',
        'location',
        'dispatch',
        'image',
        'payments',
        'git'
      ],
    ],
  },
};
