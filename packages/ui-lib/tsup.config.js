import { defineConfig } from 'tsup';
export default defineConfig((options) => ({
    entry: ['src/index.ts'],
    splitting: true,
    treeshake: true,
    clean: true,
    dts: true,
    external: ['path', 'next'],
    format: ['esm'],
    platform: 'browser',
    target: ['es2017', 'chrome70', 'edge18', 'firefox70', 'node16'],
    tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
    sourcemap: !options.watch,
    minify: !options.watch,
}));
