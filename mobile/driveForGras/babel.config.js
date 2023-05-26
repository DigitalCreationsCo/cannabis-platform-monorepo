// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: ['transform-inline-environment-variables'],
//   };
// };

const path = require("node:path");

module.exports = function (config) {
    config.cache(true);

    const nodeEnv = process.env.NODE_ENV || 'development';

    return {
        presets: ['babel-preset-expo', '@babel/preset-typescript'],
        env: {
            development: {
                plugins: [
                    [
                        'inline-dotenv',
                        {
                            path: path.resolve(__dirname, '../../.env.' + nodeEnv)
                        }
                    ]
                ],
            },
            production: {
                plugins: [
                    [
                        'inline-dotenv',
                        {
                            path: path.resolve(__dirname, '../../.env.' + nodeEnv)
                        }
                    ]
                ],
            }
        }
    };
};
