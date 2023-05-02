const path = require("node:path");

module.exports = function (config) {
    config.cache(true);

    const nodeEnv = process.env.NODE_ENV || 'development';

    console.info(' 🌠 server/image env loaded from ', path.resolve(__dirname, '../../.env.' + nodeEnv))

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
