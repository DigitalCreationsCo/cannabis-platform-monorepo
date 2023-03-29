import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dotenvExtended from "rollup-plugin-dotenv-extended";
import packageJson from './package.json' assert { type: 'json' };

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs'
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
