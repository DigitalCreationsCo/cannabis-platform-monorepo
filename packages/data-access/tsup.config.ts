import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
	return {
		entry: ['src/index.ts'],
		splitting: true,
		clean: true,
		dts: true,
		format: ['esm', 'cjs'],
		platform: 'node',
		target: ['node18'],
		tsconfig: path.resolve(__dirname, './tsconfig.build.json'),
		sourcemap: !options.watch,
		// Do not minify node only packages to let patching possible by the consumer (ie: patch-package)
		minify: false,
	};
});
