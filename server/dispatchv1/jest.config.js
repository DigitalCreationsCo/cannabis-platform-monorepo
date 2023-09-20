/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	displayName: 'server-dispatch',
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
	transform: {
		'^.+\\.m?[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: './tsconfig.json',
			},
		],
		'^.+\\.(mjs|js|jsx)$': 'babel-jest',
	},
};
