import * as dotenv from 'dotenv';
import { defineConfig } from 'tsup';
dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

export default defineConfig((options) => {
    return {
        entry: ['src/index.ts'],
        splitting: true,
        clean: true,
        dts: true,
        format: ['cjs'],
        platform: 'node',
        target: ['es6'],
        sourcemap: !options.watch,
        // Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
        minify: false
    };
});
