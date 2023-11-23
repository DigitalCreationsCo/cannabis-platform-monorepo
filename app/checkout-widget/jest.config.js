const packageJson = require('./package.json');
const { getJestCachePath } = require('../../cache.config');
/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
	displayName: `${packageJson.name}:unit`,
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	rootDir: './',
	cacheDirectory: getJestCachePath(packageJson.name),
	coverageDirectory: '<rootDir>/coverage',
	collectCoverage: false,
	collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx,js,jsx}'],
	coveragePathIgnorePatterns: ['\\**/node_modules/', '/test-helpers/'],
	testEnvironmentOptions: {
		NODE_ENV: 'test',
	},
	testPathIgnorePatterns: ['\\**/node_modules/', '\\/jest'],
	transform: {
		'^.+\\.m?[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: './tsconfig.json',
			},
		],
		'^.+\\.(js|jsx|mjs)$': 'babel-jest',
		'^.+\\.(css|scss)$': '<rootDir>/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/jest/fileTransform.js',
	},
	setupFiles: ['<rootDir>/jest/setup.js'],
	setupFilesAfterEnv: [
		'<rootDir>/jest/test-env.js',
		// '@testing-library/jest-dom/extend-expect',
	],
	snapshotSerializers: ['enzyme-to-json/serializer'],
};
