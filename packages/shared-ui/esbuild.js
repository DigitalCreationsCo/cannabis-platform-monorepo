// import dts from 'dts-bundle';
import * as esbuild from 'esbuild';
import inlineImage from 'esbuild-plugin-inline-image';

esbuild
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        outdir: 'dist',
        packages: 'external',
        assetNames: 'assets/[name]',
        loader: { '.png': 'file' },
        plugins: [inlineImage({ base64: true })]
    })
    .catch((e) => console.error(e.message));

// dts.bundle({
//     name: '@cd/shared-ui',
//     main: 'dist/index.d.ts'
// });
