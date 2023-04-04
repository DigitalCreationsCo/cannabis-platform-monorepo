module.exports = {
    extends: ['../../packages/shared-config/.eslintrc-next.cjs'],
    settings: {
        next: {
            rootDir: '../../apps/shop/'
        }
    },
    parserOptions: {
        tsconfigRootDir: '.'
    }
};
