import Session from 'supertokens-node/recipe/session';
// import { UserRoleClaim } from "supertokens-node/recipe/userroles";
import { PasswordlessSignInRequestPayload } from '@cd/core-lib';
import { DriverWithDetails, UserWithDetails } from '@cd/data-access';
import Dashboard from 'supertokens-node/recipe/dashboard';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { AuthConfig } from '../../interfaces';
import { DriverDA, UserDA } from '../api/data-access';

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost';
const dashboardDomain =
  process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://localhost:3001';
const apiDomain = process.env.BACKEND_URL || `http://localhost:6001`;

const appInfo = {
  appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
  apiDomain,
  websiteDomain: dashboardDomain,
  apiBasePath: '/main/api/v1',
};

export const backendConfig = (): AuthConfig => {
  console.info(' >> server/main backend config: ', appInfo);
  return {
    framework: 'express',
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
    },
    appInfo,
    recipeList: [
      Passwordless.init({
        flowType: 'USER_INPUT_CODE',
        contactMethod: 'EMAIL_OR_PHONE',
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              consumeCode: async (input: PasswordlessSignInRequestPayload) => {
                try {
                  let response = await originalImplementation.consumeCode(
                    input
                  );
                  if (response.status === 'OK') {
                    if (response.createdNewUser === false) {
                      let user;

                      console.info(
                        'backend request from appUser ',
                        input.userContext.appUser
                      );

                      if (input.userContext.appUser === 'DRIVER') {
                        if (response.user.email) {
                          user =
                            (await DriverDA.getDriverByEmail(
                              response.user.email
                            )) || null;
                          response.user = {
                            ...response.user,
                            ...user,
                          } as Passwordless.User & DriverWithDetails;
                        } else if (response.user.phoneNumber) {
                          user =
                            (await DriverDA.getDriverByPhone(
                              response.user.phoneNumber
                            )) || null;
                          response.user = {
                            ...response.user,
                            ...user,
                          } as Passwordless.User & DriverWithDetails;
                        }
                      } else {
                        if (response.user.email) {
                          user =
                            (await UserDA.getUserByEmail(
                              response.user.email
                            )) || null;
                          response.user = {
                            ...response.user,
                            ...user,
                          } as Passwordless.User & UserWithDetails;
                        } else if (response.user.phoneNumber) {
                          user =
                            (await UserDA.getUserByPhone(
                              response.user.phoneNumber
                            )) || null;
                          response.user = {
                            ...response.user,
                            ...user,
                          } as Passwordless.User & UserWithDetails;
                        }
                      }
                    }

                    return {
                      ...response,
                      createdNewUser: response.createdNewUser,
                      isFromDb: true,
                    };
                  }
                  return response;
                } catch (error: any) {
                  console.info('consumeCode error: ', error.message);
                  return {
                    status: 'RESTART_FLOW_ERROR',
                    message: error.message,
                  };
                }
              },
            };
            // apis: (originalImplementation) => {
            //     return {
            //         ...originalImplementation,
            //         consumeCodePOST: async (input) => {
            //             if (originalImplementation.consumeCodePOST === undefined) {
            //                 throw Error("Something went wrong.");
            //             }

            //             let response = await originalImplementation.consumeCodePOST(input);
            //             let user
            //             // Post sign up response, we check if it was successful
            //             if (response.status === "OK") {
            //                 let { id, email, phoneNumber } = response.user;

            //                 if (response.createdNewUser) {
            //                     // TODO: post sign up logic
            //                 } else {
            //                     let user = getUserDataFromEmail(email) || null;
            //                     // TODO: post sign in logicn
            //                 }
            //             }
            //             return response;
            //         }
            //     };
            // }
          },
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              consumeCodePOST: async (
                input: PasswordlessSignInRequestPayload & { options: any }
              ) => {
                // YES
                // await input.options.req.getJSONBody();

                // YES
                // console.info('post input: ' , input.options.req.original.headers);

                // YES
                // console.info('post input: ' , await input.options.req.getFormData());

                // NO
                // console.info('post input: ' , await input.options.req.getHeaderValue('appUser'));

                // NO
                // input.options.req.getHeaderValue('appUser')

                // NO
                // console.info('post app user? ', input.userContext.appUser)

                const { appUser } = await input.options.req.getJSONBody();

                input.userContext = { ...input.userContext, appUser };

                return originalImplementation.consumeCodePOST(input);
              },
            };
          },
        },
      }),
      Session.init({
        cookieSecure: true,
        cookieDomain: `.${baseDomain}`,
        // getTokenTransferMethod: () => "cookie",

        // expose jwt to the frontend, used for websocket authentication
        jwt: {
          enable: true,
        },

        // override: {
        //                 functions: (originalImplementation) => {
        //                     return {
        //                         ...originalImplementation,
        //                         createNewSession: async (input) => {
        //                             const userId = input.userContext.id;
        //                             input.userId = userId;
        //                             input.accessTokenPayload = { ...input.accessTokenPayload, ...input.userContext };

        //                             const session = await originalImplementation.createNewSession(input);

        //                             const sessionPayload: SessionPayload = {
        //                                 userId: input.userId,
        //                                 username: input.accessTokenPayload.username,
        //                                 email: input.accessTokenPayload.email
        //                             };

        //                             await SessionDA.createUserSession(
        //                                 session.getHandle(),
        //                                 sessionPayload,
        //                                 await session.getExpiry()
        //                             );

        //                             return session;
        //                         }
        //                     };
        //                 },
        //                 apis: (originalImplementation) => {
        //                     return {
        //                         ...originalImplementation,
        //                         refreshPOST: async (input) => {
        //                             const session = await originalImplementation.refreshPOST(input);
        //                             console.info('refresh session: ', session);
        //                             await SessionDA.updateExpireSession(session.getHandle(), await session.getExpiry());
        //                             return session;
        //                         },
        //                         signOutPOST: async (input) => {
        //                             const response = await originalImplementation.signOutPOST(input);
        //                             await SessionDA.deleteSession(input.session.getHandle());
        //                             return response;
        //                         }
        //                     };
        //                 }
        //             }
      }),
      Dashboard.init({
        apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
      }),
    ],
    isInServerlessEnv: false,
  };
};
