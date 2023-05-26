import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  // splitting: true,
  // treeshake: true,
  // clean: true,
  // dts: true,
  // format: ['esm'],
  external: ['react-native', '@paralleldrive/cuid2', 'http', 'stream', 'path', 'react', 'react-dom'],
  // tsconfig: './tsconfig.build.json',
  // sourcemap: !options.watch,
  // minify: !options.watch,
}));
