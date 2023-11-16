import { driverReducer, ThunkArgumentsType } from '@cd/core-lib';
import { socketReducer } from '@cd/core-lib';
import {socketMiddleware} from '@cd/core-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
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
import navigationService from '../navigation/service';

// import createSecureStore from "redux-persist-expo-securestore";
// const
// storage = createSecureStore(),

const rootReducer = combineReducers({
	// user: userReducer,
	driver: driverReducer,
	socket: socketReducer,
});

const config = {
	key: 'root',
	storage: AsyncStorage,
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

const supertokens = {
	// signOut: 'signout function here',
	signOut: () => signOut,
};

const thunkArguments: ThunkArgumentsType = {
	store: null,
	supertokens: supertokens,
	navigation: navigationService,
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

function makeStore() {
	const store = configureStore({
		reducer: reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
				thunk: {
					extraArgument: thunkArguments,
				},
			}).concat([socketMiddleware]),
	});
	thunkArguments.store = store;

	const persistor = persistStore(store);

	return { store, persistor };
}

const { store, persistor } = makeStore();

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
