import * as findUp from 'find-up';
function getEnvPath(nodeEnv: string) {
	const envName = (!!nodeEnv && '.env.' + nodeEnv) || '.env.development';
	const envPath = (env: string) => findUp.sync(env);
	return envPath(envName);
}

export { getEnvPath };
