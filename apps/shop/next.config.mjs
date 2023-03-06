/** @type {import('next').NextConfig} */

const nodeEnv = process.env.NODE_ENV;
import { loadEnv } from '@cd/shared-config/config/loadEnv.js';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
expand(config({ path: loadEnv(nodeEnv) }));

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone'
};

export default nextConfig;
