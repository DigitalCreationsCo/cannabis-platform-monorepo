import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import withTranspiledModules from 'next-transpile-modules';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD, PHASE_TEST } from 'next/constants.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from './src/config/loadEnv.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _env = process.env.NEXT_PUBLIC_IS_LOCAL_BUILD=='1' ? 'development' : process.env.NODE_ENV;
expand(config({ path: loadEnv(process.env.NODE_ENV) }))

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = (phase) => {

    const isDev     = phase === PHASE_DEVELOPMENT_SERVER;
    const isProd    = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
    const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';
    const isTest    = phase === PHASE_TEST;

    console.info(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging} isTest:${isTest}`);

    const config = {
        env: {
            BACKEND_URL: (() => {
                if (isDev) return 'http://localhost:6001';
                if (isProd) return 'https://backend.grascannabis.org';
                if (isStaging) return 'http://localhost:6001';
                if (isTest) return 'http://localhost:6001';
            })(),

            NEXT_PUBLIC_LOW_STOCK_THRESHOLD: 7,
        },
        reactStrictMode: true,
        swcMinify: true,
        output: 'standalone',
        experimental: {
            outputFileTracingRoot: path.join(__dirname, '../../'),
        },
        images: {
            domains: [
                'cdn-cashy-static-assets.lucidchart.com'
            ]
        }
    };
    
    return withTranspiledModules([
        '@cd/ui-lib',
        '@cd/data-access',
        '@cd/eslint-config',
        '@cd/core-lib'
    ])(config);
};

export default nextConfig;
