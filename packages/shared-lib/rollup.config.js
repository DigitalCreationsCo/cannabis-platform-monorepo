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
            name: '@cd/shared-lib',
            format: 'esm',
            sourcemap: true,
        }
    ],
    plugins: [
        resolve({"modulePaths": ["node_modules", "src"]}),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        dotenvExtended({}, { cwd: '../../', envKey: process.env.NODE_ENV })
    ],
    external: ['axios', 'react', 'react-dom', 'react-hot-toast', 'react-redux', '@reduxjs/toolkit', '@cd/data-access', '@cd/shared-config', '@cd/shared-ui', 'tailwindcss', 'supertokens-auth-react'],
    watch: {
        clearScreen: false,
        include: './**',
        buildDelay: 1000,
        exclude: ['node_modules/**', 'dist/**', '.turbo/**']
    }
};
