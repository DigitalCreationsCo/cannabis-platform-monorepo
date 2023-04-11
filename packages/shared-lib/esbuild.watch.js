import * as esbuild from 'esbuild';

let context = await esbuild
    .context({
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        outdir: 'dist',
        packages: 'external',
    })
    .catch((e) => console.error(e.message));
await context.watch();
console.log('watching @cd/shared-lib context...');
