// import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from 'supertokens-auth-react/recipe/session';

const appName           = process.env.NEXT_PUBLIC_SHOP_APP_NAME;
const baseDomain        = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost';
const shopDomain        = process.env.NEXT_PUBLIC_SHOP_APP_URL || 'http://localhost:3000';
const dashboardDomain   = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://app.localhost:3000';
const apiDomain         = process.env.NEXT_PUBLIC_SERVER_MAIN_URL || 'http://localhost:6001';

const appInfo: {
    appName: string | undefined;
    websiteDomain: string;
    apiDomain: string;
    apiBasePath: string;
} = {
    appName,
    websiteDomain: "http://localhost:3000",
    apiDomain,
    apiBasePath: '/api/v1/'
};

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            Passwordless.init({
                contactMethod: "EMAIL_OR_PHONE",
            }),
            // EmailPassword.init({
            //     override: {
            //         functions: (originalImplementation) => {
            //             return {
            //                 ...originalImplementation,
            //                 async signUp(input) {
            //                     console.log('sign up input on frontend');
            //                     const response = await originalImplementation.signUp(input);
            //                     console.log('sign in event: ', response);
            //                     return response;
            //                 },
            //                 async signIn(input) {
            //                     const response = await originalImplementation.signIn(input);
            //                     console.log('sign up event: ', response);
            //                     return response;
            //                 }
            //             };
            //         }
            //     }
            // }),
            Session.init({
                sessionTokenFrontendDomain: '.localhost:3000',
                // sessionTokenBackendDomain: '.localhost:3000',
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
                onHandleEvent: (event) => {
                    if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                        window.location.href = '/';
                    }
                    if (event.action === 'SESSION_CREATED') {
                        if (
                            event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
                            event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER'
                        ) {
                            // window.location.href = dashboardDomain;
                        } else {
                            // window.location.reload()
                        }
                    }
                },
            })
        ],
        isInServerLessEnv: false
    };
};
