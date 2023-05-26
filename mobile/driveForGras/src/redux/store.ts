import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";

const rootReducer = combineReducers({});

const storage = createSecureStore();

const config = {
  key: "root",
  storage
};

const reducer = persistCombineReducers(config, rootReducer);

export default () => {
    const
    store = configureStore({
        reducer: reducer,
        // preloadedState: initialState,
        middleware: getDefaultMiddleware => 
        getDefaultMiddleware()
        .concat([])
    });

    const persistor = persistStore(store);
    
    return { persistor, store };
}