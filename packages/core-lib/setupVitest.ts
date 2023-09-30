import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { vi } from 'vitest';
import { getEnvPath } from './env/getEnv.js';
expand(config({ path: getEnvPath('development') }));

const jestCompatOverride = {
	fn: vi.fn,
	spyOn: vi.spyOn,
};

(global as unknown as Record<'jest', unknown>).jest = jestCompatOverride;
