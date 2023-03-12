import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import image from 'rollup-plugin-img';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json' assert { type: 'json' };

export default {
    input: 'src/index.ts',
    output: [
        // {
        //     file: packageJson.main,
        //     format: 'cjs',
        //     name: '@cd/shared-ui',
        //     sourcemap: true
        // },
        {
            name: '@cd/shared-ui',
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        postcss({
            config: {
                path: './postcss.config.cjs'
            },
            extensions: ['.css'],
            minimize: true,
            inject: {
                insertAt: 'top'
            },
            extract: path.resolve('dist/style.css')
        }),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        image({
            output: 'dist/assets'
        })
    ],
    external: ['react', 'react-dom', 'next', '@cd/shared-lib'],
    watch: {
        clearScreen: false,
        include: './**',
        buildDelay: 1000,
        exclude: ['node_modules/**', 'dist/**', '.turbo/**']
    }
};
