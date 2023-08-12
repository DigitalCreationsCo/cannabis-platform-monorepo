/* eslint-disable @typescript-eslint/ban-ts-comment */
/// @ts-nocheck

import { modalReducer, userReducer } from '@cd/core-lib';
import { crashMiddleware, loggerMiddleware } from '@cd/core-lib/src/middleware';
import {
	applyMiddleware,
	combineReducers,
	configureStore,
	type Action,
	type AnyAction,
	type Store,
	type ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
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
import {
	signInEmailPassword,
	signUpEmailPassword,
} from 'supertokens-auth-react/recipe/emailpassword';
import { signOut } from 'supertokens-auth-react/recipe/session';

const rootReducer = combineReducers({
	modal: modalReducer,
	user: userReducer,
});

const hydratableReducer = (state: RootState, action: AnyAction) => {
	if (action.type === HYDRATE || action.type === 'REHYDRATE') {
		return {
			...state, // use previous state
			// ...action.payload // apply delta from hydration
		};
	} else {
		return rootReducer(state, action);
	}
};

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(
		...middleware,
		locationMiddleware,
		crashMiddleware,
		loggerMiddleware,
	);
};

const supertokens = () => {
	return { signInEmailPassword, signUpEmailPassword, signOut };
};

const makeStore = () => {
	let store;

	const isClient = typeof window !== 'undefined';

	const thunkArguments: { store: Store | null; supertokens: any } = {
		store: null,
		supertokens: supertokens(),
	};

	if (isClient) {
		const persistConfig = {
			key: 'root',
			blacklist: ['modal'],
			storage,
		};

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
