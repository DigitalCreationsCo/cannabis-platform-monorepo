const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [['postcss-preset-env']],
            },
          },
        },],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
}