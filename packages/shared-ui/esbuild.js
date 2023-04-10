import * as esbuild from 'esbuild';
import inlineImage from 'esbuild-plugin-inline-image';

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true,
    outdir: 'dist',
    // outfile: 'dist/index.js',
    packages: 'external',
    plugins: [inlineImage()]
});
