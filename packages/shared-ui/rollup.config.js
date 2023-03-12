import incremental from '@mprt/rollup-plugin-incremental';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import image from 'rollup-plugin-img';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    treeshake: false,
    output: [
        // {
        //     file: packageJson.main,
        //     format: 'cjs',
        //     name: '@cd/shared-ui',
        //     sourcemap: true
        // },
        {
            dir: 'dist',
            name: '@cd/shared-ui',
            preserveModules: true,
            preserveModulesRoot: 'src',
            // file: packageJson.module,
            format: 'esm',
            sourcemap: true,
            minifyInternalExports: false
        }
    ],
    plugins: [
        incremental(),
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
        }),
        incremental.fixSNE()
    ],
    external: ['react', 'react-dom', 'next', 'shared-lib', '@cd/shared-lib'],
    watch: {
        clearScreen: false,
        include: './**',
        buildDelay: 1000,
        exclude: ['node_modules/**', 'dist/**', '.turbo/**']
    }
};
