/** @type {import('next').NextConfig} */

const nodeEnv = process.env.NODE_ENV;
import { loadEnv } from '@cd/core-lib';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
expand(config({ path: loadEnv(nodeEnv) }));

const nextConfig = {
    basePath: '/app',
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    outputFileTracingRoot: path.join(__dirname, '../../'),
    images: {
        domains: ['cdn-cashy-static-assets.lucidchart.com']
    }
};

export default nextConfig;
