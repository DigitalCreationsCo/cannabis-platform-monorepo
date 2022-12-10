const resolveConfig = require('tailwindcss/resolveConfig').resolveConfig;
const tailwindConfig = require('./tailwind.config.cjs');

module.exports = resolveConfig(tailwindConfig);
