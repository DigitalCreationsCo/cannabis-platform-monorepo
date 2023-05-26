import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  splitting: false,
  treeshake: false,
  clean: false,
  dts: true,
  format: ['esm', 'cjs'],
  // external: ['@cd/core-lib', '@paralleldrive/cuid2', 'path', 'react', 'react-dom'],
  external: ['@cd/core-lib', 'react', 'react-dom', 'react-native', '@paralleldrive/cuid2', 'http', 'https', 'path', 'zlib', 'stream'],
  platform: 'node',
  target: ['es2015'],
  tsconfig: path.resolve('./tsconfig.build.json'),
  sourcemap: !options.watch,
  minify: !options.watch,
}));
