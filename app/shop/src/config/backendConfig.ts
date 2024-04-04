import Dashboard from 'supertokens-node/recipe/dashboard';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { type TypeInput } from 'supertokens-node/types';
import { appInfo } from './appInfo';

export const backendConfig = (): TypeInput => {
	return {
		framework: 'express',
		supertokens: {
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
			apiKey: process.env.SUPERTOKENS_CORE_API_KEY,
		},
		appInfo,
		recipeList: [
			Passwordless.init({
				flowType: 'USER_INPUT_CODE',
				contactMethod: 'EMAIL_OR_PHONE',
			}),
			Session.init(),
			Dashboard.init(),
			UserRoles.init(),
		],
		isInServerlessEnv: true,
	};
};
