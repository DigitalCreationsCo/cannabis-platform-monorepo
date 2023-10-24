import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import withTranspiledModules from 'next-transpile-modules';
import {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
	PHASE_TEST,
} from 'next/constants.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from './src/config/loadEnv.mjs';
import source from 'shell-source';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _env =
	process.env.NEXT_PUBLIC_IS_LOCAL_BUILD == '1'
		? 'development'
		: process.env.NODE_ENV;
expand(config({ path: loadEnv(_env) }));

const nextConfig = (phase) => {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	const isProd =
		phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
	const isStaging =
		phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';
	const isTest = phase === PHASE_TEST;

	console.info(
		`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging} isTest:${isTest}`,
	);

	isDev
		? source('./scripts/get-redis-cart-nodes.sh', function (err) {
				if (err) return console.error(err);
				console.info('REDIS NODES: ', process.env.REDIS_NODES);
		  })
		: null;
	/**
	 * @type {import('next').NextConfig}
	 */
	const config = {
		rewrites: async () => [
			{
				source: '/help',
				destination: process.env.NEXT_PUBLIC_HELP_APP_URL + '/help',
			},
			{
				source: '/help/:path*',
				destination: process.env.NEXT_PUBLIC_HELP_APP_URL + '/help/:path*',
			},
			{
				source: '/blog',
				destination: process.env.NEXT_PUBLIC_BLOG_APP_URL + '/blog',
			},
			{
				source: '/blog/:path*',
				destination: process.env.NEXT_PUBLIC_BLOG_APP_URL + '/blog/:path*',
			},
		],
		webpack: (config) => {
			config.resolve.fallback = {
				...config.resolve.fallback,
				net: false,
				tls: false,
			};
			return config;
		},
		env: {
			BACKEND_URL: (() => {
				if (isDev) return 'http://localhost:6001';
				if (isProd) return 'https://backend.grascannabis.org';
				if (isStaging) return 'http://localhost:6001';
				if (isTest) return 'http://localhost:6001';
			})(),
			NEXT_PUBLIC_HELP_APP_URL: process.env.NEXT_PUBLIC_HELP_APP_URL,
			NEXT_PUBLIC_BLOG_APP_URL: process.env.NEXT_PUBLIC_BLOG_APP_URL,
			NEXT_PUBLIC_LOW_STOCK_THRESHOLD: 7,
			NEXT_PUBLIC_AVATAR_1:
				'https://storage.cloud.google.com/image-user/avatar1.png?authuser=1',
			NEXT_PUBLIC_AVATAR_2:
				'https://storage.cloud.google.com/image-user/avatar2.png?authuser=1',
			NEXT_PUBLIC_AVATAR_3:
				'https://storage.cloud.google.com/image-user/avatar3.png?authuser=1',
			NEXT_PUBLIC_AVATAR_4:
				'https://storage.cloud.google.com/image-user/avatar4.png?authuser=1',
			NEXT_PUBLIC_AVATAR_5:
				'https://storage.cloud.google.com/image-user/avatar5.png?authuser=1',
			NEXT_PUBLIC_AVATAR_6:
				'https://storage.cloud.google.com/image-user/avatar6.png?authuser=1',
			NEXT_PUBLIC_AVATAR_7:
				'https://storage.cloud.google.com/image-user/avatar7.png?authuser=1',
			NEXT_PUBLIC_AVATAR_8:
				'https://storage.cloud.google.com/image-user/avatar8.png?authuser=1',
		},
		reactStrictMode: true,
		swcMinify: true,
		output: 'standalone',
		experimental: {
			outputFileTracingRoot: path.join(__dirname, '../../'),
			// resolve javascript out of heap memory issue in development
			esmExternals: false,
		},
		images: {
			minimumCacheTTL: 60 * 60,
			domains: [
				'https://storage.cloud.google.com',
				'www.storage.cloud.google.com',
				'storage.cloud.google.com',
			],
		},
	};

	return withTranspiledModules([
		'@cd/eslint-config',
		'@cd/data-access',
		'@cd/core-lib',
		'@cd/ui-lib',
	])(config);
};

export default nextConfig;
