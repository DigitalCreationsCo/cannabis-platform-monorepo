import { type AppStore, modalReducer } from '@cd/core-lib';
import { crashMiddleware, loggerMiddleware } from '@cd/core-lib/middleware';
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

const customMiddlewares = [crashMiddleware, loggerMiddleware];

const rootReducer = combineReducers({
	modal: modalReducer,
});

const hydratableReducer = (state: any, action: AnyAction) => {
	if (action.type === HYDRATE) {
		return {
			...state, // use previous state
			// ...action.payload, // apply delta from hydration
		};
	}
	if (action.type === REHYDRATE) {
		return {
			...state,
			// ...action.payload, // apply delta from hydration
		};
	} else {
		return rootReducer(state, action);
	}
};

const makeStore = () => {
	let store;

	const isClient = typeof window !== 'undefined';

	const thunkArguments: { store: Store | null } = {
		store: null,
	};

	if (isClient) {
		const persistConfig = {
			key: 'root',
			blacklist: ['modal'],
			storage,
		};

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
					...customMiddlewares,
				}),
		}) as any & { _persistor: any };
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
					...customMiddlewares,
				}),
		});
	}
	thunkArguments.store = store;
	return store;
};

export const wrapper = createWrapper<AppStore>(makeStore, {
	debug: process.env.NODE_ENV !== 'production',
});
