const tailwindConfig = require('@cd/shared-config/tailwind.config.cjs');

module.exports = {
    plugins: {
        tailwindcss: { config: tailwindConfig },
        autoprefixer: {},
    },
};
