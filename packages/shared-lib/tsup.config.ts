import * as dotenv from 'dotenv';
import { defineConfig } from 'tsup';
dotenv.config({ path: `../../.env.${process.env.NODE_ENV}`})

export default defineConfig((options) => {
    return {
        entry: ['src/index.ts'],
        splitting: true,
        clean: true,
        dts: true,
        format: ['esm', 'cjs'],
        platform: 'node',
        target: ['esnext'],
        sourcemap: !options.watch,
        // Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
        minify: true
    };
});
