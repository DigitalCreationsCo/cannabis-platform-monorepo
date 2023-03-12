import incremental from '@mprt/rollup-plugin-incremental';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    treeshake: false,
    output: [
        // {
        //     file: packageJson.main,
        //     format: 'cjs',
        //     name: '@cd/shared-lib',
        //     sourcemap: true,
        //     minifyInternalExports: false,
        // },
        {
            dir: 'dist',
            // file: packageJson.module,
            preserveModules: true,
            preserveModulesRoot: 'src',
            name: '@cd/shared-lib',
            format: 'esm',
            minifyInternalExports: false,
        }
    ],
    plugins: [
        incremental(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        incremental.fixSNE(),
    ],
    external: ['react', 'react-dom', '@cd/shared-ui', 'shared-ui'],
    watch: {
        clearScreen: false,
        // include: './**',
        buildDelay: 1000,
        exclude: ['node_modules/**', 'dist/**', '.turbo/**']
    }
};
