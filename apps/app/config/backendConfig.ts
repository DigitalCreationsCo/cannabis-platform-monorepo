import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { appInfo } from '@cd/shared-config/auth/appInfo';
import { AuthConfig } from '../interfaces';

// import { superTokensNextWrapper } from 'supertokens-node/nextjs';
// import supertokens from 'supertokens-node';
// import { middleware } from 'supertokens-node/framework/express';
// import { backendConfig } from '../../../config/backendConfig';

// supertokens.init(backendConfig());

// export default async function superTokens(req, res) {
//     await superTokensNextWrapper(
//         async (next) => {
//             res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
//             await middleware()(req, res, next);
//         },
//         req,
//         res
//     );
//     if (!res.writableEnded) {
//         res.status(404).send('Not found');
//     }
// }

export const backendConfig = (): AuthConfig => {
    return {
        framework: 'express',
        supertokens: {
            // this is the location of the SuperTokens core.
            // connectionURI: "https://dev-7df8c83181c511edb537317a8c6fe87a-us-east-1.aws.supertokens.io:3572",
            connectionURI: 'https://try.supertokens.com',
        },
        appInfo,
        // recipeList contains all the modules that you want to
        // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
        recipeList: [
            EmailPasswordNode.init(),
            SessionNode.init(),
            Dashboard.init({
                // apiKey: "l87ZtvrDXHQZdqalA=M8j7r5=JmLDx",
                apiKey: 'supertokens_is_awesome',
            }),
        ],
        isInServerlessEnv: true,
    };
};
