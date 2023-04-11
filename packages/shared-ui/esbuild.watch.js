import * as esbuild from 'esbuild';
import inlineImage from 'esbuild-plugin-inline-image';

let context = await esbuild
    .context({
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        outdir: 'dist',
        packages: 'external',
        assetNames: 'assets/[name]',
        loader: { '.png': 'file' },
        plugins: [inlineImage()]
    })
    .catch((e) => console.error(e.message));
await context.watch();
console.log('watching @cd/shared-ui context...');
