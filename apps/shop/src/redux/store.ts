/// @ts-nocheck

import {
  cartReducer,
  locationReducer,
  modalReducer,
  shopReducer,
  userReducer
} from '@cd/core-lib';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
// import { deserialize, serialize } from 'json-immutable';
// import { createWrapper } from 'next-redux-wrapper';
import { signInEmailPassword, signUpEmailPassword } from 'supertokens-auth-react/recipe/emailpassword';
import { signOut } from 'supertokens-auth-react/recipe/session';

import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistReducer, persistStore, REHYDRATE } from 'redux-persist';
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
    return { signInEmailPassword, signUpEmailPassword, signOut };
};

const makeStore = () => {
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
    });

     store._persistor = persistStore(store);
     
  } else {
    store = configureStore({
      reducer: hydratableReducer,
    });
  }

  thunkArguments.store = store;

  return store;
};

// // const bindMiddleware = (middleware) => {
// //     if (process.env.NODE_ENV !== 'production') {
// //         return composeWithDevTools(applyMiddleware(...middleware));
// //     }
// //     return applyMiddleware(...middleware);
// // };

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  // debug: process.env.NODE_ENV !== 'production',
  // serializeState: (state) => serialize(state),
  // deserializeState: (state) => deserialize(state)
});