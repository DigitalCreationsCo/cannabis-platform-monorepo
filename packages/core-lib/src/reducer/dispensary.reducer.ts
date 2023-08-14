/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
	type OrderWithDashboardDetails,
	type OrganizationWithDashboardDetails,
	type ProductWithDetails,
	type UserDispensaryAdmin,
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
import { urlBuilder } from '../utils';
import { signOutUserAsync } from './user.reducer';

export const getDispensaryById = createAsyncThunk(
	'dispensary/getDispensaryById',
	async (organizationId: string, thunkAPI) => {
		try {
			console.debug('getDispensaryById: ', organizationId);
			const response = await axios.get<any, OrganizationWithDashboardDetails>(
				urlBuilder.main.organizationWithDashboardDetails(organizationId),
				{
					headers: {
						...applicationHeaders,
					},
				},
			);
			if (response.data.success) return response.data.payload;
		} catch (error) {
			console.error('getDispensaryById: ', error);
			return thunkAPI.rejectWithValue(TextContent.error.DISPENSARY_NOT_FOUND);
		}
	},
);

export type DispensaryStateProps = {
	dispensary: OrganizationWithDashboardDetails;
	products: ProductWithDetails[];
	orders: OrderWithDashboardDetails[];
	users: UserDispensaryAdmin[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
};

const initialState: DispensaryStateProps = {
	dispensary: [],
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
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getDispensaryById.fulfilled,
			(state, { payload }: PayloadAction<OrganizationWithDashboardDetails>) => {
				const dispensary = payload;
				state.dispensary = dispensary;
				state.products = dispensary.products;
				state.orders = dispensary.orders;
				state.users = dispensary.memberships.map(
					(membership) => membership.user,
				);
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			},
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
