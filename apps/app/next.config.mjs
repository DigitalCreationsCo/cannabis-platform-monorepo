/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
import { findUpSync } from 'find-up';
const nodeEnv = process.env.NODE_ENV;

export const findEnv = (env) => findUpSync('.env.' + env);
dotenv.config({ path: findEnv(nodeEnv) });

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
        domains: ['cdn-cashy-static-assets.lucidchart.com'],
    },
};

export default nextConfig;
