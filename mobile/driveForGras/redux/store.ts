import { default as socketMiddleware } from '@cd/core-lib/src/middleware/socket.middleware';
import { driverReducer } from '@cd/core-lib/src/reducer/driver.reducer';
import { socketReducer } from '@cd/core-lib/src/reducer/socket.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, type Store } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import { signOut } from 'supertokens-react-native';

const rootReducer = combineReducers({
	driver: driverReducer,
	socket: socketReducer,
});
// create storage config for each reducer, to selectively save data in storage

const config = {
	key: 'root',
	storage: AsyncStorage,
};

// TEST HOW REDUX STORE REACTS IN HOT RELOADING
// IF ISSUES, ADD THIS CODE
// if (module.hot) {
//   module.hot.accept(() => {
//     const nextRootReducer = require('../reducers/index').default;
//     store.replaceReducer(nextRootReducer);
//   });
// }

const supertokensArguments = {
	signOut: () => signOut,
};

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

const makeStore = () => {
	const thunkArguments: { store: Store | null; supertokens: any } = {
		store: null,
		supertokens: supertokensArguments,
		// navigation: navigationService,
	};

	const store = configureStore({
		devTools: process.env.NODE_ENV !== 'production',
		reducer: persistReducer(config, rootReducer),
		middleware: (getDefaultMiddleware) =>
			[
				...getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
					thunk: {
						extraArgument: thunkArguments,
					},
				}),
			].concat([socketMiddleware]),
	});
	thunkArguments.store = store;

	const persistor = persistStore(store);

	return { store, persistor };
};

const { store, persistor } = makeStore();

export { store, persistor };
