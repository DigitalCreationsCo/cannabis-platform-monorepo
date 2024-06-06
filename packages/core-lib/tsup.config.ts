// import path from 'path';
// import { defineConfig } from 'tsup';

// export default defineConfig((options) => ({
// 	...options,
// 	splitting: true,
// 	clean: true, // clean up the dist folder
// 	// dts: true, // generate dts files
// 	// minify: env === 'production',
// 	// bundle: env === 'production',
// 	// skipNodeModulesBundle: false,
// 	skipNodeModulesBundle: true,
// 	// watch: env === 'development',
// 	outDir: 'dist',
// 	external: [
// 		'crypto',
// 		'@cd/data-access',
// 		'mongodb',
// 		'mongodb-client-encryption',
// 		'kerberos',
// 		'@mongodb-js/zstd',
// 		'snappy',
// 		'aws4',
// 		'@mongodb-js/zstd-darwin-arm64',
// 		'@napi-rs',
// 	],

// 	// entryPoints: ['src/index.ts'],
// 	// entry: ['src/index.ts'],
// 	entry: ['src/**/*.ts'],
// 	format: ['cjs', 'esm'],
// 	target: ['es2015', 'node18'],
// 	tsconfig: path.resolve('./tsconfig.build.json'),
// }));

import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts'],
	splitting: true,
	treeshake: true,
	clean: true,
	// dts: true,
	format: ['esm'],
	// platform: 'browser',
	target: ['es2020', 'chrome80', 'edge18', 'firefox70', 'node18'],
	tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
	sourcemap: !options.watch,
	minify: !options.watch,
	external: [
		// 'swr'
	],
	// external: [
	// 	'@cd/data-access', // Mark core-lib as an external dependency
	// ],
	// noExternal: [
	// 	'@cd/core-lib', // Do not bundle ui-lib when referenced externally
	// ],
}));
