const path = require('path');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'production',
    plugins: [
        new Dotenv({
          path: '../../.env.' + process.env.NODE_ENV, // load this now instead of the ones in '.env'
          safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
          allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
          systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
          silent: true, // hide any errors
          defaults: false, // load '.env.defaults' as the default values if empty.
          prefix: 'process.env.' // reference your env variables as 'import.meta.env.ENV_VAR'.
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    "useCache": true,
                    "useBabel": true,
                    "babelOptions": {
                        "babelrc": false, /* Important line */
                        // "presets": [
                        //     ["@babel/preset-env", { "targets": "last 2 versions, ie 11", "modules": false }]
                        // ]
                    },
                    "babelCore": "@babel/core", // needed for Babel v7
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: /node_modules/,
                use: ['file-loader']
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        plugins: [
            new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' }),
        ]
    },
    externals: {
        'socket': 'socket.io-client',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
};