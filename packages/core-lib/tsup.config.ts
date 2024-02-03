import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	...options,
	splitting: true,
	// //   clean: true, // clean up the dist folder
	// dts: true, // generate dts files
	// format: ['cjs', 'esm'], // generate cjs and esm files
	// //   minify: env === 'production',
	// //   bundle: env === 'production',
	// // skipNodeModulesBundle: true,
	// //   entryPoints: ['src/index.ts'],
	// //   watch: env === 'development',
	// //   target: 'es2020',
	// outDir: 'dist',
	// entry: ['src/**/*.ts'], // include all files under src

	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	target: ['es2015', 'node18'],
	tsconfig: path.resolve('./tsconfig.build.json'),
}));
