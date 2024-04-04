import {
	getPhoneWithoutDialCode,
	type ConsumeCodeResponse,
} from '@cd/core-lib';
import {
	findUserWithDetailsByEmail,
	findUserWithDetailsById,
	findUserWithDetailsByPhone,
	type UserWithDetails,
} from '@cd/data-access';
import jwksClient from 'jwks-rsa';
import SuperTokens, { RecipeUserId } from 'supertokens-node';
import Dashboard from 'supertokens-node/recipe/dashboard';
import Jwt from 'supertokens-node/recipe/jwt';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { type HttpRequest, type TypeInput } from 'supertokens-node/types';
import { appInfo } from './appInfo';

export const backendConfig = (): TypeInput => {
	return {
		framework: 'express',
		supertokens: {
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
			apiKey: process.env.SUPERTOKENS_CORE_API_KEY,
			// // enable for debugging
			networkInterceptor: (request: HttpRequest, userContext: any) => {
				console.log('networkInterceptor userContext: ', userContext);
				console.log('networkInterceptor http request to core: ', request);
				// this can also be used to return a modified request object.
				return request;
			},
		},
		appInfo,
		recipeList: [
			Passwordless.init({
				flowType: 'USER_INPUT_CODE',
				contactMethod: 'EMAIL_OR_PHONE',
				override: {
					functions: (oi) => {
						return {
							...oi,
							createCode: async (input) => {
								try {
									return await oi.createCode(input);
								} catch (error) {
									throw new Error(
										'The Sign In server is not available. Please contact Gras Support.',
									);
								}
							},
						};
					},
					apis: (oi) => {
						return {
							...oi,
							async consumeCodePOST(input): Promise<ConsumeCodeResponse | any> {
								console.info('consumeCodePOST input, ', input);

								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								const response = (await oi.consumeCodePOST!(
									input,
								)) as unknown as ConsumeCodeResponse;

								let user: UserWithDetails =
									response.user as unknown as UserWithDetails;

								if (response.createdNewRecipeUser) {
									// if new user, send a welcome email, and link to complete signup
									// if new user completed signup, send a welcome email
								}

								if (
									response.status === 'OK' &&
									!response.createdNewRecipeUser &&
									response.user.loginMethods.length === 1
								) {
									if (response.user.emails[0]) {
										user =
											(await findUserWithDetailsByEmail(
												response.user.emails[0],
											)) || (response.user as unknown as UserWithDetails);
									} else if (response.user.phoneNumbers[0]) {
										user =
											(await findUserWithDetailsByPhone(
												getPhoneWithoutDialCode(response.user.phoneNumbers[0]),
											)) || (response.user as unknown as UserWithDetails);
									} else {
										user =
											(await findUserWithDetailsById(response.user.id)) ||
											(response.user as unknown as UserWithDetails);
									}

									const externalUserId = user.id;

									// if this is necessary v, add it to the createUser function
									// await SuperTokens.deleteUserIdMapping({
									// 	userId: response.user.id,
									// });

									// commented out because of this error `UserId is already in use in Session recipe`
									// await SuperTokens.createUserIdMapping({
									// 	superTokensUserId: response.user.id,
									// 	externalUserId,
									// 	force: true,
									// });

									// response.user.id = externalUserId;
									// response.user.loginMethods[0].recipeUserId = new RecipeUserId(
									// 	externalUserId,
									// );
								}

								response.userFromDb = {
									user,
									token: await createToken({}),
								} as any;

								console.info('consumeCodePOST response, ', response);

								return response;
							},
						};
					},
				},
			}),
			Session.init(),
			UserRoles.init(),
			Jwt.init(),
			Dashboard.init({
				apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
			}),
		],
		isInServerlessEnv: true,
	};
};

export const jwtClient = jwksClient({
	jwksUri: `${appInfo.apiDomain}${appInfo.apiBasePath}/jwt/jwks.json`,
});

export async function createToken(payload: any) {
	const jwtResponse = await Jwt.createJWT({
		...payload,
		source: 'microservice',
	});
	if (jwtResponse.status === 'OK') {
		return jwtResponse.jwt;
	}
	throw new Error('Unable to create JWT. Should never come here.');
}
