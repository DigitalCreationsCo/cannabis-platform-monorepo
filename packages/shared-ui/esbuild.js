import * as esbuild from 'esbuild';
import inlineImage from 'esbuild-plugin-inline-image';
// eslint-disable-next-line @typescript-eslint/no-var-requires

esbuild
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        outdir: 'dist',
        packages: 'external',
        plugins: [inlineImage()]
    })
    .catch((e) => console.error(e.message));
