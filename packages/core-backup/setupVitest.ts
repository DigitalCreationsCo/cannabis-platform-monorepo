import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { vi } from 'vitest';
import { findPath } from './src/find/findPath';

expand(config({ path: findPath('env.development') }));

const jestCompatOverride = {
	fn: vi.fn,
	spyOn: vi.spyOn,
};

(global as unknown as Record<'jest', unknown>).jest = jestCompatOverride;
