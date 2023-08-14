import { dispensaryReducer, modalReducer, userReducer } from '@cd/core-lib';
import {
	crashMiddleware,
	dispensaryMiddleware,
	loggerMiddleware,
} from '@cd/core-lib/src/middleware';
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

const supertokensArguments = () => {
	return { signOut };
};

const customMiddlewares = [
	dispensaryMiddleware,
	crashMiddleware,
	loggerMiddleware,
];

const rootReducer = combineReducers({
	modal: modalReducer,
	user: userReducer,
	dispensary: dispensaryReducer,
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

const makeStore = () => {
	let store;

	const isClient = typeof window !== 'undefined';

	const thunkArguments: { store: Store | null; supertokens: any } = {
		store: null,
		supertokens: supertokensArguments(),
	};

	if (isClient) {
		const persistConfig = {
			key: 'root',
			blacklist: ['modal'],
			storage,
		};

		store = configureStore({
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
				...customMiddlewares,
			],
		});
		// @ts-ignore
		store._persistor = persistStore(store);
	} else {
		store = configureStore({
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
				...customMiddlewares,
			],
		});
	}
	thunkArguments.store = store;
	return store;
};

const store: any = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
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
