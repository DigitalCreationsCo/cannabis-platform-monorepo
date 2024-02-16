import path from 'path';
import { defineConfig } from 'tsup';
const env = process.env.NODE_ENV;

export default defineConfig((options) => ({
	...options,
	splitting: true,
	clean: true, // clean up the dist folder
	dts: true, // generate dts files
	minify: env === 'production',
	bundle: env === 'production',
	skipNodeModulesBundle: true,
	watch: env === 'development',
	outDir: 'dist',

	entryPoints: ['src/index.ts'],
	// entry: ['src/index.ts'],
	entry: ['src/**/*.ts'],
	format: ['cjs', 'esm'],
	target: ['es2015', 'node18'],
	tsconfig: path.resolve('./tsconfig.build.json'),
}));
