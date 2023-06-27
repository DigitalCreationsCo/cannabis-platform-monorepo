import * as findUp from 'find-up';

export const loadEnv = (nodeEnv) => {
  console.info('loading environment variables: ', nodeEnv);

  const envName = (!!nodeEnv && '.env.' + nodeEnv) || '.env.development';
  const envPath = (env) => findUp.sync(env);
  return envPath(envName);
};
