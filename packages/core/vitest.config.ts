import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

const testFiles = ['./**/*.test.{js,jsx,ts,tsx}'];

export default defineConfig({
	plugins: [
		tsconfigPaths() as any,
		react({
			// fastRefresh: false,
		}),
	],
	test: {
		globals: true,
		setupFiles: './setupVitest.ts',
		passWithNoTests: true,
		cache: {
			dir: '../../.cache/vitest/core',
		},
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'clover'],
			extension: ['js', 'jsx', 'ts', 'tsx'],
			all: true,
		},
		// To mimic Jest behaviour regarding mocks.
		// @link https://vitest.dev/config/#clearmocks
		clearMocks: true,
		mockReset: true,
		restoreMocks: true,
		include: testFiles,
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/.next/**',
			'**/.{idea,git,cache,output,temp}/**',
		],
	},
});
