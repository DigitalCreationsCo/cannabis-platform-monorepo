import { appInfo } from '@cd/shared-config/auth/appInfo';
import { RecipeEventWithSessionContext } from 'supertokens-auth-react/lib/build/recipe/session/types';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export const frontendConfig = () => {
    console.log('FRONTEND API INFO: ', appInfo);
    return {
        appInfo,
        recipeList: [
            EmailPassword.init({
                onHandleEvent: (context) => {
                    if (context.action === 'SUCCESS') {
                        console.log('emailpassword success: ', context);
                    }
                }
            }),
            Session.init({
                onHandleEvent: (event: RecipeEventWithSessionContext) => {
                    if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                        window.location.href = '/welcome';
                    }
                    if (event.action === 'SESSION_CREATED') {
                        console.log('session created: ', event.userContext);
                        if (
                            event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
                            event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER'
                        ) {
                            // window.location.href = '/dashboard';
                            window.location.href = '/';
                        } else {
                            window.location.href = '/';
                        }
                    }
                }
            })
        ],
        isInServerLessEnv: false
    };
};
