const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const { config: configEnv } = require('dotenv');
const { expand } = require('dotenv-expand');
const findUp = require('find-up');
const workspaceRoot = path.join(__dirname, '../../');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const _env =
	process.env.NEXT_PUBLIC_IS_LOCAL_BUILD == '1'
		? 'development'
		: process.env.NODE_ENV;

const sentryWebpackPluginOptions = {
	silent: true,
	hideSourceMaps: true,
};
// Additional config options for the Sentry webpack plugin.
// For all available options: https://github.com/getsentry/sentry-webpack-plugin#options.

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
	env: {
		...expand(configEnv({ path: findUp.sync(`.env.${_env}`) })).parsed,
		NEXT_PUBLIC_SHOP_APP_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL,
		NEXTAUTH_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET_GRAS,
	},
	experimental: {
		externalDir: true,
		optimizePackageImports: [
			'@retracedhq/logs-viewer',
			'@retracedhq/retraced',
			'sharp',
		],
		esmExternals: true,
		// webpackBuildWorker: true,
		outputFileTracingRoot: workspaceRoot,
		// turbotrace: {
		// 	// control the log level of the turbotrace, default is `error`
		// 	logLevel: 'info',
		// 	// control if the log of turbotrace should contain the details of the analysis, default is `false`
		// 	logDetail: true,
		// 	// show all log messages without limit
		// 	// turbotrace only show 1 log message for each categories by default
		// 	logAll: false,
		// 	// control the context directory of the turbotrace
		// 	// files outside of the context directory will not be traced
		// 	// set the `outputFileTracingRoot` has the same effect
		// 	// if the `outputFileTracingRoot` and this option are both set, the `experimental.turbotrace.contextDirectory` will be used
		// 	// contextDirectory?: string
		// 	// if there is `process.cwd()` expression in your code, you can set this option to tell `turbotrace` the value of `process.cwd()` while tracing.
		// 	// for example the require(process.cwd() + '/package.json') will be traced as require('/path/to/cwd/package.json')
		// 	// processCwd?: string
		// 	// control the maximum memory usage of the `turbotrace`, in `MB`, default is `6000`.
		// 	// memoryLimit?: number
		// },
	},
	reactStrictMode: true,
	compiler: {
		removeConsole:
			_env === 'production'
				? {
						exclude: ['error'],
					}
				: {},
	},
	swcMinify: true,
	transpilePackages: [
		'@cd/eslint-config',
		'@cd/data-access',
		'@cd/core-lib',
		'@cd/ui-lib',
	],
	webpack: (config, { isServer }) => {
		if (isServer) {
			require(path.resolve('./scripts/generate-gras-sitemap'));
		}

		// const prefix = config.assetPrefix ?? config.basePath ?? '';
		config.module.rules.push(
			{
				test: /\.mp4$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: `/_next/static/media/`,
							outputPath: `${isServer ? '../' : ''}static/media/`,
							name: '[name].[hash].[ext]',
						},
					},
				],
			},
			{ test: /\.txt$/, use: 'raw-loader' },
			{
				test: /\.node$/,
				loader: 'node-loader',
			}
		);

		config.resolve.fallback = {
			...config.resolve.fallback,
			net: false,
			dns: false,
			fs: false,
			tls: false,
			'mongodb-client-encryption': false,
			aws4: false,
			snappy: false,
			'@mongodb-js/zstd': false,
			'@mongodb-js/zstd-darwin-arm64': false,
			'@napi-rs': false,
			kerberos: false,
		};
		return config;
	},

	images: {
		minimumCacheTTL: 60 * 60,
		domains: [
			'https://storage.cloud.google.com',
			'www.storage.cloud.google.com',
			'storage.cloud.google.com',
			'cdn.sanity.io',
			'source.unsplash.com',
			'storage.googleapis.com',
			'unsplash.com',
			's3.amazonaws.com',
			'img.evbuc.com',
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'files.stripe.com',
			},
		],
	},
	i18n,
	rewrites: async () => {
		return [
			{
				source: '/robots.txt',
				destination: '/api/robots',
			},
		];
	},

	async headers() {
		return [
			{
				source: '/(.*?)',
				headers: [
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=31536000; includeSubDomains;',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
				],
			},
		];
	},
});

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
