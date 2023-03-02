import { findUserWithDetailsByEmail, UserLoginData } from "@cd/data-access";
import { appInfo } from "@cd/shared-config/auth/appInfo";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import STSession from "supertokens-node/recipe/session";
import { AuthConfig } from "../../interfaces";

export let backendConfig = (): AuthConfig => {
    console.log('SERVER MAIN BACKEND API INFO: ', appInfo)
    return {
        framework: "express",
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
        },
        appInfo,
        recipeList: [
            EmailPassword.init({
                override: {
                    functions(originalImp) {
                        return { 
                            ...originalImp,
                            async signIn(input: UserLoginData) {
                                // try{
                                if (input) {
                                    const userContext = await findUserWithDetailsByEmail(input.email)
                                    console.log('SERVER MAIN: signin userContext: ', userContext)
                                    // if (userContext === null) {
                                    //     throw new Error('User does not exist');
                                    // }
                                    // if (userContext !== null && userContext.passwordHash === null) {
                                    //     throw new Error('Please reset your password');
                                    // }

                                    // if (userContext !== null && !isPasswordMatch(input.password, userContext.passwordHash)) {
                                    //     throw new Error('Invalid password')
                                    // }
                                    const response = await originalImp.signIn({...input, userContext})
                                    console.log('response: ', response)
                                    return response
                                }
                            // } catch(error) {
                            //     console.log(error)
                            //     return new Error(error)
                            // }
                        },
                            async signUp(input) {
                                if (input) {
                                    console.log('SERVER MAIN: signup input: ', input);
                                    
                                    // const user = await UserDA.signup(createUserData);
                                    // access token payload
                                    // const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };
                                    
                                    // const sessionToken = await STSession.createNewSession(res, user.id, sessionPayload, { data: 'SESSION TEST DATA' }, user);
                                    // future note: drivers will have only session active on a device.
                                    // Drivers will need their own session function for login
                                    // const session = await UserDA.createUserSession(sessionToken.getHandle(), sessionPayload, await sessionToken.getExpiry())
                                }
                                const response = await originalImp.signUp(input)
                                console.log('signup response: ', response)
                                return response
                            }
                        }
                    },
                    // apis: async (originalImplementation) => {
                    //     return {
                    //         ...originalImplementation,
                    //         // signUpPOST: async function (input) {
                    //         //     console.log(' ! post signup callback')
                    //         //     if (originalImplementation.signUpPOST === undefined) {
                    //         //         throw Error("Should never come here");
                    //         //     }
    
                    //         //     // First we call the original implementation of signUpPOST.
                    //         //     let response = await originalImplementation.signUpPOST(input);
    
                    //         //     // Post sign up response, we check if it was successful
                    //         //     if (response.status === "OK") {
                    //         //         let { id, email } = response.user;
    
                    //         //         // // These are the input form fields values that the user used while signing up
                    //         //         let formFields = input.formFields;
                    //         //         // TODO: post sign up logic
                    //         //     }
                    //         //     return response;
                    //         // }
                    //     }
                    // },
                },
            }),
            STSession.init(),
            Dashboard.init({
                apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
            }),
        ],
        isInServerlessEnv: false,
    };
};
