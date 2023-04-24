import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  splitting: true,
  treeshake: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  target: ['es2017', 'chrome70', 'edge18', 'firefox70', 'node16'],
  tsconfig: path.resolve('./tsconfig.build.json'),
  sourcemap: !options.watch,
  minify: !options.watch,
}));
