import {
	type AppStore,
	crashMiddleware,
	locationMiddleware,
	loggerMiddleware,
	modalReducer,
} from '@gras/core';
import {
	combineReducers,
	configureStore,
	type AnyAction,
	type Store,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
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
import storage from 'redux-persist/lib/storage';
const middlewares = [locationMiddleware, crashMiddleware, loggerMiddleware];
const rootReducer = combineReducers({
	modal: modalReducer,
});
const hydratableReducer = (state: any, action: AnyAction) => {
	if (action.type === HYDRATE) {
		return {
			...state, // use previous state
			// ...action.payload // apply delta from hydration
		};
	}
	if (action.type === REHYDRATE) {
		return {
			...state,
			...action.payload, // apply delta from hydration
		};
	} else {
		return rootReducer(state, action);
	}
};
export const persistConfig = {
	key: 'root',
	blacklist: ['modal'],
	storage,
};

const makeStore = () => {
	let store;
	const thunkArguments: { store: Store | null } = {
		store: null,
	};
	const isClient = typeof window !== 'undefined';
	if (isClient) {
		store = configureStore({
			devTools: process.env.NODE_ENV !== 'production',
			reducer: persistReducer(persistConfig, rootReducer),
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					...getDefaultMiddleware(),
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
					thunk: {
						extraArgument: thunkArguments,
					},
					...middlewares,
				}),
		});
		// @ts-ignore
		store._persistor = persistStore(store);
	} else {
		store = configureStore({
			devTools: process.env.NODE_ENV !== 'production',
			reducer: hydratableReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					...getDefaultMiddleware(),
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
					thunk: {
						extraArgument: thunkArguments,
					},
					...middlewares,
				}),
		});
	}
	thunkArguments.store = store;
	return store;
};
export const wrapper = createWrapper<AppStore>(makeStore);
