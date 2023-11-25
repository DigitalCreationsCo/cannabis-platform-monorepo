import { type DriverWithSessionJoin } from '@cd/data-access';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type AppState, type ThunkArgumentsType } from '../types';
import { updateOnlineStatus } from './action/updateOnlineStatus';

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
			id: '123',
			email: '',
			username: 'username_placeholder',
			firstName: '',
			lastName: '',
			dialCode: '',
			phone: '',
			emailVerified: false,
			isLegalAge: null,
			idVerified: false,
			// passwordHash: '',
			// passwordResetToken: '',
			termsAccepted: false,
			isSignUpComplete: false,
			scannedDOB: null,
			idFrontImage: null,
			idBackImage: null,
			address: [],
			profilePicture: null,
		},
		licenseNumber: '',
		driverSession: {
			id: '',
			isOnline: false,
			isActiveDelivery: false,
			currentCoordinates: [],
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
		signinDriverSync: (
			state,
			{ payload }: { payload: DriverWithSessionJoin },
		) => {
			console.info('sign in driver, payload: ', payload);
			const driver = payload;
			state.driver = driver;
			state.isSignedIn = true;
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
		},
		updateCoordinatesLocally: (
			state,
			{ payload }: { payload: [number, number] },
		) => {
			// const previousCoordinates = state.driver.driverSession.currentCoordinates;
			const coordinates = payload;
			if (coordinates.length === 2) {
				state.driver.driverSession.currentCoordinates = coordinates;
				// return {previousCoordinates, coordinates};
			} else throw new Error('invalid coordinates');
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
			const { isOnline } = payload;
			state.driver.driverSession['isOnline'] = isOnline;
			state.isSuccess = true;
			state.isLoading = false;
			state.isError = false;
		}),
			builder.addCase(updateOnlineStatus.pending, (state) => {
				state.isLoading = true;
			}),
			builder.addCase(
				updateOnlineStatus.rejected,
				(state, { payload }: any) => {
					const { isOnline, error } = payload;
					state.driver.driverSession['isOnline'] = !isOnline;
					state.isLoading = false;
					state.isError = true;
					state.errorMessage = error;
				},
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
