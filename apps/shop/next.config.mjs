/** @type {import('next').NextConfig} */

const nodeEnv = process.env.NODE_ENV;
import { loadEnv } from '@cd/shared-config/config/loadEnv.js';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

expand(config({ path: loadEnv(nodeEnv) }));
// const dashboardAppUrl = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;

const nextConfig = {
    // rewrites: async () => {
    //     return [
    //         {
    //             source: '/:path*',
    //             destination: '/:path*'
    //         },
    //         {
    //             source: '/app',
    //             destination: `${dashboardAppUrl}/app`
    //         },
    //         {
    //             source: '/app/:path*',
    //             destination: `${dashboardAppUrl}/app/:path*`
    //         }
    //     ];
    // },
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    experimental: {
        outputFileTracingRoot: path.join(__dirname, '../../')
    },
    images: {
        domains: ['cdn-cashy-static-assets.lucidchart.com']
    }
};

export default nextConfig;
