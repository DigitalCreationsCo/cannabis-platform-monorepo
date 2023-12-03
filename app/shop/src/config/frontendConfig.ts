import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { type AppInfo } from 'supertokens-node/lib/build/types';

const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras';
const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'grascannabis.org';
const shopDomain =
	process.env.NEXT_PUBLIC_SHOP_APP_URL || 'http://localhost:3000';
const apiDomain = process.env.BACKEND_URL || `https://backend.grascannabis.org`;

const appInfo: AppInfo = {
	appName,
	websiteDomain: shopDomain,
	apiDomain,
	// query this path for all auth requests
	apiBasePath:
		(process.env.NODE_ENV === 'production' && '/main/api/v1') || '/api/v1',
};

export const frontendConfig = () => {
	return {
		appInfo,
		enableDebugLogs: process.env.SUPERTOKENS_DEBUG === 'true',
		recipeList: [
			Passwordless.init({
				contactMethod: 'EMAIL_OR_PHONE',
				onHandleEvent: (event: any) => {
					if (event.action === 'SUCCESS') {
						if (event.isNewUser || !event.user.isSignUpComplete)
							window.location.href = `${shopDomain}/signup/create-account`;
						else {
							window.location.reload();
						}
					}
				},
				// override: {
				// 	functions: (originalImplementation) => {
				// 		return {
				// 			...originalImplementation,
				// 			consumeCode: async (input: any) => {
				// 				try {
				// 					return originalImplementation.consumeCode(input);
				// 				} catch (error) {
				// 					throw new Error(error.message);
				// 				}
				// 			},
				// 			resendCode: async (input: any) => {
				// 				console.info('resend code input: ', input);
				// 				return originalImplementation.resendCode(input);
				// 			},
				// 		};
				// 	},
				// },
			}),
			Session.init({
				cookieDomain: `.${baseDomain}`,
			}),
		],
		isInServerLessEnv: false,
	};
};
