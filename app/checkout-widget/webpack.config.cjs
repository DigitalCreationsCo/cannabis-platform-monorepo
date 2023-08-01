const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, args) => {
    return {
        entry: './src',
        output: {
            path: __dirname + '/dist',
            // publicPath: args.mode === 'production' ? '/public' : '/demo',
            publicPath: '/',
            filename: 'index.js'
        },
        // devServer: {
        //     contentBase: './dist',
        // },
        devtool: 'inline-source-map',
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js", ".html", ".css"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                // template: './public/index.html'
                template: args.mode === 'production' ? '/public/index.html' : '/demo/index.html'
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
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ]
        }
    }
}