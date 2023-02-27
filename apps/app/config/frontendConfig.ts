import { appInfo } from '@cd/shared-config/auth/appInfo';
import { RecipeEventWithSessionContext } from 'supertokens-auth-react/lib/build/recipe/session/types';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            EmailPassword.init({
                // onHandleEvent: (context) => {
                //     if (context.action === 'WRONG_CREDENTIALS_ERROR') {
                //         throw new Error('Wrong email');
                //     }
                // }
            }),
            Session.init({
                onHandleEvent: (event: RecipeEventWithSessionContext) => {
                    if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                        window.location.href = '/welcome';
                    }
                }
            })
        ],
        isInServerLessEnv: false
    };
};
