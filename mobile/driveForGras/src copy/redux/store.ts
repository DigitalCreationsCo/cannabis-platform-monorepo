import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import cart from "./cart.slice";
import message from "./message.slice";

const rootReducer = combineReducers({
  cart,
  message
});

const 
storage = createSecureStore(),
config = {
  key: "root",
  storage
};

const reducer = persistReducer(config, rootReducer);

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    })
  .concat([])
});

export const persistor = persistStore(store);