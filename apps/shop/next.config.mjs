import withTranspiledModules from 'next-transpile-modules';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD, PHASE_TEST } from 'next/constants.js';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { loadEnv } from './src/config/loadEnv.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

expand(config({ path: loadEnv(process.env.NODE_ENV) }))

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = (phase) => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
    // when `next build` or `npm run build` is used
    const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';
    // when `test` command is used
    const isTest = phase === PHASE_TEST

    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging} isTest:${isTest}`);

    return withTranspiledModules([
        '@cd/ui-lib',
        '@cd/data-access',
        '@cd/eslint-config',
        '@cd/core-lib'
    ])({
        reactStrictMode: true,
        swcMinify: true,
        output: 'standalone',
        experimental: {
            outputFileTracingRoot: path.join(__dirname, '../../')
        },
        images: {
            domains: [
                'cdn-cashy-static-assets.lucidchart.com',
            ]
        },
        // webpack: (config, { isServer }) => {
        //     if (!isServer) {
        //       // Fixes npm packages that depend on `fs` module
        //       // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
        //       config.resolve.fallback = { ...config.resolve.fallback, fs: false };
        //     }
        
        //     return config;
        // },
    })
};

export default nextConfig;
