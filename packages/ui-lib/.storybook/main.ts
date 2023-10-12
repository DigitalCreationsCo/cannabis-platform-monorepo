import type { StorybookConfig } from '@storybook/react-webpack5';

import { join, dirname } from 'path';
import { env } from 'process';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: [{ from: '../public/assets/images/logo.png', to: '/public' }],
	env: (config) => ({
		...config,
		NEXT_PUBLIC_CRYPTO_SK: 'fbef9dc0bfb900f5ae110c38ca726bfa',
	}),
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-onboarding'),
		getAbsolutePath('@storybook/addon-interactions'),
		'@storybook/addon-styling-webpack',
	],
	framework: {
		name: getAbsolutePath('@storybook/react-webpack5'),
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
};
export default config;
