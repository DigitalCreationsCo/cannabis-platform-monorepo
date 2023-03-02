import { Address, findUserWithDetailsByEmail, SessionPayload, UserCreateType, UserLoginData } from "@cd/data-access";
import { appInfo } from "@cd/shared-config/auth/appInfo";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import STSession from "supertokens-node/recipe/session";
import { AuthConfig } from "../../interfaces";
import { UserDA } from "../api/data-access";

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
                                const user = await findUserWithDetailsByEmail(input.email)
                                console.log('backend signin user: ', user)
                                // if (userContext === null) {
                                //     throw new Error('User does not exist');
                                // }
                                // if (userContext !== null && userContext.passwordHash === null) {
                                //     throw new Error('Please reset your password');
                                // }

                                // if (userContext !== null && !isPasswordMatch(input.password, userContext.passwordHash)) {
                                //     throw new Error('Invalid password')
                                // }
                                const response = await originalImplementation.signIn({...input, userContext: user})
                                console.log('backend signin response: ', response)
                                return response
                            },
                            // async signUp(input) {
                            //     const response = await originalImplementation.signUp(input)
                            //     if (response.status === 'OK') {
                            //         // set cuid as the user id, for data parity
                            //         response.user.id = createId()
                            //     }
                            //     if (response.status ==="EMAIL_ALREADY_EXISTS_ERROR") return response
                            //     console.log('backend signup response: ', response)
                            //     return response
                            // }
                        }
                    },
                    apis(originalImplementation) {
                        return {
                            ...originalImplementation,
                            signUpPOST: async function (input) {
                                console.log('backend signUpPost input: ', input)
                                if (originalImplementation.signUpPOST === undefined) {
                                    throw Error("backend signUpPost: Something went wrong.");
                                }
                                
                                let response = {...await originalImplementation.signUpPOST(input) }
                                if (response.status === 'OK') {
                                    const formFieldsArr = Object.values(input.formFields)
                                    const formFields = formFieldsArr.map((_, index )=> {
                                        const id = formFieldsArr[index]['id']
                                        // console.log('id: ', id)
                                        // const idVal = _[id]
                                        // console.log('id value: ', idVal)
                                        // const idVal2 = _['id']
                                        // console.log('id value 2: ', idVal2)
                                        // return {_,[id]: '1'}
                                        return {[id]: _['value']}
                                    })
                                    const formFieldsTransformed = Object.assign({}, ...formFields)
                                    // console.log('form fields transformed: ', formFieldsTransformed)
                                    response = { ...response, user: {...response.user, ...formFieldsTransformed }} // yes
                                    console.log('backend signUpPost OK response: ', response)

                                    const {timeJoined, street1, street2, city, state, zipcode, country, countryCode, ...createUserData} = response.user as EmailPassword.User & UserCreateType & Address
                                    createUserData.address = {street1, street2, city, state, zipcode, country, countryCode}
                                    createUserData.createdAt = new Date(timeJoined)
                                    console.log('create user data: ', createUserData)

                                    const user = await UserDA.createUser(createUserData);
                                    console.log ('backend signUpPost created user: ', user)
                                    // const sessionToken = await STSession.createNewSession(res, user.id, sessionPayload, { data: 'SESSION TEST DATA' }, user);

                                    // future note: drivers will have only session active on a device.
                                    // Drivers will need their own session function for login
                            
                                    const sessionPayload:SessionPayload = { userId: user.id, username: user.username, email: user.email };
                                    const dbSession = await UserDA.createUserSession(response.session.getHandle(), sessionPayload, await response.session.getExpiry())
                                    console.log ('backend signUpPost created session: ', dbSession)
                                }
                                console.log('backend signUpPost response: ', response)
                                return response
                            },
                        }
                    },
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
