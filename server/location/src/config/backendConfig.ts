import Session from 'supertokens-node/recipe/session';
// import { UserRoleClaim } from "supertokens-node/recipe/userroles";
import Dashboard from 'supertokens-node/recipe/dashboard';
import { AuthConfig } from '../../interfaces';

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost';
const dashboardDomain =
  process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://localhost:3001';
const apiDomain = process.env.BACKEND_URL || `http://localhost:6001`;

const appInfo = {
  appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
  apiDomain,
  websiteDomain: dashboardDomain,
  apiBasePath: '/api/v1',
};

export const backendConfig = (): AuthConfig => {
  console.info(' ✈️ server/location backend config: ', appInfo);
  return {
    framework: 'express',
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
    },
    appInfo,
    recipeList: [
      Session.init({
        cookieSecure: true,
        cookieDomain: `.${baseDomain}`,
        jwt: { enable: true },
      }),
      Dashboard.init({
        apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
      }),
    ],
    isInServerlessEnv: false,
  };
};
