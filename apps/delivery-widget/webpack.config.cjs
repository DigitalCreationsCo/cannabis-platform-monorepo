const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'index.js'
    },
    devServer: {
        contentBase: './dist',
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".html", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader", 
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                        postcssOptions: {
                            plugins: [
                            [
                                "postcss-preset-env",
                                {
                                // Options
                                },
                            ],
                            ],
                        },
                        },
                    }
                ],
            },
        ]
    }
}