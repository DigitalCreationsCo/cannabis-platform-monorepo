import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json' assert { type: 'json' };

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                name: '@cd/shared-ui',
            },
            {
                file: packageJson.module,
                format: 'es',
            },
            { file: 'dist/style.css' },
        ],
        plugins: [resolve(), commonjs(), postcss(), css(), typescript({ tsconfig: './tsconfig.json' })],
    },
];
