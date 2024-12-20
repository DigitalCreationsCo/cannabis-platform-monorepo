import {
	crashMiddleware,
	locationMiddleware,
	loggerMiddleware,
} from '@cd/core-lib/middleware';
import {
	blogReducer,
	cartReducer,
	locationReducer,
	modalReducer,
} from '@cd/core-lib/reducer';
import { type AppStore } from '@cd/core-lib/types';
import { combineReducers, configureStore, type Store } from '@reduxjs/toolkit';
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

const middlewares = [crashMiddleware, locationMiddleware, loggerMiddleware];

export const SET_ENV = 'SET_ENV';

export const setEnv = (config) => ({
	type: SET_ENV,
	payload: config,
});

const rootReducer = combineReducers({
	modal: modalReducer,
	location: locationReducer,
	cart: cartReducer,
	blog: blogReducer,
	env: (state = {}, action) => {
		switch (action.type) {
			case SET_ENV:
				return {
					...state,
					...(action.payload || {}),
				};
			default:
				return state;
		}
	},
});

const hydratableReducer = (state: any, action: any) => {
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

// dont persist state in a development container
export const persistConfig =
	process.env.NODE_ENV === 'development' && process.env.DEV_ENV === 'docker'
		? {
				key: 'root',
				whitelist: ['modal', 'shop', 'user', 'blog'],
				storage,
			}
		: {
				key: 'root',
				blacklist: ['env', 'modal'],
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
			reducer: persistReducer(persistConfig, rootReducer as any),
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

export const wrapper = createWrapper<AppStore>(makeStore, {
	debug: process.env.NODE_ENV !== 'production',
	// serializeState: (state) => serialize(state),
	// deserializeState: (state) => deserialize(state),
});
