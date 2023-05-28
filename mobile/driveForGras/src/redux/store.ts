import { userReducer } from "@cd/core-lib/src/reduxDir/features/user.reducer";
import { ThunkArgumentsType } from "@cd/core-lib/src/reduxDir/types";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import { signOut } from 'supertokens-react-native';
import cart from "./cart.slice";
import message from "./message.slice";

const rootReducer = combineReducers({
  cart,
  message,
  user: userReducer
});

const 
storage = createSecureStore(),
config = {
  key: "root",
  storage
};

const reducer = persistReducer(config, rootReducer);

// TEST HOW REDUX STORE REACTS IN HOT RELOADING
// IF ISSUES, ADD THIS CODE

// if (module.hot) {
//   module.hot.accept(() => {
//     const nextRootReducer = require('../reducers/index').default;
//     store.replaceReducer(nextRootReducer);
//   });
// }

const 
supertokens = { 
  // signOut: 'signout function here',
  signOut: () => signOut
};

const 
thunkArguments: ThunkArgumentsType = { 
  store: null, supertokens };

  // const 
// thunkArguments: {
//   store: Store;
//   // supertokens: { 
//   //     signUp?: any; 
//   //     signIn?: any; 
//   //     signOut: any;
//   // };
//   supertokens: any;
//   hello?: string;
// } = { 
//   store: null, 
//   supertokens: { 
//     signOut 
//   }
// };

function makeStore () {

  const 
  store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
        thunk: {
          extraArgument: thunkArguments
        }
      })
    .concat([]),

  });
  thunkArguments.store = store;

  const persistor = persistStore(store);

  return { store, persistor }

}

const { store, persistor } = makeStore();

export { store, persistor };
