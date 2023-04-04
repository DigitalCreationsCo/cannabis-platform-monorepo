import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json' assert { type: 'json' };

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            name: '@cd/shared-ui',
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: 'esm',
            name: '@cd/shared-ui',
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
            extract: 'style.css'
        }),
        resolve(),
        commonjs(),
        image(),
        typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['react', 'react-dom', 'usehooks-ts']
};
