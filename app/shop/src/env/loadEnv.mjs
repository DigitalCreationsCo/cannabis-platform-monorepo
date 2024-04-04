import * as findUp from 'find-up';

export default function loadEnv(nodeEnv) {
	const envName = (!!nodeEnv && '.env.' + nodeEnv) || '.env.development';
	const envPath = (env) => findUp.sync(env);
	return envPath(envName);
}
