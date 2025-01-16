import { StorybookConfig } from '@storybook/nextjs/*';
import { join, dirname } from 'path';
import SpeedMeasurePlugin from "speed-measure-webpack-plugin"
const smp = new SpeedMeasurePlugin();

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
	// babel: async (options) => {
	// 	const babelConfig = require("./babel.config.js");
	// 	return { ...options, ...babelConfig };
	// },
	framework: {
		name: getAbsolutePath("@storybook/nextjs"),
		options: {},
	},
	stories: ['../**/src/**/*.mdx', '../**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: ['../packages/ui/public', '../app/gras/public', '../app/dashboard/public'],
	addons: [
		getAbsolutePath('storybook-addon-performance')
		// getAbsolutePath('@storybook/addon-links'),
		// getAbsolutePath('@storybook/addon-essentials'),
		// getAbsolutePath('@storybook/addon-onboarding'),
		// getAbsolutePath('@storybook/addon-interactions'),
		// getAbsolutePath("@storybook/addon-styling-webpack"),
	],
	typescript: {
		check: false,
	},
	env: (config) => ({
		...config,
		NEXT_PUBLIC_CRYPTO_SK: 'fbef9dc0bfb900f5ae110c38ca726bfa',
	}),
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async(config, options) => {
		// Disable source maps for faster builds
		// config.devtool = false;
    
		// Reduce the number of plugins used by Webpack
		// config.plugins = config?.plugins?.filter(
		//   plugin => plugin?.constructor.name !== 'SomeSlowPlugin'
		// );

		config.resolve!.fallback = {
			...config.resolve!.fallback || {},
			net: false,
			dns: false,
			fs: false,
			tls: false,
			'mongodb-client-encryption': false,
			'aws4': false,
			"snappy": false,
			'@mongodb-js/zstd': false,
			'@mongodb-js/zstd-darwin-arm64': false,
			'@napi-rs': false,
			'kerberos': false
		  };
		// return smp.wrap(config);
return config

	},
};
export default config;
