const resolveConfig = require('tailwindcss/resolveConfig').resolveConfig;
const tailwindConfig = require('./tailwind.config.cjs');

module.exports.twConfig = resolveConfig(tailwindConfig);
