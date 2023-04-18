import { appInfo } from '@cd/core-lib';
import { findUserWithDetailsByEmail, SessionPayload, UserLoginData } from '@cd/data-access';
import Dashboard from 'supertokens-node/recipe/dashboard';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
// import { UserRoleClaim } from "supertokens-node/recipe/userroles";
import { AuthConfig } from '../../interfaces';
import { SessionDA, UserDA } from '../api/data-access';

export const backendConfig = (): AuthConfig => {
    console.log('SERVER MAIN BACKEND API INFO: ', appInfo);
    console.log('data base url: ', process.env.DATABASE_URL);
    console.log('supertokens hosted at ', process.env.SUPERTOKENS_CONNECTION_URI)
    return {
        framework: 'express',
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI
        },
        appInfo,
        recipeList: [
            EmailPassword.init({
                signUpFeature: {
                    formFields: [
                        { id: 'email' },
                        { id: 'password' },
                        { id: 're_password' },
                        { id: 'username' },
                        { id: 'firstName' },
                        { id: 'lastName' },
                        { id: 'phone' },
                        { id: 'dialCode' },
                        { id: 'countryCode' },
                        { id: 'country' },
                        { id: 'city' },
                        { id: 'state' },
                        { id: 'zipcode' },
                        { id: 'street1' },
                        { id: 'street2', optional: true },
                        { id: 'termsAccepted' }
                    ]
                },
                override: {
                    functions(originalImplementation) {
                        return {
                            ...originalImplementation,
                            async signIn(input: UserLoginData) {
                                try {
                                    const user = await findUserWithDetailsByEmail(input.email);
                                    console.log('user: ', user);
                                    if (user === null) {
                                        console.log('User does not exist');
                                        throw new Error('User does not exist');
                                    }
                                    // if (userContext !== null && userContext.passwordHash === null) {
                                    //     throw new Error('Please reset your password');
                                    // }

                                    // if (userContext !== null && !isPasswordMatch(input.password, userContext.passwordHash)) {
                                    //     throw new Error('Invalid password')
                                    // }
                                    const response = await originalImplementation.signIn({
                                        ...input,
                                        userContext: user
                                    });
                                    console.log('backend signin reponse: ', response);
                                    return response;
                                } catch (error: any) {
                                    console.log('backend signin error: ', error);
                                    // throw new Error(error)
                                    return {
                                        status: 'WRONG_CREDENTIALS_ERROR',
                                        message: error
                                    };
                                }
                            },

                            async signUp(input) {
                                try {
                                    const response = await originalImplementation.signUp(input);
                                    return response;
                                } catch (error: any) {
                                    console.log('backend signup error: ', error);
                                    throw new Error(error);
                                }
                            }
                        };
                    },
                    apis(originalImplementation) {
                        return {
                            ...originalImplementation,
                            signInPOST: async function (input) {
                                try {
                                    const response = await originalImplementation.signInPOST(input);
                                    console.log('sign in POST OK');
                                    return response;
                                } catch (error: any) {
                                    console.log('backend signInPost error: ', error);
                                    throw new Error(error);
                                }
                            },
                            signUpPOST: async function (input) {
                                try {
                                    if (originalImplementation.signUpPOST === undefined) {
                                        throw Error('backend signUp: Something went wrong.');
                                    }

                                    const formFieldsArr = Object.values(input.formFields);
                                    const formFields = formFieldsArr.map((_, index) => {
                                        const id = formFieldsArr[index]['id'];
                                        return { [id]: _['value'] };
                                    });

                                    const formFieldsTransformed = Object.assign({}, ...formFields);
                                    const createUserInput = {
                                        ...formFieldsTransformed
                                    };

                                    const {
                                        timeJoined,
                                        street1,
                                        street2,
                                        city,
                                        state,
                                        zipcode,
                                        country,
                                        countryCode,
                                        ...createUserData
                                    } = createUserInput;
                                    createUserData.address = {
                                        street1,
                                        street2,
                                        city,
                                        state,
                                        zipcode,
                                        country,
                                        countryCode
                                    };
                                    createUserData.createdAt = new Date(timeJoined);

                                    const user = await UserDA.createUser(createUserData);

                                    input.userContext = { ...user };
                                    console.log('signup input with usercontext: ', input);

                                    const response = await originalImplementation.signUpPOST(input);

                                    if (response.status === 'OK') {
                                        console.log('sign up POST OK');
                                        // future note: drivers will have only session active on a device.
                                        // Drivers will need their own session function for login

                                        response.user = {
                                            ...response.user,
                                            ...response.session.getAccessTokenPayload()
                                        };
                                    }
                                    return response;
                                } catch (error: any) {
                                    console.log('backend signInPost error: ', error.message);
                                    return {
                                        status: 'GENERAL_ERROR',
                                        message: error.message
                                    };
                                }
                            }
                        };
                    }
                }
            }),
            Session.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            createNewSession: async (input) => {
                                const userId = input.userContext.id;
                                input.userId = userId;
                                input.accessTokenPayload = { ...input.accessTokenPayload, ...input.userContext };

                                const session = await originalImplementation.createNewSession(input);

                                const sessionPayload: SessionPayload = {
                                    userId: input.userId,
                                    username: input.accessTokenPayload.username,
                                    email: input.accessTokenPayload.email
                                };

                                await SessionDA.createUserSession(
                                    session.getHandle(),
                                    sessionPayload,
                                    await session.getExpiry()
                                );

                                return session;
                            }
                        };
                    },
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            refreshPOST: async (input) => {
                                const session = await originalImplementation.refreshPOST(input);
                                console.log('refresh session: ', session);
                                await SessionDA.updateExpireSession(session.getHandle(), await session.getExpiry());
                                return session;
                            },
                            signOutPOST: async (input) => {
                                const response = await originalImplementation.signOutPOST(input);
                                await SessionDA.deleteSession(input.session.getHandle());
                                return response;
                            }
                        };
                    }
                }
            }),
            Dashboard.init({
                apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY
            })
        ],
        isInServerlessEnv: false
    };
};
