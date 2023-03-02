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
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            async signUp(input) {
                                console.log('frontend signup input: ', input);
                                const response = await originalImplementation.signUp(input);
                                console.log('frontend signup response: ', response);
                                if (response.status === 'OK') {
                                    console.log('frontend signup: session created');
                                    return { ...response, user: { ...response?.user, ...input.userContext } };
                                }
                            }
                        };
                    }
                },
                signInAndUpFeature: {
                    // signUpForm: {
                    //     formFields: [
                    //         { id: 'email', label: 'Email' },
                    //         { id: 'password', label: 'Password' }
                    //         { id: 're-password', label: 'Confirm Password' },
                    //         { id: 'username', label: 'Username' }
                    //         { id: 'firstName', label: 'First Name' },
                    //         { id: 'lastName', label: 'Last Name' },
                    //         { id: 'phone', label: 'Phone' },
                    //         { id: 'dialCode', label: 'Dial Code' },
                    //         { id: 'address.countryCode', label: 'Country Code' },
                    //         { id: 'address.country', label: 'Country' },
                    //         { id: 'address.city', label: 'City' },
                    //         { id: 'address.state', label: 'State' },
                    //         { id: 'address.zipcode', label: 'Zipcode' },
                    //         { id: 'address.street1', label: 'Street 1' },
                    //         { id: 'address.street2', label: 'Street 2', optional: true },
                    //         { id: 'termsAccepted', label: 'Terms Accepted' }
                    //     ]
                    // }
                },
                onHandleEvent: (context) => {
                    console.log('fe emailpassword context: ', context);
                    if (context.action === 'SUCCESS') {
                        console.log('fe emailpassword success: ', context);
                        return context;
                    }
                }
            }),
            Session.init({
                onHandleEvent: (event: RecipeEventWithSessionContext) => {
                    if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
                        window.location.href = '/welcome';
                    }
                    if (event.action === 'SESSION_CREATED') {
                        console.log('fe session created: ', event.userContext);
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
