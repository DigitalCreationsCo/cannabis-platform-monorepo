/* eslint-disable @typescript-eslint/naming-convention */
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: {
		index: 'src/index.ts',
		auth: 'src/auth/index.ts',
		constants: 'src/constants/index.ts',
		crm: 'src/crm/index.ts',
		'cron-job': 'src/cron-job/index.ts',
		find: 'src/find/index.ts',
		hooks: 'src/hooks/index.ts',
		lib: 'src/lib/index.ts',
		locales: 'src/locales/index.ts',
		'point-of-sale': 'src/point-of-sale/index.ts',
		seo: 'src/seo/index.ts',
		sms: 'src/sms/index.ts',
		types: 'src/types/index.ts',
		utils: 'src/utils/index.ts',
	},
	splitting: true,
	treeshake: true,
	clean: true,
	format: ['esm', 'cjs'],
	dts: true,
	target: ['es2020'],
	outDir: 'dist',
	bundle: true,
	tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
	sourcemap: !options.watch,
	minify: !options.watch,
	external: [
		'crypto',
		'mongodb',
		'mongodb-client-encryption',
		'kerberos',
		'@mongodb-js/zstd',
		'snappy',
		'aws4',
		'@mongodb-js/zstd-darwin-arm64',
		'@napi-rs',
		'cookies-next'
	],
}));
