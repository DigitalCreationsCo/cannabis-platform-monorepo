// @ts-check
const { getTsconfig } = require('get-tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');

const { getJestCachePath } = require('../../cache.config');

const packageJson = require('./package.json');

const tsConfigFile = './tsconfig.jest.json';

// const getTestMatchers = ({
// 	api = true,
// 	components = true,
// 	env = true,
// 	middleware = true,
// }) => {
// 	const matchers = [
// 		(api && '<rootDir>/src/**/test/api/**/*.{js,jsx,ts,tsx}') || '',
// 		(components && '<rootDir>/src/**/test/components/**/*.{js,jsx,ts,tsx}') ||
// 			'',
// 		(env && '<rootDir>/src/**/test/env/**/*.{js,jsx,ts,tsx}') || '',
// 		(middleware && '<rootDir>/src/**/test/middleware/**/*.{js,jsx,ts,tsx}') ||
// 			'',
// 	];
// 	return matchers.filter(Boolean);
// };

/**
 * Transform the tsconfig paths into jest compatible one (support extends)
 * @param {string} tsConfigFile
 */
const getTsConfigBasePaths = (tsConfigFile) => {
	const parsedTsConfig = getTsconfig(tsConfigFile);
	if (parsedTsConfig === null) {
		throw new Error(`Cannot find tsconfig file: ${tsConfigFile}`);
	}
	const tsPaths = parsedTsConfig.config.compilerOptions?.paths;
	return tsPaths
		? pathsToModuleNameMapper(tsPaths, {
				prefix: '<rootDir>/src',
		  })
		: {};
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
	displayName: `${packageJson.name}:unit`,
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	rootDir: './',
	cacheDirectory: getJestCachePath(packageJson.name),
	testEnvironmentOptions: {
		NODE_ENV: 'test',
	},
	setupFilesAfterEnv: [
		'<rootDir>/jest/setup.js',
		// '<rootDir>/jest/globals.js',
		'@testing-library/jest-dom/extend-expect',
	],
	testMatch: ['<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],

	transform: {
		'^.+\\.m?[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: tsConfigFile,
			},
		],
		// '\\.[jt]sx?$': 'babel-jest',
		'^.+\\.(mjs|js|jsx)$': 'babel-jest',
		'.+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$':
			'jest-transform-stub',
	},
	moduleNameMapper: {
		'^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
			'jest-transform-stub',
		...getTsConfigBasePaths(tsConfigFile),
	},
	collectCoverage: false,
	coverageDirectory: '<rootDir>/coverage',
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{ts,tsx,js,jsx}',
		'!**/*.test.{js,ts}',
		'!**/__mock__/*',
	],
};

module.exports = config;
