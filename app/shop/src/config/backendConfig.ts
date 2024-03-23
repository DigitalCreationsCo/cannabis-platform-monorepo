import Dashboard from 'supertokens-node/recipe/dashboard';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { type AuthConfig } from '../../interfaces';
import { appInfo } from './appInfo';

export const backendConfig = (): AuthConfig => {
	return {
		framework: 'express',
		supertokens: {
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
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
