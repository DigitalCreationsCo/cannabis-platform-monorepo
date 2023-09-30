import {
	blogReducer,
	cartReducer,
	crashMiddleware,
	locationMiddleware,
	locationReducer,
	loggerMiddleware,
	modalReducer,
	shopReducer,
	userReducer,
} from '@cd/core-lib';
import {
	combineReducers,
	configureStore,
	type Action,
	type AnyAction,
	type Store,
	type ThunkAction,
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
import { signOut } from 'supertokens-auth-react/recipe/session';

const middlewares = [locationMiddleware, crashMiddleware, loggerMiddleware];

const rootReducer = combineReducers({
	modal: modalReducer,
	user: userReducer,
	location: locationReducer,
	shop: shopReducer,
	cart: cartReducer,
	blog: blogReducer,
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
	blacklist: [
		'modal',
		// 'shop',
		'blog',
	],
	storage,
};

const supertokensArguments = () => {
	return { signOut };
};

const makeStore = () => {
	let store;
	const thunkArguments: { store: Store | null; supertokens: any } = {
		store: null,
		supertokens: supertokensArguments(),
	};
	const isClient = typeof window !== 'undefined';
	if (isClient) {
		store = configureStore({
			devTools: process.env.NODE_ENV !== 'production',
			reducer: persistReducer(persistConfig, rootReducer),
			middleware: (getDefaultMiddleware) => [
				...getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
					thunk: {
						extraArgument: thunkArguments,
					},
				}),
				...middlewares,
			],
		});
		// @ts-ignore
		store._persistor = persistStore(store);
	} else {
		store = configureStore({
			devTools: process.env.NODE_ENV !== 'production',
			reducer: hydratableReducer,
			middleware: (getDefaultMiddleware) => [
				...getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
					thunk: {
						extraArgument: thunkArguments,
					},
				}),
				...middlewares,
			],
		});
	}
	thunkArguments.store = store;
	return store;
};

const store: any = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
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
