import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import { appInfo } from "@cd/shared-config/auth/appInfo";
import { AuthConfig } from "../../interfaces";

export let backendConfig = (): AuthConfig => {
    return {
        framework: "express",
        supertokens: {
            // this is the location of the SuperTokens core.
            // connectionURI: "https://dev-7df8c83181c511edb537317a8c6fe87a-us-east-1.aws.supertokens.io:3572",
            // connectionURI: "https://try.supertokens.com",
            connectionURI: "http://localhost:3567",
        },
        appInfo,
        // recipeList contains all the modules that you want to
        // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
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
