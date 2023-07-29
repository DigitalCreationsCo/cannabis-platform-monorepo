import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const testFiles = ['./src/**/*.test.{js,jsx,ts,tsx}'];

export default defineConfig({
  plugins: [
    react({
      // fastRefresh: false,
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    setupFiles: './test/setupVitest.ts',
    passWithNoTests: true,
    deps: {
      external: ['fs', 'axios', 'react-hot-toast', 'socket.io-client', "@types/socket.io-client", '@cd/data-access'],
      // experimentalOptimizer: {
      //   enabled: true,
      // },
    },
    cache: {
      dir: '../../.cache/vitest/core-lib',
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
