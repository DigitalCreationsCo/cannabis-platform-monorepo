import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { findPath } from './findPath';

function findEnv(env: string) {
	try {
		return expand(config({ path: findPath(env) })).parsed
	} catch (err) {
		console.error(`getEnv: `, err.message)
		throw new Error(err.message)
	}
}

export { findEnv }
