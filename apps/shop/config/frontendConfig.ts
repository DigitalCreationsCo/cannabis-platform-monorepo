import { RecipeEventWithSessionContext } from 'supertokens-auth-react/lib/build/recipe/session/types';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

// const port = process.env.SHOP_APP_PORT || 30000;
// const appInfo = {
//     appName: 'Cannabis Delivery',
//     websiteDomain: process.env.NEXT_PUBLIC_SHOP_APP_URL || `http://localhost:${port}`,
//     apiDomain: process.env.SERVER_MAIN_URL || `http://localhost:60001`,
//     apiBasePath: '/api/v1/'
// };
const appInfo = {
    appName: 'Cannabis Delivery',
    websiteDomain: 'http://localhost:3000',
    apiDomain: process.env.SERVER_MAIN_URL,
    apiBasePath: '/api/v1/'
};

export const frontendConfig = () => {
    console.log('FRONTEND API INFO: ', appInfo);
    return {
        appInfo,
        recipeList: [
            EmailPassword.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            async signUp(input) {
                                // console.log('frontend signup input: ', input);
                                const response = await originalImplementation.signUp(input);
                                // console.log('frontend signup response: ', response);
                                if (response.status === 'FIELD_ERROR') return response;
                                return response;
                            },
                            async signIn(input) {
                                console.log('frontend signin input: ', input);
                                const response = await originalImplementation.signIn(input);
                                console.log('frontend signin response: ', response);
                                if (response.status === 'FIELD_ERROR') return response;
                                return response;
                            }
                        };
                    }
                }
                // onHandleEvent: (context) => {
                //     if (context.action === 'SUCCESS') {
                //         // console.log('fe emailpassword success: ', context);
                //         return context;
                //     }
                //     return context;
                // }
            }),
            Session.init({
                // override: {
                //     functions: (originalImplementation) => {
                //         return {
                //             ...originalImplementation,
                //             signOut(input) {
                //                 return originalImplementation.signOut(input);
                //             }
                //         };
                //     }
                // }
                onHandleEvent: (event: RecipeEventWithSessionContext) => {
                    if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                        window.location.href = '/';
                    }
                    if (event.action === 'SESSION_CREATED') {
                        if (
                            event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
                            event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER'
                        ) {
                            // window.location.href = '/dashboard';
                            window.location.href = '/';
                        } else {
                            window.location.href = '/';
                        }
                    }
                }
            })
        ],
        isInServerLessEnv: false
    };
};
