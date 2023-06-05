const path = require("node:path");

// development path gets env from monorepo root
// production path gets env from project root

module.exports = function (config) {
    config.cache(true);

    const nodeEnv = process.env.NODE_ENV || 'development';

    console.info(' >> server-main env loaded from ', path.resolve(__dirname, '../../.env.' + nodeEnv))

    return {
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
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
