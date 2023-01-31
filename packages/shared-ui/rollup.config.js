import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
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
        ],
        plugins: [resolve(), commonjs(), postcss(), typescript({ tsconfig: './tsconfig.json' })],
    },
    {
        input: 'dist/shared-ui.es.js',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        external: [/\.css$/],
        plugins: [dts()],
    },
];
