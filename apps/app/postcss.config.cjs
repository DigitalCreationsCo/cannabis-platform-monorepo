// const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('shared-config/tailwind.config.cjs');

module.exports = {
    plugins: {
        tailwindcss: { config: tailwindConfig },
        autoprefixer: {},
    },
};
