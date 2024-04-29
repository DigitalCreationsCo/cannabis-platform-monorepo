/* eslint @typescript-eslint/no-var-requires: "off" */
import i18nConfig from './next-i18next.config.js';
import { withSentryConfig } from '@sentry/nextjs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { config as configEnv } from 'dotenv';
import { expand } from 'dotenv-expand';
import findUp from 'find-up';

const _env =
  process.env.NEXT_PUBLIC_IS_LOCAL_BUILD == '1'
    ? 'development'
    : process.env.NODE_ENV;

expand(configEnv({ path: findUp.sync(`.env.${_env}`) }));

const { i18n } = i18nConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
    outputFileTracingRoot: path.join(__dirname, '../../'),
    webpackBuildWorker: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [
    '@cd/eslint-config',
    '@cd/data-access',
    '@cd/core-lib',
    '@cd/ui-lib',
  ],
  webpack: (config, { isServer }) => {
    // const prefix = config.assetPrefix ?? config.basePath ?? '';

    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            // publicPath: `${prefix}/_next/static/media/`,
            publicPath: `/_next/static/media/`,
            outputPath: `${isServer ? '../' : ''}static/media/`,
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      dns: false,
      fs: false,
      tls: false,
    };
    return config;
  },
  env: {
    NEXT_PUBLIC_SHOP_APP_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL
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
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boxyhq.com',
      },
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
        source: '/.well-known/saml.cer',
        destination: '/api/well-known/saml.cer',
      },
      {
        source: '/.well-known/saml-configuration',
        destination: '/well-known/saml-configuration',
      },
    ];
  },
  sentry: {
    hideSourceMaps: true,
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
};

// Additional config options for the Sentry webpack plugin.
// For all available options: https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  silent: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
