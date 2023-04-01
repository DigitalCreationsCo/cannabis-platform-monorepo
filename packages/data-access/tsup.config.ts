import * as dotenv from 'dotenv';
import { defineConfig } from 'tsup';
dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

export default defineConfig((options) => {
    return [
        {
            entry: ['index.cjs'],
            splitting: true,
            clean: true,
            dts: true,
            format: ['cjs'],
            platform: 'node',
            target: ['esnext'],
            sourcemap: !options.watch,
            // Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
            minify: false
        },
        {
            entry: ['wrapper.mjs'],
            splitting: true,
            clean: true,
            dts: true,
            format: ['esm'],
            platform: 'node',
            target: ['esnext'],
            sourcemap: !options.watch,
            // Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
            minify: false
        }
    ];
});
