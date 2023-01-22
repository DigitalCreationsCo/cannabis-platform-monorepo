// import * as findUp from 'find-up';
const findUp = require('find-up');
function loadEnv(nodeEnv) {
    const envName = (!!nodeEnv && '.env.' + nodeEnv) || '.env.development';
    const envPath = (env) => findUp.sync(env);
    return envPath(envName);
}

module.exports = { loadEnv };
