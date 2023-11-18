/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts'],
	// splitting: true,
	// treeshake: true,
	// clean: false,
	// dts: false,
	format: ['esm', 'cjs'],
	external: [
		'document',
		'@cd/core-lib',
		'react-hook-form',
		'tailwind-merge',
		'react-hot-toast',
		'react',
		'react-dom',
		'react-native',
		'@paralleldrive/cuid2',
		'http',
		'https',
		'path',
		'zlib',
		'stream',
		'crypto',
	],
	// platform: 'node',
	target: 'es2020',
	tsconfig: path.resolve('./tsconfig.build.json'),
	sourcemap: !options.watch,
	minify: !options.watch,
	loader: { '.js': 'jsx' },
}));
