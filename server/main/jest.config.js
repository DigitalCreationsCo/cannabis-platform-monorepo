/** @type {import('ts-jest').JestConfigWithTsJest} */
module.export = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
};
