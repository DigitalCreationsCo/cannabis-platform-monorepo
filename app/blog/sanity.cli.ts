import path from 'path';
import { loadEnvConfig } from '@next/env';
import { defineCliConfig } from 'sanity/cli';
const dev = process.env.NODE_ENV !== 'production';
loadEnvConfig('../..', dev, { info: () => null, error: console.error });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
	api: { projectId, dataset },
	vite: (config) => {
		if (!config.resolve) config.resolve = {};
		if (!config.resolve.alias) config.resolve.alias = {};

		config.resolve.alias = {
			...config.resolve.alias,
			lib: path.resolve(__dirname, 'lib'),
			components: path.resolve(__dirname, 'components'),
			pages: path.resolve(__dirname, 'pages'),
			plugins: path.resolve(__dirname, 'plugins'),
			schemas: path.resolve(__dirname, 'schemas'),
		};

		return config;
	},
});
