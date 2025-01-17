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
		middleware: 'src/middleware/index.ts',
		'point-of-sale': 'src/point-of-sale/index.ts',
		reducer: 'src/reducer/index.ts',
		seo: 'src/seo/index.ts',
		sms: 'src/sms/index.ts',
		types: 'src/types/index.ts',
		utils: 'src/utils/index.ts',
	},
	splitting: true,
	treeshake: true,
	clean: true,
	format: 'esm',
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
		'cookies-next'
	],
}));
