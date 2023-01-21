import { appInfo } from "@cd/shared-config/auth/appInfo";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { AuthConfig } from "../../interfaces";

export let backendConfig = (): AuthConfig => {
    return {
        framework: "express",
        supertokens: {
            connectionURI: "http://localhost:3567",
        },
        appInfo,
        recipeList: [
            EmailPasswordNode.init(),
            SessionNode.init(),
            Dashboard.init({
                apiKey: "l87ZtvrDXHQZdqalA=M8j7r5=JmLDx",
            }),
        ],
        isInServerlessEnv: true,
    };
};
