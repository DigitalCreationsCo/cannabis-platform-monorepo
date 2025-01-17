import withBundleAnalyzer from '@next/bundle-analyzer';
import { findEnv } from '@gras/core/find/findEnv';
import withNextIntl from 'next-intl/plugin';
import path from 'path';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const withNextIntlConfig = withNextIntl('./lib/i18n.ts');

const _env = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
const environmentVariables = findEnv(_env);

// create config before providers
const config = bundleAnalyzer(
{
    reactStrictMode: false,
    transpilePackages: [
      '@gras/eslint-config',
      '@gras/data-access',
      '@gras/core',
      '@gras/ui',
    ],
    env: {
      ...environmentVariables,
      NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL, // app url
      NEXTAUTH_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL, // next auth url
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET_GRAS, // next auth secret 
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io'
        },
        { protocol: 'https',
          hostname: 'source.unsplash.com'
        },
        { protocol: 'https',
          hostname: 'unsplash.com'
        },
        { protocol: 'https',
          hostname: 's3.amazonaws.com'
        },
        {
          protocol: 'https',
          hostname: 'files.stripe.com'
        }
      ]
    },
    rewrites: async () => {
      return [
        {
          source: '/robots.txt',
          destination: '/api/robots',
        },
      ];
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        require(path.resolve('./scripts/generate-gras-sitemap'));
      }


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
  }
);

export default withNextIntlConfig(config)