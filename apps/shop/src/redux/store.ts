import { configureStore } from '@reduxjs/toolkit';

import {
    crashMiddleware,
    // userReducer,
    // vendorReducer,
    // productsReducer,
    // cartReducer,
    // modalReducer,
    // paymentReducer,
    // messageReducer,
    // socketReducer,
    loggerMiddleware,
    modalReducer
} from '@cd/shared-lib';

function createStore() {
    const thunkArguments = { store: null };

    const store = configureStore({
        reducer: {
            modal: modalReducer
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
