import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    remotePatterns: [
      'cdn.sanity.io',
			'source.unsplash.com',
			'unsplash.com',
			's3.amazonaws.com',
      {
        protocol: 'https',
        hostname: files.stripe.com
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
});
