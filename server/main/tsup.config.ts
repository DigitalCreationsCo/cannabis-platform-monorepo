import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts'],
	treeshake: false,
	dts: false,
	format: ['cjs'],
	// external: [
	//   '@paralleldrive/cuid2',
	//   'path',
	//   'react',
	//   'react-dom',
	//   'usehooks-ts',
	//   'next/link',
	//   'next/image',
	//   'next/router',
	//   'formik'
	// ],
	platform: 'node',
	target: ['es2015', 'node16'],
	tsconfig: path.resolve('./tsconfig.build.json'),
	sourcemap: false,
	minify: options.minify,
}));
