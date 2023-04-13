import {
    cartReducer,
    crashMiddleware,
    locationReducer,
    loggerMiddleware,
    modalReducer,
    shopReducer,
    userReducer
} from '@cd/shared-lib';
import { Store, combineReducers, configureStore } from '@reduxjs/toolkit';
import { deserialize, serialize } from 'json-immutable';
import { createWrapper } from 'next-redux-wrapper';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { signIn, signUp } from 'supertokens-auth-react/recipe/emailpassword';
import { signOut } from 'supertokens-web-js/recipe/session';

const supertokens = () => {
    return { signIn, signUp, signOut };
};

const rootReducer = combineReducers({
    modal: modalReducer,
    user: userReducer,
    location: locationReducer,
    shop: shopReducer,
    cart: cartReducer
});

export type PersistedStore = Store & { _persistor?: Persistor };

// const bindMiddleware = (middleware) => {
//     if (process.env.NODE_ENV !== 'production') {
//         return composeWithDevTools(applyMiddleware(...middleware));
//     }
//     return applyMiddleware(...middleware);
// };

// const hydratableReducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             ...action.payload // apply delta from hydration
//         };
//         return nextState;
//     } else {
//         return rootReducer(state, action);
//     }
// };

const thunkArguments = { store: null, supertokens: supertokens() };

function makeStore() {
    function createConfiguredStore(reducer) {
        return configureStore({
            reducer,
            devTools: process.env.NODE_ENV !== 'production',
            // preloadedState:
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    thunk: {
                        extraArgument: thunkArguments
                    }
                }).concat([crashMiddleware, loggerMiddleware])
        });
    }

    let store: PersistedStore;

    const isServer = typeof window === 'undefined';
    if (isServer) {
        // store = createConfiguredStore(hydratableReducer);
        store = createConfiguredStore(rootReducer);
    } else {
        const persistConfig = {
            key: 'nextjs',
            whitelist: ['user', 'modal', 'location'],
            storage
        };

        const persistedReducer = persistReducer(persistConfig, rootReducer);
        store = createConfiguredStore(persistedReducer);
        store._persistor = persistStore(store);
    }

    thunkArguments.store = store;

    return store;
}
const store = makeStore();

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: true,
    serializeState: (state) => serialize(state),
    deserializeState: (state) => deserialize(state)
});

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
