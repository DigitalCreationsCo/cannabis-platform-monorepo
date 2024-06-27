/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
	type OrderWithFullDetails,
	type OrganizationWithDashboardDetails,
	type ProductWithDetails,
	type UserDispensaryStaff,
} from '@cd/data-access';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { applicationHeaders } from '../axiosInstance';
import { TextContent } from '../constants';
import { type AppState } from '../types';
import { reconcileStateArray } from '../utils';
import { signOutUserAsync } from './user.reducer';

export const getDispensaryById = createAsyncThunk(
	'dispensary/getDispensaryById',
	async (organizationId: string, thunkAPI) => {
		try {
			console.info('async thunk getDispensaryById: ', organizationId);
			const response = await axios.get<any, OrganizationWithDashboardDetails>(
				`/api/organization/${organizationId}`,
				{
					headers: {
						...applicationHeaders,
					},
				}
			);
			if (response.data.success === 'true') return response.data.payload;
		} catch (error) {
			console.error('getDispensaryById: ', error);
			return thunkAPI.rejectWithValue(TextContent.error.DISPENSARY_NOT_FOUND);
		}
	}
);

export interface DispensaryStateProps {
	dispensary: OrganizationWithDashboardDetails;
	products: ProductWithDetails[];
	orders: OrderWithFullDetails[];
	users: UserDispensaryStaff[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
}

const initialState: DispensaryStateProps = {
	dispensary: {},
	products: [],
	orders: [],
	users: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	errorMessage: '',
};

export const dispensarySlice = createSlice({
	name: 'dispensary',
	initialState,
	reducers: {
		setDispensary: (
			state,
			{ payload }: { payload: OrganizationWithDashboardDetails }
		) => {
			const organization = payload;
			state.dispensary = organization;
			console.info('setDispensary ', organization.name);
		},
		updateDispensaryOrders: (
			state,
			{
				payload,
			}: {
				payload: OrderWithFullDetails[];
			}
		) => {
			const orders = payload;
			if (state.dispensary?.orders) {
				reconcileStateArray(state.dispensary.orders, orders);
			} else {
				state.dispensary.orders = orders;
				state.orders = orders;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			getDispensaryById.fulfilled,
			(state, { payload }: PayloadAction<OrganizationWithDashboardDetails>) => {
				try {
					const dispensary = payload;
					state.dispensary = dispensary;
					state.products = dispensary.products;
					state.orders = dispensary.orders;
					state.users = dispensary.memberships.map(
						(membership) => membership.user
					);
					state.isLoading = false;
					state.isSuccess = true;
					state.isError = false;
				} catch (error) {
					console.error('getDispensaryById: ', error);
				}
			}
		),
			builder.addCase(getDispensaryById.pending, (state) => {
				state.isLoading = true;
			}),
			builder.addCase(getDispensaryById.rejected, (state, { payload }) => {
				const error = payload;
				state.errorMessage = error;
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			}),
			builder.addCase(signOutUserAsync.fulfilled, () => {
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

export const dispensaryActions = {
	getDispensaryById,
	...dispensarySlice.actions,
};

export const dispensaryReducer = dispensarySlice.reducer;

export const selectDispensaryState = (state: AppState) => state.dispensary;
