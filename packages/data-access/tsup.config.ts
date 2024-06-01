// import path from 'path';
// import { defineConfig } from 'tsup';

// export default defineConfig((options) => {
// 	return {
// 		entry: ['src/**/*.ts'],
// 		splitting: true,
// 		clean: true,
// 		dts: true,
// 		format: ['esm', 'cjs'],
// 		platform: 'node',
// 		target: ['node18'],
// 		external: [
// 			// 'mongodb',
// 			'mongodb-client-encryption',
// 			'kerberos',
// 			'@mongodb-js/zstd',
// 			'snappy',
// 			'aws4',
// 			'@mongodb-js/zstd-darwin-arm64',
// 			'@napi-rs',
// 		],
// 		tsconfig: path.resolve(__dirname, './tsconfig.build.json'),
// 		sourcemap: !options.watch,
// 		// Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
// 		minify: false,
// 	};
// });

import { defineConfig } from 'tsup';

export default defineConfig((options) => {
	return {
		// entry: ['src/**/*.ts', 'src/types/', 'src/db', '/src/helpers'],
		entry: ['src/**/*.ts'],
		splitting: true,
		clean: true,
		dts: true,
		format: ['esm'],
		platform: 'node',
		target: ['node18'],
		tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
		sourcemap: !options.watch,
		// Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
		minify: false,

		// format: ['cjs', 'esm'], // Choose your desired formats
		// external: [],
		// noExternal: [
		// 	'@cd/data-access', // Do not bundle ui-lib when referenced externally
		// ],
	};
});
