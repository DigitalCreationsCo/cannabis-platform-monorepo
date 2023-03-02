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
                signUpFeature:{
                    formFields: [
                        { id: 'email'},
                        { id: 'password' },
                        { id: 're-password' },
                        { id: 'username' },
                        { id: 'firstName' },
                        { id: 'lastName' },
                        { id: 'phone' },
                        { id: 'dialCode' },
                        { id: 'address.countryCode' },
                        { id: 'address.country' },
                        { id: 'address.city' },
                        { id: 'address.state' },
                        { id: 'address.zipcode' },
                        { id: 'address.street1' },
                        { id: 'address.street2', optional: true },
                        { id: 'termsAccepted' }
                    ]
                },
                override: {
                    functions(originalImp) {
                        return { 
                            ...originalImp,
                            async signIn(input: UserLoginData) {
                                // try{
                                if (input) {
                                    const user = await findUserWithDetailsByEmail(input.email)
                                    console.log('SERVER MAIN: signin user: ', user)
                                    // if (userContext === null) {
                                    //     throw new Error('User does not exist');
                                    // }
                                    // if (userContext !== null && userContext.passwordHash === null) {
                                    //     throw new Error('Please reset your password');
                                    // }

                                    // if (userContext !== null && !isPasswordMatch(input.password, userContext.passwordHash)) {
                                    //     throw new Error('Invalid password')
                                    // }
                                    const response = await originalImp.signIn({...input, userContext: user})
                                    console.log('response: ', response)
                                    return response
                                }
                            // } catch(error) {
                            //     console.log(error)
                            //     return new Error(error)
                            // }
                        },
                            // async signUp(input) {
                            //     if (input) {
                            //         console.log('SERVER MAIN: signup input: ', input);

                            //         const userContext = input.userContext
                            //         // console.log('user   context: ', userContext())
                            //     const response = await originalImp.signUp(input)
                            //     console.log('backend signup response: ', response)
                                    
                            //     if (response.status === "OK") {
                            //         console.log('signup: session created')
                            //         return response

                            //     }
                            //         // const user = await UserDA.signup(createUserData);
                            //         // access token payload
                            //         // const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };
                                    
                            //         // const sessionToken = await STSession.createNewSession(res, user.id, sessionPayload, { data: 'SESSION TEST DATA' }, user);
                            //         // future note: drivers will have only session active on a device.
                            //         // Drivers will need their own session function for login
                            //         // const session = await UserDA.createUserSession(sessionToken.getHandle(), sessionPayload, await sessionToken.getExpiry())
                            //     }
                            // }
                        }
                    },
                    apis(originalImplementation, builder) {
                        return {
                            ...originalImplementation,
                            signUpPOST: async function (input) {
                                // console.log('! post signup callback input: ', input)
                                // let response = {...await originalImplementation.signUpPOST(input), user: {...input.formFields}}
                                // console.log('backend signup response: ', response);
                                // if (response.status === 'OK') {
                                //     console.log('backend signup OK');
                                //     response = { ...response, user: {...response?.user, ...input.userContext } };
                                //     return response
                                // }
                                let response = {...await originalImplementation.signUpPOST(input) }
                                if (response.status === 'OK') {
                                    const formFieldsArr = Object.values(input.formFields)
                                    console.log('formFields Array: ', formFieldsArr) // yes
                                    // console.log('formFields obj: ', Object.values(input.formFields).map((i, index )=> ({'id': i['value']})))
                                    const formFields = formFieldsArr.map((_, index )=> {
                                        const id = formFieldsArr[index]['id']
                                        return {_,[id]: '1'}
                                    })

                                    // const formFields = input.formFields.reduce((acc,cur) => ({...acc, ...cur }), {})
                                    // const result = formFields.reduce((acc,cur) => ({...acc, 'id': cur['value'] }), {})
                                    console.log('form fields: ', formFields)
                                    response = { ...response, user: {...response.user}}
                                    console.log('backend signup api: ', response)
                                }
                                return response
                            },
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
