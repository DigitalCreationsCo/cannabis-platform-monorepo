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
import { Action, AnyAction, combineReducers, configureStore, Store, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { signIn, signUp } from 'supertokens-auth-react/recipe/emailpassword';
import { signOut } from 'supertokens-auth-react/recipe/session';

const supertokens = () => {
    return { signIn, signUp, signOut };
};

const rootReducer = combineReducers({
    modal: modalReducer,
    user: userReducer,
    location: locationReducer
});

const hydratableReducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        };
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

const thunkArguments = { store: null, supertokens: supertokens() };

function createStore() {
    function createConfiguredStore(reducer) {
        return configureStore({
            reducer,
            devTools: process.env.NODE_ENV !== 'production',
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    thunk: {
                        extraArgument: thunkArguments
                    }
                }).concat([crashMiddleware, loggerMiddleware])
        });
    }

    let store: Store & { _persistor?: Persistor };
    const isServer = typeof window === 'undefined';
    if (isServer) {
        store = createConfiguredStore(hydratableReducer);
    } else {
        const persistConfig = {
            key: 'nextjs',
            whitelist: ['user', 'location'],
            storage
        };
        const persistedReducer = persistReducer(persistConfig, hydratableReducer);
        store = createConfiguredStore(persistedReducer);
        store._persistor = persistStore(store);
    }

    thunkArguments.store = store;

    return store;
}

export const wrapper = createWrapper<AppStore>(createStore, { debug: true });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
