// import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from 'supertokens-auth-react/recipe/session';

const appInfo = {
    appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME,
    websiteDomain: process.env.NEXT_PUBLIC_SHOP_APP_URL || 'http://localhost:3000',
    apiDomain: process.env.NEXT_PUBLIC_SERVER_MAIN_URL || 'http://localhost:6001',
    apiBasePath: '/api/v1/'
};

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            Passwordless.init({
                contactMethod: "EMAIL_OR_PHONE",
            }),
            Session.init()
        ],
        isInServerLessEnv: false
    };
};
