import { findUserWithDetailsByEmail, UserLoginData } from "@cd/data-access/dist";
import { appInfo } from "@cd/shared-config/auth/appInfo";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import STSession from "supertokens-node/recipe/session";
import { AuthConfig } from "../../interfaces";
import { isPasswordMatch } from "../util/utility";

export let backendConfig = (): AuthConfig => {
    console.log('SERVER MAIN: appInfo: ', appInfo)
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
                                if (input) {
                                    console.log('SERVER MAIN: signin input: ', input);
                                    const userContext = await findUserWithDetailsByEmail(input.email)

                                    if (userContext !== null && userContext.passwordHash === null) {
                                        throw new Error('Please reset your password');
                                    }

                                    if (userContext !== null && !isPasswordMatch(input.password, userContext.passwordHash)) {
                                        throw new Error('Invalid password')
                                    }
                                    return originalImp.signIn({...input, userContext})
                                }
                            },
                            // async signUp(input) {
                            //     if (input) {
                            //         console.log('SERVER MAIN: signup input: ', input);
                            //     }
                            //     return originalImp.signUp(input)
                            // }
                        }
                    }
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
