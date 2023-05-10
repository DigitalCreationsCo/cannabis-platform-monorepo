import { appInfo } from '@cd/core-lib';
import Session from 'supertokens-node/recipe/session';
// import { UserRoleClaim } from "supertokens-node/recipe/userroles";
import { findUserWithDetailsByEmail, findUserWithDetailsById, findUserWithDetailsByPhone } from '@cd/data-access';
import Dashboard from "supertokens-node/recipe/dashboard";
import Passwordless from "supertokens-node/recipe/passwordless";
import { AuthConfig } from '../../interfaces';

export const backendConfig = (): AuthConfig => {
    console.log(' >> server/main backend config: ', appInfo);
    return {
        framework: 'express',
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI
        },
        appInfo,
        // recipeList: [
        //     EmailPassword.init({
        //         signUpFeature: {
        //             formFields: [
        //                 { id: 'email' },
        //                 { id: 'password' },
        //                 { id: 're_password' },
        //                 { id: 'username' },
        //                 { id: 'firstName' },
        //                 { id: 'lastName' },
        //                 { id: 'phone' },
        //                 { id: 'dialCode' },
        //                 { id: 'countryCode' },
        //                 { id: 'country' },
        //                 { id: 'city' },
        //                 { id: 'state' },
        //                 { id: 'zipcode' },
        //                 { id: 'street1' },
        //                 { id: 'street2', optional: true },
        //                 { id: 'termsAccepted' }
        //             ]
        //         },
        //         override: {
        //             functions(originalImplementation) {
        //                 return {
        //                     ...originalImplementation,
        //                     async signIn(input: UserLoginData) {
        //                         try {
        //                             const user = await findUserWithDetailsByEmail(input.email);
        //                             console.log('user: ', user);
        //                             if (user === null) {
        //                                 console.log('User does not exist');
        //                                 throw new Error('User does not exist');
        //                             }
        //                             // if (userContext !== null && userContext.passwordHash === null) {
        //                             //     throw new Error('Please reset your password');
        //                             // }

        //                             // if (userContext !== null && !isPasswordMatch(input.password, userContext.passwordHash)) {
        //                             //     throw new Error('Invalid password')
        //                             // }
        //                             const response = await originalImplementation.signIn({
        //                                 ...input,
        //                                 userContext: user
        //                             });
        //                             console.log('backend signin reponse: ', response);
        //                             return response;
        //                         } catch (error: any) {
        //                             console.log('backend signin error: ', error);
        //                             // throw new Error(error)
        //                             return {
        //                                 status: 'WRONG_CREDENTIALS_ERROR',
        //                                 message: error
        //                             };
        //                         }
        //                     },

        //                     async signUp(input) {
        //                         try {
        //                             const response = await originalImplementation.signUp(input);
        //                             return response;
        //                         } catch (error: any) {
        //                             console.log('backend signup error: ', error);
        //                             throw new Error(error);
        //                         }
        //                     }
        //                 };
        //             },
        //             apis(originalImplementation) {
        //                 return {
        //                     ...originalImplementation,
        //                     signInPOST: async function (input) {
        //                         try {
        //                             const response = await originalImplementation.signInPOST(input);
        //                             console.log('sign in POST OK');
        //                             return response;
        //                         } catch (error: any) {
        //                             console.log('backend signInPost error: ', error);
        //                             throw new Error(error);
        //                         }
        //                     },
        //                     signUpPOST: async function (input) {
        //                         try {
        //                             if (originalImplementation.signUpPOST === undefined) {
        //                                 throw Error('backend signUp: Something went wrong.');
        //                             }

        //                             const formFieldsArr = Object.values(input.formFields);
        //                             const formFields = formFieldsArr.map((_, index) => {
        //                                 const id = formFieldsArr[index]['id'];
        //                                 return { [id]: _['value'] };
        //                             });

        //                             const formFieldsTransformed = Object.assign({}, ...formFields);
        //                             const createUserInput = {
        //                                 ...formFieldsTransformed
        //                             };

        //                             const {
        //                                 timeJoined,
        //                                 street1,
        //                                 street2,
        //                                 city,
        //                                 state,
        //                                 zipcode,
        //                                 country,
        //                                 countryCode,
        //                                 ...createUserData
        //                             } = createUserInput;
        //                             createUserData.address = {
        //                                 street1,
        //                                 street2,
        //                                 city,
        //                                 state,
        //                                 zipcode,
        //                                 country,
        //                                 countryCode
        //                             };
        //                             createUserData.createdAt = new Date(timeJoined);

        //                             const user = await UserDA.createUser(createUserData);

        //                             input.userContext = { ...user };
        //                             console.log('signup input with usercontext: ', input);

        //                             const response = await originalImplementation.signUpPOST(input);

        //                             if (response.status === 'OK') {
        //                                 console.log('sign up POST OK');
        //                                 // future note: drivers will have only session active on a device.
        //                                 // Drivers will need their own session function for login

        //                                 response.user = {
        //                                     ...response.user,
        //                                     ...response.session.getAccessTokenPayload()
        //                                 };
        //                             }
        //                             return response;
        //                         } catch (error: any) {
        //                             console.log('backend signInPost error: ', error.message);
        //                             return {
        //                                 status: 'GENERAL_ERROR',
        //                                 message: error.message
        //                             };
        //                         }
        //                     }
        //                 };
        //             }
        //         }
        //     }),
        //     Session.init({
        //         override: {
        //             functions: (originalImplementation) => {
        //                 return {
        //                     ...originalImplementation,
        //                     createNewSession: async (input) => {
        //                         const userId = input.userContext.id;
        //                         input.userId = userId;
        //                         input.accessTokenPayload = { ...input.accessTokenPayload, ...input.userContext };

        //                         const session = await originalImplementation.createNewSession(input);

        //                         const sessionPayload: SessionPayload = {
        //                             userId: input.userId,
        //                             username: input.accessTokenPayload.username,
        //                             email: input.accessTokenPayload.email
        //                         };

        //                         await SessionDA.createUserSession(
        //                             session.getHandle(),
        //                             sessionPayload,
        //                             await session.getExpiry()
        //                         );

        //                         return session;
        //                     }
        //                 };
        //             },
        //             apis: (originalImplementation) => {
        //                 return {
        //                     ...originalImplementation,
        //                     refreshPOST: async (input) => {
        //                         const session = await originalImplementation.refreshPOST(input);
        //                         console.log('refresh session: ', session);
        //                         await SessionDA.updateExpireSession(session.getHandle(), await session.getExpiry());
        //                         return session;
        //                     },
        //                     signOutPOST: async (input) => {
        //                         const response = await originalImplementation.signOutPOST(input);
        //                         await SessionDA.deleteSession(input.session.getHandle());
        //                         return response;
        //                     }
        //                 };
        //             }
        //         }
        //     }),
        //
        // ],
        recipeList: [
            Passwordless.init({
                flowType: "USER_INPUT_CODE",
                contactMethod: "EMAIL_OR_PHONE",
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            async getUserByEmail(input) {

                                let user = await findUserWithDetailsByEmail(input.email) || null;
                                return user;
                            },
                            async getUserByPhoneNumber(input) {
                                let user = await findUserWithDetailsByPhone(input.phoneNumber) || null;
                                return user;
                            },
                            async getUserById(input) {
                                let user = await findUserWithDetailsById(input.userId) || null;
                                return user;
                            },
                            consumeCode: async (input) => {
                                let response = await originalImplementation.consumeCode(input);

                                if (response.status === "OK") {
                                    let user = response.user

                                    console.log('consume code user: ', user);
                                    if (!response.createdNewUser) {
                                        // TODO: post sign up logic

                                        // let user = await getUserDataFromEmail(email) || null;
                                        // // TODO: post sign in logicn
                                        // response.user = { ...response.user, ...user }
                                    }
                                }
                                return response;
                            }
                        }
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
                }
            }),
            Session.init(), // initializes session features
            Dashboard.init({
                apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY
            })
        ],
        isInServerlessEnv: false
    };
};
