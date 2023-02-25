import { AccessTokenPayload, findUserWithDetailsByEmail, UserLoginData } from "@cd/data-access/dist";
import { appInfo } from "@cd/shared-config/auth/appInfo";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { AuthConfig } from "../../interfaces";

export let backendConfig = (): AuthConfig => {
    console.log('SERVER MAIN: appInfo: ', appInfo)
    return {
        framework: "express",
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
        },
        appInfo,
        recipeList: [
            EmailPasswordNode.init({
                override: {
                    functions(originalImp) {
                        return { 
                            ...originalImp,
                            async signIn(input: UserLoginData) {
                                if (input) {
                                    const user = await findUserWithDetailsByEmail(input.email)

                                    if (user !== null && user.hashedPassword === null) {
                                        throw new Error('Please reset your password');
                                    }

                                    // if (user !== null && !(await compare(userLoginData.password, user.hashedPassword ?? ''))) {
                                    //     throw new Error('Invalid password')
                                    // }
                                    const payload: AccessTokenPayload = { id: user.id, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName, memberships: user.memberships };
                                    return originalImp.signIn({...input, userContext: payload})
                                }
                            },
                            async signUp(input) {
                                if (input) {

                                }
                                return originalImp.signUp(input)
                            }
                        }
                    }
                }
            }),
            SessionNode.init(),
            Dashboard.init({
                apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
            }),
        ],
        isInServerlessEnv: false,
    };
};
