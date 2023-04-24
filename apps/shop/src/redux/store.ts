/// @ts-nocheck

import {
  cartReducer,
  // crashMiddleware,
  locationReducer,
  // loggerMiddleware,
  modalReducer,
  shopReducer,
  userReducer
} from '@cd/core-lib';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
// import { deserialize, serialize } from 'json-immutable';
// import { createWrapper } from 'next-redux-wrapper';
import { signIn, signUp } from 'supertokens-auth-react/recipe/emailpassword';
import { signOut } from 'supertokens-web-js/recipe/session';

import { HYDRATE } from 'next-redux-wrapper';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    modal: modalReducer,
    user: userReducer,
    location: locationReducer,
    shop: shopReducer,
    cart: cartReducer
});

const hydratableReducer = (state, action) => {
  if (action.type === HYDRATE) {
      return {
        ...state, // use previous state
        // ...action.payload // apply delta from hydration
    };
  } else if(action.type === REHYDRATE) {
      return { 
        ...state,
        // ...action.payload // apply delta from hydration
    };
  } else {
      return rootReducer(state, action);
  }
};

const supertokens = () => {
    return { signIn, signUp, signOut };
};

export default (initialState) => {
  let store;

  const isClient = typeof window !== 'undefined';

  const thunkArguments: {store: Store | null, supertokens: any } = { store: null, supertokens: supertokens() };

  if (isClient) {
    const persistConfig = {
      key: 'root',
      storage
    };


    store = configureStore({
      reducer: persistReducer(persistConfig, rootReducer),
      preloadedState: initialState,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
            thunk: {
                extraArgument: thunkArguments
            }
        })
        // .concat([crashMiddleware, loggerMiddleware])
    });

     store._persistor = persistStore(store);
     
  } else {
    store = configureStore({
      reducer: hydratableReducer,
      preloadedState: initialState,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
            thunk: {
                extraArgument: thunkArguments
            }
        })
        // .concat([crashMiddleware, loggerMiddleware])
    });
  }

  thunkArguments.store = store;

  return store;
};

// const supertokens = () => {
//     return { signIn, signUp, signOut };
// };

// export type PersistedStore = Store & { _persistor: Persistor };

// // const bindMiddleware = (middleware) => {
// //     if (process.env.NODE_ENV !== 'production') {
// //         return composeWithDevTools(applyMiddleware(...middleware));
// //     }
// //     return applyMiddleware(...middleware);
// // };

// // const hydratableReducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
// //     if (action.type === HYDRATE) {
// //         const nextState = {
// //             ...state, // use previous state
// //             ...action.payload // apply delta from hydration
// //         };
// //         return nextState;
// //     } else {
// //         return rootReducer(state, action);
// //     }
// // };

// const thunkArguments: {store: Store | null, supertokens: any } = { store: null, supertokens: supertokens() };

// function makeStore() {
//     function createConfiguredStore<T>(reducer:Reducer) {
//         return configureStore({
//             reducer,
//             devTools: process.env.NODE_ENV !== 'production',
//             // preloadedState:
//             middleware: (getDefaultMiddleware) =>
//                 getDefaultMiddleware({
//                     thunk: {
//                         extraArgument: thunkArguments
//                     }
//                 }).concat([crashMiddleware, loggerMiddleware])
//         });
//     }

//     let store

//     const isServer = typeof window === 'undefined';
//     if (isServer) {
//         // store = createConfiguredStore(hydratableReducer);
//         store = createConfiguredStore<Store>(rootReducer);
//     } else {
//         const persistConfig = {
//             key: 'nextjs',
//             whitelist: ['user', 'modal', 'location'],
//             storage
//         };

//         const persistedReducer = persistReducer(persistConfig, rootReducer);
//         store = createConfiguredStore<PersistedStore>(persistedReducer) as PersistedStore;
//         store._persistor = persistStore(store);
//     }

//     thunkArguments.store = store;

//     return store;
// }
// const store = makeStore();

// export const wrapper = createWrapper<AppStore>(makeStore, {
//     debug: true,
//     serializeState: (state) => serialize(state),
//     deserializeState: (state) => deserialize(state)
// });

// export type AppStore = ReturnType<typeof makeStore>;

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
