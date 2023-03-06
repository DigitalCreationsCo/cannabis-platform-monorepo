// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// import typescript from '@rollup/plugin-typescript';
// import packageJson from './package.json' assert { type: 'json' };

// export default {
//     input: 'src/index.ts',
//     output: [
//         {
//             file: packageJson.main,
//             format: 'cjs',
//             name: '@cd/shared-lib',
//             sourcemap: true
//         },
//         {
//             file: packageJson.module,
//             format: 'esm',
//             sourcemap: true
//         }
//     ],
//     plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })],
//     external: [
//         'react',
//         'react-dom',
//     ]
// };

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
            name: '@cd/shared-lib',
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        commonjs(),

        typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['react', 'react-dom']
};
