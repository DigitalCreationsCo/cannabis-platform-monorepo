import { config as configEnv } from 'dotenv';
import { expand } from 'dotenv-expand';
import {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
	PHASE_TEST,
} from 'next/constants.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from './src/config/loadEnv.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _env =
	process.env.NEXT_PUBLIC_IS_LOCAL_BUILD == '1'
		? 'development'
		: process.env.NODE_ENV;
expand(configEnv({ path: loadEnv(_env) }));
const parsedEnv = expand(configEnv({ path: loadEnv(_env) })).parsed;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = (phase) => {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	const isProd =
		phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
	const isStaging =
		phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';
	const isTest = phase === PHASE_TEST;

	console.info(
		`isDev:${isDev}
isProd:${isProd}
isStaging:${isStaging}
isTest:${isTest}`,
	);

	// measure cpu usage
	const startCpuUsage = process.cpuUsage();
	const now = Date.now();
	while (Date.now() - now < 1000);
	console.info(
		` 
CPU Usage:`,
		process.cpuUsage(startCpuUsage),
	);

	// measure memory usage
	console.info(
		` 
Memory Usage:`,
		process.memoryUsage(),
		`
		`,
	);

	/**
	 * @type {import('next').NextConfig}
	 */
	const config = {
		transpilePackages: [
			'@cd/eslint-config',
			'@cd/data-access',
			'@cd/core-lib',
			'@cd/ui-lib',
		],
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
			...parsedEnv,
			NEXT_PUBLIC_DOMAIN: (() =>
				isDev || isTest
					? 'http://localhost:3001'
					: 'https://grascannabis.org')(),
			BACKEND_URL: (() => {
				if (isDev) return 'http://localhost:6001';
				if (isProd) return 'https://backend.grascannabis.org';
				if (isStaging) return 'http://localhost:6001';
				if (isTest) return 'http://localhost:6001';
			})(),
			NEXT_PUBLIC_HELP_APP_URL: process.env.NEXT_PUBLIC_HELP_APP_URL,
			NEXT_PUBLIC_BLOG_APP_URL: process.env.NEXT_PUBLIC_BLOG_APP_URL,
			NEXT_PUBLIC_LOW_STOCK_THRESHOLD: 7,
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
				'cdn-cashy-static-assets.lucidchart.com',
				'https://storage.cloud.google.com',
				'www.storage.cloud.google.com',
				'storage.cloud.google.com',
			],
		},
	};
	return config;
};

export default nextConfig;
