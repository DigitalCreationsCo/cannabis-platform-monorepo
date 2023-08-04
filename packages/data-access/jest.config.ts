// @ts-check
import path from 'path';
import { getTsconfig } from 'get-tsconfig';
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
// import { getJestCachePath } from '../../cache.config';

const tsConfigFile = path.resolve('./tsconfig.json');

/**
 * Transform the tsconfig paths into jest compatible one (support extends)
 * @param {string} tsConfigFile
 */
const getTsConfigBasePaths = (tsConfigFile: string) => {
	const parsedTsConfig = getTsconfig(tsConfigFile);
	if (parsedTsConfig === null) {
		throw new Error(`Cannot find tsconfig file: ${tsConfigFile}`);
	}
	const tsPaths = parsedTsConfig.config.compilerOptions?.paths;
	return tsPaths
		? pathsToModuleNameMapper(tsPaths, {
				prefix: '<rootDir>/',
		  })
		: {};
};

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	displayName: `@cd/data-access:unit`,
	extensionsToTreatAsEsm: ['.ts'],
	rootDir: '.',
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	testMatch: ['<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'],
	moduleNameMapper: {
		...getTsConfigBasePaths(tsConfigFile),
	},
	transform: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'^.+\\.m?[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: tsConfigFile,
			},
		],
	},

	// false by default, overrides in cli, ie: yarn test:unit --collect-coverage=true
	collectCoverage: false,
	coverageDirectory: '<rootDir>/../coverage',
	collectCoverageFrom: [
		'<rootDir>/**/*.{ts,tsx,js,jsx}',
		'!**/*.test.{js,ts}',
		'!**/__mock__/*',
	],
};

export default config;
