type CoordinatesCreateType = [number, number];
type DriverWithSessionJoin = any;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type AppState, type ThunkArgumentsType } from '../types';
import { updateOnlineStatus } from './action/updateOnlineStatus';
// import { userActions } from './user.reducer';

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

export interface DriverSessionState {
	token: string;
	driver: DriverWithSessionJoin;
	isSignedIn: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
}

const initialState: DriverSessionState = {
	token: '',
	driver: {
		email: '',
		id: '',
		user: {
			id: '',
			email: '',
			username: '',
			firstName: '',
			lastName: '',
			dialCode: '',
			phone: '',
			emailVerified: false,
			is_legal_age: null,
			id_verified: false,
			termsAccepted: false,
			isSignUpComplete: false,
			scannedDOB: null,
			idFrontImage: null,
			idBackImage: null,
			address: [],
			profilePicture: null,
			isSubscribedForWeedText: false,
		},
		licenseNumber: '',
		driverSession: {
			id: '',
			isOnline: false,
			isActiveDelivery: false,
			currentCoordinates: undefined,
			currentRoute: [],
			routeId: '',
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
		/**
		 * receive session payload and token and set state
		 * @param state
		 * @param param1
		 */
		signinDriverSync: (
			state,
			{ payload }: { payload: { user: DriverWithSessionJoin; token: string } }
		) => {
			console.info('signinDriverSync payload:', payload);
			const { token, user: driver } = payload;

			if (!driver?.user || !token) {
				state.isLoading = false;
				state.isSuccess = false;
				state.isSignedIn = false;
				state.isError = true;
				state.errorMessage = 'Driver or token is not defined.';
				return;
			}

			state.token = token;
			state.driver = driver;
			state.isSignedIn = true;
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.errorMessage = '';
		},

		updateCoordinates: (
			state,
			{ payload }: { payload: CoordinatesCreateType }
		) => {
			// const previousCoordinates = state.driver.driverSession.currentCoordinates;
			const coordinates = payload;
			state.driver.driverSession.currentCoordinates = coordinates;
		},

		appendCoordinatesToRoute: (
			state,
			{ payload }: { payload: CoordinatesCreateType }
		) => {
			state.driver.driverSession.currentRoute.push(payload);
		},

		setActiveDelivery: (state, { payload }) => {
			if (!state.driver.driverSession)
				throw new Error('Driver session is not defined.');
			// return;

			state.driver.driverSession.isActiveDelivery = payload;
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
		// handle signin driver by handling user signin action - not used in leui of passing signin action to login component

		// builder.addCase(userActions.signinUserSync, (state, { payload }) => {
		// 	const { token, driver } = payload;
		// 	state.token = token;
		// 	state.driver = driver;
		// 	state.isSignedIn = true;
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.isError = false;
		// }),
		builder.addCase(updateOnlineStatus.fulfilled, (state, { payload }) => {
			const { isOnline } = payload;
			state.driver.driverSession.isOnline = isOnline;
			state.isSuccess = true;
			state.isLoading = false;
			state.isError = false;
		}),
			builder.addCase(updateOnlineStatus.pending, () => {
				// state.isLoading = true;
			}),
			builder.addCase(
				updateOnlineStatus.rejected,
				(state, { payload }: any) => {
					const { error } = payload;
					state.driver.driverSession.isOnline = false;
					state.isLoading = false;
					state.isError = true;
					state.errorMessage = error;
				}
			),
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
