module.exports = [
    {
        entry: './index.ts',
        output: {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: 'index.js'
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
        },
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
    },
    {
        entry: './src/index.tsx',
        output: {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: 'widget.js'
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
        },
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
                    use: {
                        loader: 'babel-loader',
                        options: {
                        presets: ['@babel/preset-env'],
                        },
                    },
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
]