const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.cjs");

module.exports = {
  plugins: {
    tailwindcss: { config: resolveConfig(tailwindConfig) },
    autoprefixer: {},
  },
};
