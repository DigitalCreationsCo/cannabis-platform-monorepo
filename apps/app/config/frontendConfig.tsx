import { appInfo } from '@cd/shared-config/auth/appInfo';
import Router from 'next/router';
import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { WindowHandlerInterface } from 'supertokens-website/utils/windowHandler/types';

export const frontendConfig = () => {
    return {
        appInfo,
        // recipeList contains all the modules that you want to
        // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
        recipeList: [EmailPasswordReact.init(), SessionReact.init()],
        // this is so that the SDK uses the next router for navigation
        windowHandler: (oI: WindowHandlerInterface) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href: string) => {
                        Router.push(href);
                    },
                },
            };
        },
    };
};
