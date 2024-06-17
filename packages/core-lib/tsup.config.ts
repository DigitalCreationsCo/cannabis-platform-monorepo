import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts'],
	splitting: true,
	treeshake: true,
	clean: true,
	format: ['esm'],
	target: ['es2020', 'chrome80', 'edge18', 'firefox70', 'node18'],
	tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
	sourcemap: !options.watch,
	minify: !options.watch,
	external: [
		'mongodb',
		'mongodb-client-encryption',
		'kerberos',
		'@mongodb-js/zstd',
		'snappy',
		'aws4',
		'@mongodb-js/zstd-darwin-arm64',
		'@napi-rs',
	],
}));
