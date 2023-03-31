import * as dotenv from 'dotenv';
import { defineConfig } from 'tsup';
dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

export default defineConfig((options) => ({
    entry: ['src/index.ts'],
    splitting: true,
    treeshake: true,
    clean: true,
    dts: true,
    format: ['esm', 'cjs'],
    platform: 'node',
    target: ['esnext', 'chrome70', 'edge18', 'firefox70', 'node16'],
    sourcemap: !options.watch,
    minify: !options.watch
}));
