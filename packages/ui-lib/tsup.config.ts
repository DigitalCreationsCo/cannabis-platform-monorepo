// import path from 'path';
// import { defineConfig } from 'tsup';
import { defineConfig } from 'tsup';

// export default defineConfig({
// 	entry: ['src/index.ts'], // Adjust the entry point if necessary
// 	// format: ['cjs', 'esm'], // Choose your desired formats
// 	format: ['esm'], // Choose your desired formats
// 	dts: true, // Generate type declarations
// 	splitting: true,
// 	treeshake: true,
// 	sourcemap: true,
// 	clean: true,
// 	external: [
// 		'@cd/data-access', // Mark core-lib as an external dependency
// 		'@cd/core-lib', // Mark core-lib as an external dependency
// 	],
// 	noExternal: [
// 		'@cd/ui-lib', // Do not bundle ui-lib when referenced externally
// 	],
// });

export default defineConfig((options) => ({
	entry: ['src/index.ts', 'src/components/index.ts'],
	// 	entry: ['src/**/*.ts'],
	splitting: true,
	treeshake: true,
	clean: true,
	// dts: true,
	format: ['esm'],
	platform: 'browser',
	target: ['es2020', 'chrome70', 'edge18', 'firefox70', 'node18'],
	tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
	sourcemap: !options.watch,
	minify: !options.watch,
	external: [
		'@cd/core-lib',
		'@cd/data-access',
		'@paralleldrive/cuid2',
		'path',
		'crypto',
		'fs',
		'zlib',
		'stream',
		// 		'react',
		// 		'react-dom',
		// 		'usehooks-ts',
		// 		'next/link',
		// 		'next/image',
		// 		'next/router',
		// 		'formik',
		// 		'find-up',
		// 		'mongodb',
		// 		'mongodb-client-encryption',
		// 		'kerberos',
		// 		'@mongodb-js/zstd',
		// 		'snappy',
		// 		'aws4',
		// 		'@mongodb-js/zstd-darwin-arm64',
		// 		'@napi-rs',
	],
}));

// export default defineConfig((options) => ({
// 	clean: true,
// 	sourcemap: true,
// 	entry: ['src/index.ts', 'src/components/index.ts'],
// 	// entry: ['src/**/*.ts'],
// 	// // entry: ['src/index.ts'],
// 	// bundle: false,
// 	format: ['esm', 'cjs'],
// 	// format: ['esm'],
// 	outDir: 'dist',
// 	splitting: true,
// 	treeshake: true,
// 	dts: true,
// 	skipNodeModulesBundle: true,
// 	esbuildOptions(options, context) {
// 		// the directory structure will be the same as the source
// 		options.outbase = './';
// 	},
// 	external: [
// 		'@cd/core-lib',
// 		'@cd/data-access',
// 		'@paralleldrive/cuid2',
// 		'path',
// 		'react',
// 		'react-dom',
// 		'usehooks-ts',
// 		'next/link',
// 		'next/image',
// 		'next/router',
// 		'formik',
// 		'find-up',
// 		'crypto',
// 		'mongodb',
// 		'mongodb-client-encryption',
// 		'kerberos',
// 		'@mongodb-js/zstd',
// 		'snappy',
// 		'aws4',
// 		'@mongodb-js/zstd-darwin-arm64',
// 		'@napi-rs',
// 	],
// 	platform: 'browser',
// 	// target: ['es2015', 'node18'],
// 	target: ['es2015', 'chrome70', 'edge18', 'firefox70', 'node18'],
// 	tsconfig: path.resolve('./tsconfig.build.json'),
// 	// sourcemap: !options.watch,
// 	minify: !options.watch,
// }));
