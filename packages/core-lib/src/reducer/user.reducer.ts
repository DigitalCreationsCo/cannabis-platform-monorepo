/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
	type OrderWithShopDetails,
	type UserWithDetails,
} from '@cd/data-access';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type Passwordless from 'supertokens-node/recipe/passwordless';
import { type AppState, type ThunkArgumentsType } from '../types';
import { pruneData, reconcileStateArray } from '../utils';

export const signOutUserAsync = createAsyncThunk<
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

export type UserStateProps = {
	token: string | null;
	user: UserWithDetails;
	// friendList: any[];
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
		// preferences: {},
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
			{ payload }: { payload: UserWithDetails | Passwordless.User },
		) => {
			console.info('signinUserSync payload', payload);
			const user = pruneData(payload, ['createdAt', 'updatedAt']);
			state.user = user;
			state.isSignedIn = true;
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
		},
		updateOrders: (
			state,
			{
				payload,
			}: {
				payload: OrderWithShopDetails[];
			},
		) => {
			console.info('updateOrders action');
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
