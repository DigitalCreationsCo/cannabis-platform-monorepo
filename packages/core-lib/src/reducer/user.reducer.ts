/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
	type OrderWithShopDetails,
	type UserWithDetails,
} from '@cd/data-access';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type AppState, type ThunkArgumentsType } from '../types';
import { pruneData, reconcileStateArray } from '../utils';

export const signOutUserAsync = createAsyncThunk<
	void,
	void,
	{
		// dispatch: Dispatch<AnyAction>;
		extra: ThunkArgumentsType;
	}
>('user/signOutUserAsync', async (_, { extra, rejectWithValue }) => {
	try {
		const { signOut } = extra.supertokens;
		await signOut();
	} catch (error) {
		return rejectWithValue('signout error: ' + error);
	}
});

export type UserStateProps = {
	token: string;
	user: UserWithDetails;
	isSignedIn: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
};

const initialState: UserStateProps = {
	token: '',
	user: {
		id: '',
		email: '',
		username: '',
		firstName: '',
		lastName: '',
		dialCode: '',
		address: [
			{
				id: '',
				street1: '',
				street2: '',
				city: '',
				state: '',
				zipcode: '',
				country: '',
				countryCode: '',
			},
		],
		phone: '',
		orders: [],
		emailVerified: false,
		isLegalAge: null,
		idVerified: false,
		passwordHash: '',
		passwordResetToken: '',
		termsAccepted: false,
	},
	isSignedIn: false,
	isLoading: false,
	isSuccess: false,
	isError: false,
	errorMessage: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signinUserSync: (
			state,
			{ payload }: { payload: { user: UserWithDetails; token: string } },
		) => {
			console.info('signinUserSync payload', payload);
			let { token, user } = payload;
			state.token = token;
			state.user = pruneData(user, ['createdAt', 'updatedAt']);
			state.isSignedIn = true;
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;

			document.cookie = 'yesOver21=true;path=/';
			if (!user.isSignUpComplete) {
				document.cookie = 'isSignUpComplete=false;path=/';
			}
			window.location.reload();
		},
		updateOrders: (
			state,
			{
				payload,
			}: {
				payload: OrderWithShopDetails[];
			},
		) => {
			const orders = payload;
			reconcileStateArray(state.user.orders, orders);
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
		builder.addCase(signOutUserAsync.fulfilled, () => {
			// 	document.cookie = 'yesOver21=false;path=/';
			// 	// window.location.href = '/';
			// clear dispensary state on user signout
			return initialState;
		}),
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

export const userActions = {
	signOutUserAsync,
	...userSlice.actions,
};

export const userReducer = userSlice.reducer;

export const selectUserState = (state: AppState) => state.user;
export const selectOrder = (orderId: string) => (state: AppState) =>
	state.user.user.orders?.find((order) => order.id === orderId);
export const selectIsAddressAdded = (state: AppState) =>
	state.user?.user?.address?.length > 0;
