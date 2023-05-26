const path = require("node:path");

module.exports = function (config) {
    config.cache(true);

    return {
        presets: ['@babel/preset-typescript'],
        plugins: ["nativewind/babel"],
    };
};
