/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
        domains: ['cdn-cashy-static-assets.lucidchart.com'],
    },
};

module.exports = nextConfig;
