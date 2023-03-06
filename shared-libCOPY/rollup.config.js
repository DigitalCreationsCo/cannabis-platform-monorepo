import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json' assert { type: 'json' };

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            name: '@cd/shared-lib'
        },
        {
            file: packageJson.module,
            format: 'esm'
        }
    ],
    plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })],
    external: [
        'react',
        'react-dom',
        'next',
        'supertokens-node',
        'axios',
        'tailwindcss',
        'react-hot-toast',
        'usehooks-ts'
    ]
};
