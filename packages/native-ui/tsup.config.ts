/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	// // skipNodeModulesBundle: true,
	// // entryPoints: ['src/index.ts'],
	// // entry: ['src/**/*.{js,jsx,ts,tsx}'],
	entry: ['src/index.ts'],
	// // splitting: true,
	// // treeshake: true,
	// // clean: true, // clean up the dist folder
	// dts: true, // generate dts files
	format: ['esm', 'cjs'], // generate
	external: [
		// 'stream',
		// 'document',
		// 'react-hook-form',
		// 'tailwind-merge',
		// 'react-hot-toast',
		// 'crypto',
		// 'crypto-js',
		// 'react',
		// 'react-dom',
		// 'react-native',
		// '@paralleldrive/cuid2',
		// 'http',
		// 'https',
		// 'path',
		// 'zlib',
		// 'stream',
	],
	// // bundle: !options.watch,
	
	// platform: 'node',
	target: 'es2020',
	tsconfig: path.resolve('./tsconfig.build.json'),
	sourcemap: !options.watch,
	minify: !options.watch,
	bundle: !options.watch,
	loader: { '.js': 'jsx' },
	outDir: 'dist',
}));
