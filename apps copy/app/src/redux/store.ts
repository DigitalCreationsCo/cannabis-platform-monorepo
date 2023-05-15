/// @ts-nocheck

import {
  modalReducer,
  userReducer
} from '@cd/core-lib';
import {
  crashMiddleware,
  loggerMiddleware
} from '@cd/core-lib/src/reduxDir/middleware';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
// import { deserialize, serialize } from 'json-immutable';
// import { createWrapper } from 'next-redux-wrapper';
import { signInEmailPassword, signUpEmailPassword } from 'supertokens-auth-react/recipe/emailpassword';
import { signOut } from 'supertokens-auth-react/recipe/session';

import { HYDRATE } from 'next-redux-wrapper';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    modal: modalReducer,
    user: userReducer,
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
    return { signInEmailPassword, signUpEmailPassword, signOut };
};

export default (initialState) => {
  let store;

  const isClient = typeof window !== 'undefined';

  const thunkArguments: {store: Store | null, supertokens: any } = { store: null, supertokens: supertokens() };

  if (isClient) {
    const persistConfig = {
      key: 'root',
      blacklist: ['modal'],
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
        .concat([crashMiddleware, loggerMiddleware])
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
        .concat([crashMiddleware, loggerMiddleware])
    });
  }

  thunkArguments.store = store;

  return store;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
