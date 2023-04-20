import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  // console.log('database url: ', process.env.DATABASE_URL)
  return {
    // env: {
    //   NODE_ENV: process.env.NODE_ENV,
    //   DATABASE_URL: process.env.DATABASE_URL,
    //   SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    //   MONGODB_URL: process.env.MONGODB_URL,
    //   GEO_DB_NS: process.env.GEO_DB_NS
    // },
    entry: ['src/index.ts'],
    splitting: true,
    clean: true,
    dts: true,
    format: ['esm', 'cjs'],
    platform: 'node',
    target: ['node16'],
    tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
    sourcemap: !options.watch,
    // Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
    minify: false,
  };
});
