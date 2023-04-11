import * as dotenv from 'dotenv';
import { defineConfig } from 'tsup';
dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });
export default defineConfig((options) => {
    return [
        {
            entry: ['src'],
            outDir: 'dist/cjs',
            clean: true,
            dts: true,
            format: ['cjs'],
            platform: 'node',
            target: ['esnext'],
            sourcemap: !options.watch,
            // Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
            minify: false,
            external: ['react', 'react-dom', 'supertokens-auth-react', '@cd/shared-ui']
        },
        {
            entry: ['src'],
            outDir: 'dist/esm',
            clean: true,
            dts: true,
            format: ['esm'],
            platform: 'node',
            target: ['esnext'],
            sourcemap: !options.watch,
            // Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
            minify: false,
            external: ['react', 'react-dom', 'supertokens-auth-react', '@cd/shared-ui']
        }
    ];
});
//# sourceMappingURL=tsup.config.js.map