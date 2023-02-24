import { appInfo } from '@cd/shared-config/auth/appInfo';
import { RecipeEventWithSessionContext } from 'supertokens-auth-react/lib/build/recipe/session/types';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [EmailPassword.init(), Session.init({
            onHandleEvent: (event:RecipeEventWithSessionContext)=> {
                if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                    window.location.href='/welcome'
                }
            },
            tokenTransferMethod: 'header'
        })
    ],
    isInServerLessEnv: false
    };
};
