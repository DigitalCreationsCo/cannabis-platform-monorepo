const packageJson = require('./package.json');
const { getJestCachePath } = require('../../cache.config');

const getTestMatchers = ({
	api = true,
	components = true,
	env = true,
	middleware = true,
}) => {
	const matchers = [
		api && '<rootDir>/src/**/test/api/**/*.{js,jsx,ts,tsx}',
		components && '<rootDir>/src/**/test/components/**/*.{js,jsx,ts,tsx}',
		env && '<rootDir>/src/**/test/env/**/*.{js,jsx,ts,tsx}',
		middleware && '<rootDir>/src/**/test/middleware/**/*.{js,jsx,ts,tsx}',
	];
	return matchers.filter(Boolean);
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
		'<rootDir>/jest.setup.ts',
		'@testing-library/jest-dom/extend-expect',
	],
	globalSetup: '<rootDir>/jest.globals.mjs',

	testMatch: [
		...getTestMatchers({
			api: false,
			components: false,
			middleware: false,
		}),
	],

	testPathIgnorePatterns: ['\\**/node_modules/', '\\/.next/'],

	transform: {
		'^.+\\.m?[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: './tsconfig.json',
			},
		],
		'^.+\\.(mjs|js|jsx)$': 'babel-jest',
		'^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
			'jest-transform-stub', // anything style related is ignored and mapped to jest-transform-stub module
	},

	collectCoverage: false,
	coverageDirectory: '<rootDir>/coverage',
	collectCoverageFrom: [
		'<rootDir>/**/*.{ts,tsx,js,jsx}',
		'!**/*.test.{js,ts}',
		'!**/__mock__/*',
	],
};

module.exports = config;
