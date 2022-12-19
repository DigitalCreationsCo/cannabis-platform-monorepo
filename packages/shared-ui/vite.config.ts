import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
    plugins: [
        react({ jsxRuntime: 'classic' }),
        dts({
            insertTypesEntry: true,
            outputDir: 'dist',
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: '@cd/shared-ui',
<<<<<<< Updated upstream
            formats: ['es', 'umd'],
            fileName: (format) => `shared-ui.${format}.js`,
        },
        rollupOptions: {
=======
            formats: ['es', 'cjs'],
            fileName: (format) => `shared-ui.${format}.js`,
        },
        rollupOptions: {
            plugins: [
                // incremental(),
                // incremental.fixSNE(),
            ],
>>>>>>> Stashed changes
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
<<<<<<< Updated upstream
=======
                // preserveModules: true,
>>>>>>> Stashed changes
            },
        },
    },
});
