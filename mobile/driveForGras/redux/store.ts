import { driverReducer } from '@cd/core-lib/src/reducer/driver.reducer';
import { ThunkArgumentsType } from '@cd/core-lib/src/types/redux.types';
import { socketReducer } from '@cd/core-lib/src/reducer/socket.reducer';
import { default as socketMiddleware } from '@cd/core-lib/src/middleware/socket.middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	Action,
	combineReducers,
	configureStore,
	Store,
	ThunkAction,
} from '@reduxjs/toolkit';
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
// import navigationService from '../app/navigation/navigationService';

const rootReducer = combineReducers({
	// user: userReducer,
	driver: driverReducer,
	socket: socketReducer,
});

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
	let store: Store;
	const thunkArguments: { store: Store | null; supertokens: any } = {
		store: null,
		supertokens: supertokensArguments,
		// navigation: navigationService,
	};

	store = configureStore({
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

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
