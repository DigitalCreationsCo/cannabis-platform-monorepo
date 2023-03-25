import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dotenv from "rollup-plugin-dotenv";

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
            // preserveModules: true,
            // preserveModulesRoot: 'src',
            name: '@cd/shared-lib',
            format: 'esm',
            // minifyInternalExports: false,    
            sourcemap: true,
        }
    ],
    plugins: [
        // incremental(),
        resolve({"modulePaths": ["node_modules", "src"]}),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        dotenv(),
        // incremental.fixSNE(),
    ],
    external: ['axios', 'usehooks-ts', 'react', 'react-dom', '@cd/shared-ui', 'shared-ui', 'react-redux', '@reduxjs/toolkit'],
    watch: {
        clearScreen: false,
        include: './**',
        buildDelay: 1000,
        exclude: ['node_modules/**', 'dist/**', '.turbo/**']
    }
};
