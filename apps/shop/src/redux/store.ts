import { configureStore } from '@reduxjs/toolkit';
import { signIn, signUp } from 'supertokens-auth-react/recipe/emailpassword';
import { signOut } from 'supertokens-auth-react/recipe/session';

const supertokens = () => {
    return { signIn, signUp, signOut };
};

import {
    crashMiddleware,
    locationReducer,
    // vendorReducer,
    // productsReducer,
    // cartReducer,
    // modalReducer,
    // paymentReducer,
    // messageReducer,
    // socketReducer,
    loggerMiddleware,
    modalReducer,
    userReducer
} from '@cd/shared-lib';

function createStore() {
    const thunkArguments = { store: null, supertokens: supertokens() };

    const store = configureStore({
        reducer: {
            modal: modalReducer,
            user: userReducer,
            location: locationReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: thunkArguments
                }
            }).concat([crashMiddleware, loggerMiddleware])
    });

    thunkArguments.store = store;
    return store;
}
const store = createStore();

export default store;
export type RootState = ReturnType<typeof store.getState>;
