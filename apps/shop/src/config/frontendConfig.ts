// import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from 'supertokens-auth-react/recipe/session';

const appInfo = {
    appName: 'Cannabis Delivery',
    websiteDomain: process.env.NEXT_PUBLIC_SHOP_APP_URL || 'http://localhost:3000',
    apiDomain: process.env.NEXT_PUBLIC_SERVER_MAIN_URL || 'http://localhost:6001',
    apiBasePath: '/api/v1/'
};

console.log('front end app info: ', appInfo);
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
                // onHandleEvent: (event) => {
                //     if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                //         window.location.href = '/';
                //     }
                //     if (event.action === 'SESSION_CREATED') {
                //         if (
                //             event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
                //             event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER'
                //         ) {
                //             // window.location.href = '/dashboard';
                //             window.location.href = '/';
                //         } else {
                //             window.location.href = '/';
                //         }
                //     }
                // },
            })
        ],
        isInServerLessEnv: false
    };
};
