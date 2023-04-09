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
                    use: ['babel-loader']
                }
            ]
        }
    }
]