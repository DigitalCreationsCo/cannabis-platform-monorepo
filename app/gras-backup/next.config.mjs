import findUp from 'find-up'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import path from 'path'

const env = process.env.NODE_ENV;

/** @type {import('next').NextConfig} */
const nextConfig = {
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

  env: {
		...expand(config({ path: findUp.sync(`.env.${env}`)})).parsed,
		NEXT_PUBLIC_SHOP_APP_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL,
		NEXTAUTH_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET_GRAS,
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

  reactStrictMode: true,

  rewrites: async () => {
		return [
			{
				source: '/robots.txt',
				destination: '/api/robots',
			},
		];
	},

  transpilePackages: [
    '@cd/eslint-config',
		'@cd/data-access',
		'@cd/core-lib',
		'@cd/ui-lib',
  ],
  
  webpack: (config, { isServer }) => {
    if (isServer) {
			import(path.resolve('./scripts/generate-gras-sitemap.js'));
		}

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
  }
};

export default nextConfig;
