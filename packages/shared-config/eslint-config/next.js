module.exports = {
    extends: ['shared-config/eslint-config/react', 'next', 'next/core-web-vitals'],
    rules: {
        '@next/next/no-html-link-for-pages': 'off',
    },
    settings: {
        next: {
            rootDir: ['apps/*/', 'packages/*/'],
        },
    },
};
