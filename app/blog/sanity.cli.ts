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

		const customAliases = {
			lib: path.resolve(__dirname, 'src/lib'),
			components: path.resolve(__dirname, 'src/components'),
			pages: path.resolve(__dirname, 'src/pages'),
			plugins: path.resolve(__dirname, 'src/plugins'),
			schemas: path.resolve(__dirname, 'src/schemas'),
		};

		if (!config.resolve.alias) {
			config.resolve.alias = { ...customAliases };
		} else {
			config.resolve.alias = {
				...config.resolve.alias,
				...customAliases,
			};
		}

		return config;
	},
});
