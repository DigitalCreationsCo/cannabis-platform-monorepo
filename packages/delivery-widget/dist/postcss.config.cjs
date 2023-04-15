// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@cd/shared-config/tailwind.config.cjs');
module.exports = {
    plugins: {
        tailwindcss: { config },
        autoprefixer: {}
    }
};
export {};
