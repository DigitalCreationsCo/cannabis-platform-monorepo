import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	...options,
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	target: ['es2015', 'node18'],
	tsconfig: path.resolve('./tsconfig.build.json'),
}));
