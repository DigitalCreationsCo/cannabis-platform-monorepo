import { Address, findUserWithDetailsByEmail, SessionPayload, UserCreateType, UserLoginData } from "@cd/data-access";
import { appInfo } from "@cd/shared-config/auth/appInfo";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { UserRoleClaim } from "supertokens-node/recipe/userroles";
import { AuthConfig } from "../../interfaces";
import { SessionDA, UserDA } from "../api/data-access";

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
                                try{
                                const user = await findUserWithDetailsByEmail(input.email)
                                console.log('user: ', user)
                                if (user === null) {
                                    console.log('User does not exist')
                                    throw new Error('User does not exist');
                                }
                                // if (userContext !== null && userContext.passwordHash === null) {
                                //     throw new Error('Please reset your password');
                                // }

                                // if (userContext !== null && !isPasswordMatch(input.password, userContext.passwordHash)) {
                                //     throw new Error('Invalid password')
                                // }
                                const response = await originalImplementation.signIn({...input, userContext: user})
                                return response
                                } catch (error) {
                                    console.log('backend signin error: ', error)
                                    // throw new Error(error)
                                    return { 
                                        status: 'WRONG_CREDENTIALS_ERROR',
                                        message: error
                                    }
                                }
                            },
                        }
                    },
                    apis(originalImplementation) {
                        return {
                            ...originalImplementation,
                            signInPOST: async function (input) {
                                try {
                                console.log('backend signInPost input: ', input)
                                return originalImplementation.signInPOST(input)
                                } catch (error) {
                                    console.log('backend signInPost error: ', error)
                                    throw new Error(error)
                                }
                            },
                            signUpPOST: async function (input) {
                                // console.log('backend signUpPost input: ', input)
                                if (originalImplementation.signUpPOST === undefined) {
                                    throw Error("backend signUpPost: Something went wrong.");
                                }
                                
                                let response = {...await originalImplementation.signUpPOST(input) }
                                if (response.status === 'OK') {
                                    const formFieldsArr = Object.values(input.formFields)
                                    const formFields = formFieldsArr.map((_, index )=> {
                                        const id = formFieldsArr[index]['id']
                                        return {[id]: _['value']}
                                    })
                                    
                                    const formFieldsTransformed = Object.assign({}, ...formFields)
                                    
                                    response = { ...response, user: {...response.user, ...formFieldsTransformed }} // yes
                                    // console.log('backend signUpPost OK response: ', response)

                                    const {timeJoined, street1, street2, city, state, zipcode, country, countryCode, ...createUserData} = response.user as EmailPassword.User & UserCreateType & Address
                                    createUserData.address = {street1, street2, city, state, zipcode, country, countryCode}
                                    createUserData.createdAt = new Date(timeJoined)
                                    // console.log('create user data: ', createUserData)

                                    const user = await UserDA.createUser(createUserData);
                                    console.log ('backend signUpPost created user: ', user)

                                    // future note: drivers will have only session active on a device.
                                    // Drivers will need their own session function for login
                            
                                    const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };
                                    const dbSession = await SessionDA.createUserSession(response.session.getHandle(), sessionPayload, await response.session.getExpiry())
                                    // console.log ('backend signUpPost created session: ', dbSession)
                                }
                                // console.log('backend signUpPost response: ', response)
                                return response
                            },
                        }
                    },
                },
            }),
            Session.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            createNewSession: async (input) => {
                                input.accessTokenPayload = {
                                    ...input.accessTokenPayload,
                                    ...(await UserRoleClaim.build(input.userId, input.userContext))
                                };
                                console.log('accessTokenPayload: ', input.accessTokenPayload)
                                console.log('backend createNewSession input: ', input)
                                // create new user session, or driver session
                                const session = await originalImplementation.createNewSession(input)
                                const sessionPayload:SessionPayload = { userId: input.userId, username: input.accessTokenPayload.username, email: input.accessTokenPayload.email };
                                console.log('NEW SESSIONS PAYLOAD: ', sessionPayload)
                                const dbSession = await SessionDA.createUserSession(session.getHandle(), sessionPayload, await session.getExpiry())
                                return session;
                            }
                        }
                    },
                    apis: (originalImplementation) => {
                        return { 
                            ...originalImplementation,
                            refreshPOST: async (input) => {
                                console.log('backend refreshPOST input: ', input)
                                const session = await originalImplementation.refreshPOST(input)
                                await SessionDA.updateExpireSession(session.getHandle(), await session.getExpiry())
                                return session;
                            },
                            signOutPOST: async (input) => {
                                const response = await originalImplementation.signOutPOST(input)
                                await SessionDA.deleteSession(input.session.getHandle())
                                return response;
                            },
                        }
                    },
                }
            }),
            Dashboard.init({
                apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
            }),
        ],
        isInServerlessEnv: false,
    };
};
