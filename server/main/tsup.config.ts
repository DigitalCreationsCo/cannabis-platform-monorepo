import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts'],
	treeshake: false,
	dts: false,
	format: ['cjs'],
	platform: 'node',
	target: ['es2015', 'node16'],
	tsconfig: path.resolve('./tsconfig.build.json'),
	sourcemap: false,
	minify: options.minify,
}));
