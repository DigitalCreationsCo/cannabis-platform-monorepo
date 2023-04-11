import * as esbuild from 'esbuild';

esbuild
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        outdir: 'dist',
        packages: 'external',
    })
    .catch((e) => console.error(e.message));
