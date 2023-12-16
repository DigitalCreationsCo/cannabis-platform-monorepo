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
import { loadEnv } from './config/loadEnv.mjs';

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
	/**
	 * @type {import('next').NextConfig}
	 */
	const config = {
		basePath: '/blog',
		webpack: (config) => {
			// if (!config.resolve) config.resolve = {};

			config.resolve.fallback = {
				...config.resolve.fallback,
				net: false,
				tls: false,
			};

			const customAliases = {
				lib: path.resolve(__dirname, 'src/lib'),
				components: path.resolve(__dirname, 'src/components'),
				pages: path.resolve(__dirname, 'src/pages'),
				plugins: path.resolve(__dirname, 'src/plugins'),
				schemas: path.resolve(__dirname, 'src/schemas'),
			};

			if (!config.resolve.alias) {
				config.resolve.alias = { ...customAliases };
			} else {
				config.resolve.alias = {
					...config.resolve.alias,
					...customAliases,
				};
			}
			return config;
		},
		env: {
			BACKEND_URL: (() => {
				if (isDev) return 'http://localhost:6001';
				if (isProd) return 'https://backend.grascannabis.org';
				if (isStaging) return 'http://localhost:6001';
				if (isTest) return 'http://localhost:6001';
			})(),
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
				'cdn.sanity.io',
				'source.unsplash.com',
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
