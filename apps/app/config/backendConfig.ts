import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { appName, websiteDomain, appInfo } from '@cd/shared-config/auth/appInfo';
import { AuthConfig } from '../interfaces';

export const backendConfig = (): AuthConfig => {
    return {
        framework: 'express',
        supertokens: {
            connectionURI: "http://localhost:3567",
        },
        appInfo: {
            appName,
            websiteDomain,
            apiDomain: websiteDomain,
            apiBasePath: "/auth",
        },
        recipeList: [
            EmailPasswordNode.init(),
            SessionNode.init({
                cookieSecure: false
            }),
            Dashboard.init({
                apiKey: "l87ZtvrDXHQZdqalA=M8j7r5=JmLDx",
            }),
        ],
        isInServerlessEnv: true,
    };
};
