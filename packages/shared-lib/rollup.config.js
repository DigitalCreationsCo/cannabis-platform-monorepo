import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
// import dotenv from 'rollup-plugin-dotenv';
import dotenvExtended from "rollup-plugin-dotenv-extended";

export default {
    input: 'src/index.ts',
    treeshake: false,
    output: [
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
        resolve({"modulePaths": ["node_modules", "src"]}),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        dotenvExtended({}, { cwd: '../../', envKey: process.env.NODE_ENV })
    ],
    external: ['axios', 'usehooks-ts', 'react', 'react-dom', '@cd/shared-ui', 'shared-ui', 'react-redux', '@reduxjs/toolkit'],
    watch: {
        clearScreen: false,
        include: './**',
        buildDelay: 1000,
        exclude: ['node_modules/**', 'dist/**', '.turbo/**']
    }
};
