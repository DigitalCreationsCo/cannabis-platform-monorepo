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
	applyMiddleware,
	combineReducers,
	configureStore,
	type Action,
	type AnyAction,
	type Store,
	type ThunkAction,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
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

const rootReducer = combineReducers({
	modal: modalReducer,
	user: userReducer,
	location: locationReducer,
	shop: shopReducer,
	cart: cartReducer,
	blog: blogReducer,
});

const hydratableReducer = (state: RootState, action: AnyAction) => {
	if (action.type === HYDRATE) {
		return {
			...state, // use previous state
			// ...action.payload // apply delta from hydration
		};
	}
	if (action.type === REHYDRATE) {
		return {
			...state,
			// ...action.payload // apply delta from hydration
		};
	} else {
		return rootReducer(state, action);
	}
};

const bindMiddleware = (middleware: any) => {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(
		...middleware,
		locationMiddleware,
		crashMiddleware,
		loggerMiddleware
	);
};

const supertokens = () => {
	return { signOut };
};

export const persistConfig = {
	key: 'root',
	blacklist: ['modal'],
	storage,
};

const makeStore = () => {
	let store;

	const isClient = typeof window !== 'undefined';

	const thunkArguments: { store: Store | null; supertokens: any } = {
		store: null,
		supertokens: supertokens(),
	};

	if (isClient) {
		store = configureStore({
			reducer: persistReducer(persistConfig, rootReducer),
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
					thunk: {
						extraArgument: thunkArguments,
					},
					bindMiddleware,
				}),
		});

		// @ts-ignore
		store._persistor = persistStore(store);
	} else {
		store = configureStore({
			reducer: hydratableReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					},
					thunk: {
						extraArgument: thunkArguments,
					},
					bindMiddleware,
				}),
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
