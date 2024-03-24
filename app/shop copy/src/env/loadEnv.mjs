import * as findUp from 'find-up';

export default function loadEnv(nodeEnv) {
	console.info('Loading environment variables for', nodeEnv);
	const envName = (!!nodeEnv && '.env.' + nodeEnv) || '.env.development';
	console.info('Loading environment file', envName);
	const envPath = (env) => findUp.sync(env);
	console.info('Environment file found at', envPath(envName));
	return envPath(envName);
}
