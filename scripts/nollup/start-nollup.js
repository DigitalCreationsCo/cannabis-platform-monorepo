const path= require('path')
let NollupDevServer = require('nollup/lib/dev-server');

NollupDevServer({
    hot: true,
    port: 9001,
    // configPlugin: [
    //     require('rollup-plugin-postcss')({
    //         config: {
    //             path: './postcss.config.cjs'
    //         },
    //         extensions: ['.css'],
    //         minimize: true,
    //         inject: {
    //             insertAt: 'top'
    //         },
    //         extract: path.resolve('dist/style.css')
    //     }),
    //     require('@rollup/plugin-node-resolve')(),
    //     require('@rollup/plugin-commonjs')(),
    //     require('@rollup/plugin-typescript')({ tsconfig: './tsconfig.json' }),
    //     require('rollup-plugin-img')({
    //         output: 'dist/assets'
    //     }),
    // ]
});