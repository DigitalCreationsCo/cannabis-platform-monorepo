import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  splitting: false,
  treeshake: false,
  clean: false,
  dts: false,
  format: ['esm', 'cjs'],
  external: ['@cd/core-lib', 'react', 'react-dom', 'react-native', '@paralleldrive/cuid2', 'http', 'https', 'path', 'zlib', 'stream'],
  platform: 'node',
  target: 'esnext',
  tsconfig: path.resolve('./tsconfig.build.json'),
  sourcemap: !options.watch,
  minify: !options.watch,
}));
