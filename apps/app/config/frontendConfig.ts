import { appInfo } from '@cd/shared-config/auth/appInfo';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export const frontendConfig = () => {
    console.log('FRONTEND API INFO: ', appInfo);
    return {
        appInfo,
        recipeList: [
            EmailPassword.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            async signUp(input) {
                                console.log('frontend signup input: ', input);
                                const response = await originalImplementation.signUp(input);
                                console.log('frontend signup response: ', response);
                                if (response.status === 'FIELD_ERROR') return response;
                                return response;
                            }
                        };
                    }
                },
                onHandleEvent: (context) => {
                    console.log('fe emailpassword context: ', context);
                    if (context.action === 'SUCCESS') {
                        console.log('fe emailpassword success: ', context);
                        return context;
                    }
                    return context;
                }
            }),
            Session.init({
                // onHandleEvent: (event: RecipeEventWithSessionContext) => {
                //     if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                //         window.location.href = '/welcome';
                //     }
                //     if (event.action === 'SESSION_CREATED') {
                //         console.log('fe session created: ', event.userContext);
                //         if (
                //             event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
                //             event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER'
                //         ) {
                //             // window.location.href = '/dashboard';
                //             window.location.href = '/';
                //         } else {
                //             window.location.href = '/';
                //         }
                //     }
                // }
            })
        ],
        isInServerLessEnv: false
    };
};
