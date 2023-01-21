import { appInfo } from '@cd/shared-config/auth/appInfo';
import Router from 'next/router';
import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { WindowHandlerInterface } from 'supertokens-website/utils/windowHandler/types';

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [EmailPasswordReact.init(), SessionReact.init()],
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
