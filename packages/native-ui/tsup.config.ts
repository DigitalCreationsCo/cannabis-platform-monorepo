/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts'],
	splitting: false,
	treeshake: false,
	clean: false,
	dts: false,
	format: ['esm'],
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
	],
	// platform: 'node',
	target: 'esnext',
	tsconfig: path.resolve('./tsconfig.build.json'),
	sourcemap: !options.watch,
	minify: !options.watch,
	loader: { '.js': 'jsx' },
}));
