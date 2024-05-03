import { default as Router } from 'next/router';
import { type SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import { PasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/passwordless/prebuiltui';
import Session from 'supertokens-auth-react/recipe/session';
import { type WindowHandlerInterface } from 'supertokens-web-js/utils/windowHandler/types';
import { appInfo } from './appInfo';

export const frontendConfig = (): SuperTokensConfig => {
	return {
		appInfo,
		enableDebugLogs: process.env.SUPERTOKENS_DEBUG === 'true',
		recipeList: [
			Passwordless.init({
				contactMethod: 'EMAIL_OR_PHONE',
			}),
			Session.init(),
		],
		windowHandler: (oI: WindowHandlerInterface) => {
			return {
				...oI,
				location: {
					...oI.location,
					setHref: (href: string) => {
						Router.push(href);
					},
				},
			};
		},
	};
};

export const recipeDetails = {
	docsLink: 'https://supertokens.com/docs/thirdpartyemailpassword/introduction',
};

export const PreBuiltUIList = [PasswordlessPreBuiltUI];
