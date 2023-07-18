import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';

const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME;
const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost';
const shopDomain =
  process.env.NEXT_PUBLIC_SHOP_APP_URL || 'http://localhost:3000';
const apiDomain = process.env.BACKEND_URL || `http://localhost:6001`;
// this v makes no sense, I don't understand the result is inverted in localhost
const apiBasePath = process.env.IS_LOCAL && '/main/api/v1' || '/api/v1';

const appInfo: {
  appName: string | undefined;
  websiteDomain: string;
  apiDomain: string;
  apiBasePath: string;
} = {
  appName,
  websiteDomain: shopDomain,
  apiDomain,
  // query this path for all auth requests
  apiBasePath,
};

export const frontendConfig = () => {
  console.info('shop frontend config: ', appInfo);
  return {
    appInfo,
    recipeList: [
      Passwordless.init({
        contactMethod: 'EMAIL_OR_PHONE',
        onHandleEvent: (event: any) => {
          console.info('passwordless event: ', event);
          if (event.action === 'SUCCESS') {
            if (
              (event.user &&
                event.user.memberships?.[0]?.role.toLocaleUpperCase() ===
                'ADMIN') ||
              event.user.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER'
            )
              throw new Error(`
                            Admin permissions are not allowed here. 
                            Please sign in at Dispensary portal. Thank you.`);
            // else if (event.isNewUser || !event.user.isSignUpComplete)
            // window.location.href = `${shopDomain}/signup/create-account`;
            // else {
            // window.location.href = `${shopDomain}${window.location.pathname}`;
            // }
          }
        },
      }),
      Session.init({
        cookieDomain: `.${baseDomain}`,
      }),
    ],
    isInServerLessEnv: false,
  };
};
