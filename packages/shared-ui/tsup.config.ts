import * as dotenv from 'dotenv';
import { defineConfig } from 'tsup';
dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

export default defineConfig((options) => {
    return [
        {
            entry: ['src/index.ts'],
            outDir: 'dist/esm',
            splitting: true,
            clean: true,
            dts: true,
            format: ['esm'],
            platform: 'node',
            target: ['esnext'],
            sourcemap: !options.watch,
            minify: !options.watch,
            external: ['react', 'react-dom']
        },
        {
            entry: ['src/index.ts'],
            outDir: 'dist/cjs',
            splitting: true,
            clean: true,
            dts: true,
            format: ['cjs'],
            platform: 'node',
            target: ['esnext'],
            sourcemap: !options.watch,
            minify: !options.watch,
            external: ['react', 'react-dom']
        }
    ];
});
