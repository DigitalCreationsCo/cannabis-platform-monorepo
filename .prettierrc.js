// @ts-check

const { getPrettierConfig } = require('@gras/eslint-config/src/helpers');

const { overrides = [], ...prettierConfig } = getPrettierConfig();

/**
 * @type {import('prettier').Config}
 */
const config = {
	...prettierConfig,
	overrides: [
		...overrides,
		{
			files: '*.md',
			options: {
				singleQuote: false,
				quoteProps: 'preserve',
			},
		},
	],
};

module.exports = config;
