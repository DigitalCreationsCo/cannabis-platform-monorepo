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
    // const env_1 = {
    //     NEXT_PUBLIC_SHOP_APP_URL: (() => {
    //         if (isDev) return 'http://localhost:3000';
    //         if (isProd) return 'https://localhost:3000';
    //         if (isStaging) return 'https://localhost:3000';
    //         if (isTest) return 'https://localhost:3000';
    //         return 'NEXT_PUBLIC_SHOP_APP_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     NEXT_PUBLIC_DASHBOARD_APP_URL: (() => {
    //         if (isDev) return 'http://localhost:3001';
    //         if (isProd) {
    //             return 'http://localhost:3001';
    //         }
    //         if (isStaging) return 'http://localhost:3001';
    //         if (isTest) return 'https://localhost:3001';
    //         return 'NEXT_PUBLIC_DASHBOARD_APP_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SERVER_MAIN_URL: (() => {
    //         if (isDev) return 'http://localhost:6001';
    //         if (isProd) {
    //             return 'http://localhost:6001';
    //         }
    //         if (isStaging) return 'http://localhost:6001';
    //         if (isTest) return 'https://localhost:6001';
    //         return 'SERVER_MAIN_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SERVER_LOCATION_URL: (() => {
    //         if (isDev) return 'http://localhost:6011';
    //         if (isProd) {
    //             return 'http://localhost:6011';
    //         }
    //         if (isStaging) return 'http://localhost:6011';
    //         if (isTest) return 'https://localhost:6011';
    //         return 'SERVER_LOCATION_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SERVER_PAYMENTS_URL: (() => {
    //         if (isDev) return 'http://localhost:6021';
    //         if (isProd) {
    //             return 'http://localhost:6021';
    //         }
    //         if (isStaging) return 'http://localhost:6021';
    //         if (isTest) return 'https://localhost:6021';
    //         return 'SERVER_PAYMENTS_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SERVER_IMAGE_URL: (() => {
    //         if (isDev) return 'http://localhost:6031';
    //         if (isProd) {
    //             return 'http://localhost:6031';
    //         }
    //         if (isStaging) return 'http://localhost:6031';
    //         if (isTest) return 'https://localhost:6031';
    //         return 'SERVER_IMAGE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SUPERTOKENS_CONNECTION_URI: (() => {
    //         if (isDev) return 'http://localhost:3567';
    //         if (isProd) {
    //             return 'http://localhost:3567';
    //         }
    //         if (isStaging) return 'http://localhost:3567';
    //         if (isTest) return 'https://localhost:3567';
    //         return 'SUPERTOKENS_CONNECTION_URI:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     DATABASE_URL: (() => {
    //         if (isDev)
    //             return 'mysql://jb9if8nvve9l9g0399cs:pscale_pw_bMnzYmBLzWe2McbF8Nb1kH8cSRjyfvYZtU3G9678WEv@us-east.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=strict';
    //         if (isProd)
    //             return 'mysql://9zr5koln0y91fhumaiit:pscale_pw_rP9RqnT4pAkmmUawnaX67bkYr6AUAWJ2pBqhO9qVBpV@us-east.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=strict';
    //         if (isStaging)
    //             return 'mysql://jb9if8nvve9l9g0399cs:pscale_pw_bMnzYmBLzWe2McbF8Nb1kH8cSRjyfvYZtU3G9678WEv@us-east.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=strict';
    //         if (isTest) return 'mysql://jb9if8nvve9l9g0399cs:pscale_pw_bMnzYmBLzWe2McbF8Nb1kH8cSRjyfvYZtU3G9678WEv@us-east.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=strict';
    //         return 'DATABASE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SHADOW_DATABASE_URL: (() => {
    //         if (isDev) return 'mysql://root:secret@localhost:6603/shadowdb';
    //         if (isProd)
    //             return 'mysql://shadow-db-1:4eyKYN+C#?&n3%R@139-144-253-195.ip.linodeusercontent.com:3306/shadow_db';
    //         if (isStaging) return 'mysql://root:secret@localhost:6603/shadowdb';
    //         if (isTest) return 'mysql://root:secret@localhost:6603/shadowdb';
    //         return 'SHADOW_DATABASE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     MONGODB_URL: (() => {
    //         if (isDev) return 'mongodb+srv://dbDev1:wYaMFDyhZJDy0i5y@cluster0.ckvbf.mongodb.net/?retryWrites=true&w=majority';
    //         if (isTest) return 'mongodb+srv://dbDev1:wYaMFDyhZJDy0i5y@cluster0.ckvbf.mongodb.net/?retryWrites=true&w=majority';
    //     })(),
    //     LOCATION_IQ_GEOCODE_URL: (() => {
    //         if (isDev) return 'https://us1.locationiq.com/v1/search';
    //         if (isStaging) return 'https://us1.locationiq.com/v1/search';
    //         if (isProd) return 'https://us1.locationiq.com/v1/search';
    //         if (isTest) return 'https://us1.locationiq.com/v1/search';
    //     })(),
    //     LOCATION_IQ_REVERSE_GEOCODE_URL: (() => {
    //         if (isDev) return 'https://us1.locationiq.com/v1/reverse';
    //         if (isStaging) return 'https://us1.locationiq.com/v1/reverse';
    //         if (isProd) return 'https://us1.locationiq.com/v1/reverse';
    //         if (isTest) return 'https://us1.locationiq.com/v1/reverse';
    //     })()
    // };

    // const env_2 = {
    //     SUPERTOKENS_DASHBOARD_KEY: (() => {
    //         if (isDev) return 'l87ZtvrDXHQZdqalA=M8j7r5=JmLDx';
    //         if (isProd) {
    //             return 'l87ZtvrDXHQZdqalA=M8j7r5=JmLDx';
    //         }
    //         if (isStaging) return 'l87ZtvrDXHQZdqalA=M8j7r5=JmLDx';
    //         if (isTest) return 'l87ZtvrDXHQZdqalA=M8j7r5=JmLDx';
    //         return 'SUPERTOKENS_DASHBOARD_KEY:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     LOCATION_IQ_API_KEY: (() => {
    //         if (isDev) return 'pk.278b66a869a9b35b4ffd5c90d5f58278';
    //         if (isProd) {
    //             return 'pk.278b66a869a9b35b4ffd5c90d5f58278';
    //         }
    //         if (isStaging) return 'pk.278b66a869a9b35b4ffd5c90d5f58278';
    //         if (isTest) return 'pk.278b66a869a9b35b4ffd5c90d5f58278';
    //         return 'LOCATION_IQ_API_KEY:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })()
    // };

    // const env_3 = {
    //     NEXT_PUBLIC_SHOP_APP_NAME: (() => {
    //         return 'Gras Cannabis Marketplace';
    //     })(),
    //     NEXT_PUBLIC_DASHBOARD_APP_NAME: (() => {
    //         return 'Gras Cannabis Marketplace';
    //     })(),
    //     GEO_DB_NS: (() => {
    //         return 'Gras_geoDB';
    //     })(),
    //     PASSWORD_RESET_EXPIRY_MINS: (() => {
    //         return 15;
    //     })(),
    //     PASSWORD_SALT_ROUNDS: (() => {
    //         return 12;
    //     })()
    // };

    const rewrites = async () => {
        return [
            {
                source: '/:path*',
                destination: '/:path*'
            },
            {
                source: '/app',
                destination: `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/app`
            },
            {
                source: '/app/:path*',
                destination: `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/app/:path*`
            }
        ];
    };

    return withTranspiledModules([
        '@cd/ui-lib',
        '@cd/data-access',
        '@cd/eslint-config',
        '@cd/core-lib'
    ])({
        // env: {
        //     ...env_1,
        //     ...env_2,
        //     ...env_3
        // },
        rewrites,
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
