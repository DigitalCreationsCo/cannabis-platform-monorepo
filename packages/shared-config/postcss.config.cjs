// const tailwindConfig = require('./tailwind.cjs');

module.exports = {
    plugins: {
        tailwindcss: { config: require('./tailwind.config.cjs') },
        autoprefixer: {},
    },
};
