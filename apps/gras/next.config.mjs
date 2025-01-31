import withBundleAnalyzer from '@next/bundle-analyzer';
import { findEnv } from '../../packages/core/src/find/findEnv.js';

const _env = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
const environmentVariables = findEnv(_env);

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ...environmentVariables,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL, // app url
        NEXTAUTH_URL: process.env.NEXT_PUBLIC_SHOP_APP_URL, // next auth url
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET_GRAS, // next auth secret 
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    transpilePackages: [
        '@gras/core',
        '@gras/ui',
    ],
};

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default   bundleAnalyzer(nextConfig);
