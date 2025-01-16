import { getEnvPath } from '@gras/core/env';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

export function loadEnv() {
	console.info('node env: ', process.env.NODE_ENV);
	expand(config({ path: getEnvPath(process.env.NODE_ENV) }));
	console.info('env loaded');
}
