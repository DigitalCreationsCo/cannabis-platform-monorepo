const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    entry: 'index.ts',
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'widget.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    stats: {
        errorDetails: true,
        children: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}