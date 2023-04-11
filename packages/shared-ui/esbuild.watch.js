import * as esbuild from 'esbuild';
import inlineImage from 'esbuild-plugin-inline-image';
// eslint-disable-next-line @typescript-eslint/no-var-requires

let context = await esbuild
    .context({
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        outdir: 'dist',
        packages: 'external',
        plugins: [inlineImage()]
    })
    .catch((e) => console.error(e.message));
await context.watch();
console.log('watching @cd/shared-ui context...');
