import { appInfo } from "@cd/shared-config/auth/appInfo";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { AuthConfig } from "../../interfaces";

export let backendConfig = (): AuthConfig => {
    return {
        framework: "express",
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
        },
        appInfo,
        recipeList: [
            EmailPasswordNode.init(),
            SessionNode.init(),
            Dashboard.init({
                apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
            }),
        ],
        isInServerlessEnv: true,
    };
};
