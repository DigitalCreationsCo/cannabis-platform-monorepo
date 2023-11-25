/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
	Coordinates,
	type DriverWithDetails,
	type DriverWithSessionJoin,
} from '@cd/data-access';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { type AppState, type ThunkArgumentsType } from '../types';
import { pruneData, urlBuilder } from '../utils';
import { socketActions } from './socket.reducer';

/**
 * update driver session status in db
 */
export const updateOnlineStatus = createAsyncThunk<
	{ success: boolean; isOnline: boolean },
	boolean,
	{ extra: ThunkArgumentsType }
>('driver/updateOnlineStatus', async (onlineStatus, thunkAPI) => {
	try {
		const state = (await thunkAPI.getState()) as DriverSessionState;

		const id = state.driver.driver.id;

		const response = await axios.post(
			urlBuilder.main.driverUpdateStatus(),
			{
				id,
				onlineStatus,
			},
			{ validateStatus: (status) => status < 500 },
		);

		if (response.status !== 200) throw new Error(response.data);

		return {
			...response.data,
			success: 'true',
			isOnline: onlineStatus,
		};
	} catch (error) {
		console.error('updateOnlineStatus error: ', error.message);
		thunkAPI.dispatch(socketActions.setError(error.message));
		return thunkAPI.rejectWithValue({
			isOnline: onlineStatus,
			error: error.message,
		});
	}
});

const signOutUserAsync = createAsyncThunk<
	void,
	void,
	{
		// dispatch: Dispatch<AnyAction>;
		extra: ThunkArgumentsType;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
>('user/signOutUserAsync', async (_, { dispatch, extra, rejectWithValue }) => {
	try {
		const { signOut } = extra.supertokens;
		await signOut();
	} catch (error) {
		return rejectWithValue('signout error: ' + error);
	}
});

export type DriverSessionState = {
	driver: DriverWithSessionJoin;
	isSignedIn: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
};

const initialState: DriverSessionState = {
	driver: {
		user: {
			id: '',
			email: '',
			username: '',
			firstName: '',
			lastName: '',
			dialCode: '',
			phone: '',
			emailVerified: false,
			isLegalAge: null,
			idVerified: false,
			passwordHash: '',
			passwordResetToken: '',
			termsAccepted: false,
		},
		driverSession: {
			id: '',
			isOnline: false,
			isActiveDelivery: false,
			currentCoordinates: [],
			currentRoute: [],
		},
	},
	isSignedIn: false,
	isLoading: false,
	isSuccess: false,
	isError: false,
	errorMessage: '',
};

export const driverSlice = createSlice({
	name: 'driver',
	initialState,
	reducers: {
		signinDriverSync: (state, { payload }: { payload: DriverWithDetails }) => {
			console.info('sign in driver, payload: ', payload);

			const driver = pruneData(payload, [
				'timeJoined',
				'createdAt',
				'updatedAt',
			]);
			state.driver = driver;

			state.isSignedIn = true;
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
		},
		updateCoordinatesLocally: (state, { payload }: { payload: [number, number] }) => {
			const previousCoordinates = state.driver.driverSession.currentCoordinates;
			const coordinates = payload;
			if (coordinates.length === 2)
			  {
				state.driver.driverSession.currentCoordinates = coordinates;
				// return {previousCoordinates, coordinates};
			}
			else
			  throw new Error('invalid coordinates');
		},
		setActiveDelivery: (state, { payload }) => {
			if (!state.driver.driverSession)
				throw new Error('Driver session is not defined.');
			// return;

			state.driver.driverSession['isActiveDelivery'] = payload;
		},
		clearState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			return state;
		},
		clearErrorMessage: (state) => {
			state.errorMessage = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateOnlineStatus.fulfilled, (state, { payload }) => {
			// console.info('update online status fulfilled, payload: ', payload);
			const { isOnline } = payload;

			state.driver.driverSession['isOnline'] = isOnline;

			state.isSuccess = true;
			state.isLoading = false;
			state.isError = false;
		}),
		builder.addCase(updateOnlineStatus.pending, (state) => {
			state.isLoading = true;
		}),
		builder.addCase(updateOnlineStatus.rejected, (state, { payload }) => {
			const { isOnline, error } = payload;

			state.isLoading = false;
			state.isError = true;
			state.errorMessage = error;
		}),

		builder.addCase(signOutUserAsync.fulfilled, () => initialState),
		builder.addCase(signOutUserAsync.pending, (state) => {
			state.isLoading = true;
		}),
		builder.addCase(signOutUserAsync.rejected, (state, { payload }) => {
			state.isSuccess = false;
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = payload as string;
		});
	},
});

export const driverActions = {
	...driverSlice.actions,
	updateOnlineStatus,
	signOutUserAsync,
};

export const driverReducer = driverSlice.reducer;

export const selectDriverState = (state: AppState) => state.driver;
