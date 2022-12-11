module.exports = {
    extends: ['../../node_modules/shared-config/.eslintrc.cjs', 'next', 'next/core-web-vitals'],
    plugins: [],
    settings: {
        next: {
            rootDir: ['**/apps/*/'],
        },
    },
    rules: {
        '@next/next/no-html-link-for-pages': 'off',
    },
};
