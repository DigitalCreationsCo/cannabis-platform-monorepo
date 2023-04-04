module.exports = function (config) {
    config.cache(true);
    const envName = process.env.NODE_ENV || 'development';
    const envFile = (!!envName && '.env.' + envName) || '.env.development';
    console.log('babel config envName: ', envName);
    console.log('babel config envFile: ', envFile);
    return {
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
        env: {
            development: {
                plugins: [
                    [
                        'inline-dotenv',
                        {
                            path: '../../' + envFile
                        }
                    ]
                ]
            },
            production: {
                plugins: [
                    [
                        'inline-dotenv',
                        {
                            path: '../../' + envFile
                        }
                    ]
                ]
            }
        }
    };
};
