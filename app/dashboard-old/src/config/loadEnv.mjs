import * as findUp from 'find-up';

export const loadEnv = (nodeEnv) => {
	const envName = (!!nodeEnv && '.env.' + nodeEnv) || '.env.development';
	const envPath = (env) => findUp.sync(env);
	return envPath(envName);
};
