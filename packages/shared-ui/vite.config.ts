import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react({ jsxRuntime: 'classic' }),
        dts({
            insertTypesEntry: true,
            outputDir: 'dist/types',
            copyDtsFiles: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'shared-ui',
            formats: ['es', 'umd'],
            fileName: (format) => `shared-ui.${format}.js`,
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
