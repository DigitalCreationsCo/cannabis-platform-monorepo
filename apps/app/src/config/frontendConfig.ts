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
    websiteDomain: 'http://app.localhost:3000',
    apiDomain,
    apiBasePath: '/api/v1/'
};

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            Passwordless.init({
                contactMethod: "EMAIL_OR_PHONE",
                onHandleEvent: (event: any) => {
                    console.log('passwordless event: ', event)
                    if (event.action === 'SUCCESS') {
                        console.log('role ? ', event.user && event.user.memberships?.[0]?.role.toLocaleUpperCase())
                        if (event.user && event.user.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
                        event.user.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER') {
                            window.location.href = dashboardDomain + '/dashboard';
                        } else {
                            window.location.href = shopDomain;
                        }
                    }
                }
            }),
            Session.init({
                // @ts-ignore
                sessionTokenFrontendDomain: '.localhost:3000',
                // sessionTokenBackendDomain: '.localhost:3000',
                onHandleEvent: (event) => {
                    if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                        // window.location.href = '/';
                    }
                    if (event.action === 'SESSION_CREATED') {
                        console.log('session created')
                        if (
                            event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
                            event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER'
                        ) {
                            window.location.href = dashboardDomain;
                        } else {
                            window.location.reload()
                        }
                    }
                },
            })
        ],
        isInServerLessEnv: false
    };
};
