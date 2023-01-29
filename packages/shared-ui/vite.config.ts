import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    // server: {
    //     watch: {
    //         ignored: ['!**/node_modules/@cd/shared-config/**'],
    //     },
    // },
    plugins: [
        react({ jsxRuntime: 'classic' }),
        dts({
            outputDir: 'dist',
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: '@cd/shared-ui',
            fileName: 'shared-ui',
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
