module.exports = [
    {
        entry: './index.tsx',
        output: {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: 'index.js'
        },
        mode: 'development',
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js"],
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
                    use: ["style-loader", "css-loader"],
                }
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
        mode: 'development',
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js"],
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
                    use: ["style-loader", "css-loader"],
                },

            ]
        }
    }
]