/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
type OrganizationWithShopDetails = any;
type OrganizationMetadata = any;
type ProductWithDetails = any;
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
	AsyncThunk
} from '@reduxjs/toolkit';
import { axios, applicationHeaders } from '../axiosInstance';
import { type AppState } from '../types';
import { urlBuilder, reconcileStateArray, isArray } from '../utils';
import { type LocationStateProps } from './location.reducer';

const getInitialDispensaries: AsyncThunk = createAsyncThunk(
	'shop/getInitialDispensaries',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { location } = getState() as { location: LocationStateProps },
				{ radius } = location;
			const response = await axios.get(
				urlBuilder.main.organizationsByZipCode(21037, 4, radius),
				{
					headers: {
						...applicationHeaders,
					},
				}
			);
			console.info('getInitialDispensaries response ,', response);

			// ADD AXIOS REPSONSE TYPE TO INSTANCE CONFIG!
			if (response.data.success) return response.data.payload;
		} catch (error) {
			console.error('getInitialDispensaries: ', error);
			return rejectWithValue('Could not get initial dispensaries');
		}
	}
);

const getDispensariesLocal:AsyncThunk = createAsyncThunk<
	(OrganizationWithShopDetails & OrganizationMetadata)[],
	void
>('shop/getDispensariesLocal', async (_, { getState, rejectWithValue }) => {
	try {
		const { location } = getState() as { location: LocationStateProps };

		const { selectLocationType, radius } = location;
		const { coordinates } = location[selectLocationType].address;

		const response = await axios.post(
			urlBuilder.main.organizationsLocal(),
			{
				userLocation: coordinates,
				proximityRadius: radius,
			},
			{
				headers: {
					...applicationHeaders,
				},
			}
		);

		// ADD AXIOS REPSONSE TYPE TO INSTANCE CONFIG!
		if (response.data.success) return response.data.payload;
	} catch (error) {
		console.error('getDispensariesLocal failed: ', error);
		return rejectWithValue('Could not get dispensaries');
	}
});

const getProductsFromLocal:AsyncThunk = createAsyncThunk<
	ProductWithDetails[],
	void
>('shop/getProductsFromLocal', async (_, thunkAPI) => {
	try {
		const { shop } = thunkAPI.getState() as { shop: ShopStateProps };
		const { dispensaries } = shop;

		const dispensaryIdList = dispensaries.map((disp) => disp.id);

		const response = await axios.post(
			urlBuilder.main.productsByMultipleOrgs(1, 20),
			{
				...dispensaryIdList,
			},
			{
				headers: {
					...applicationHeaders,
				},
			}
		);

		// ADD AXIOS REPSONSE TYPE TO INSTANCE CONFIG!
		if (response.data.success) return response.data.payload;
	} catch (err) {
		return thunkAPI.rejectWithValue('A general error occured. ');
	}
});

interface ShopStateProps {
	dispensaries: (OrganizationWithShopDetails & OrganizationMetadata)[];
	products: ProductWithDetails[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
}

const initialState: ShopStateProps = {
	dispensaries: [],
	products: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	errorMessage: '',
};

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getInitialDispensaries.fulfilled,
			(
				state,
				{
					payload,
				}: PayloadAction<(OrganizationWithShopDetails & OrganizationMetadata)[]>
			) => {
				const dispensaries = payload;

				isArray(dispensaries) &&
					dispensaries.forEach((dispensary) => {
						dispensary.metadata = {
							productsFetched: true,
						};
						// const index = state.dispensaries.findIndex(
						// 	(d) => d.id === dispensary.id,
						// );
						// if (index === -1)
						// 	state.dispensaries = [...state.dispensaries, dispensary];
						// else state.dispensaries[index] = dispensary;
						state.dispensaries = reconcileStateArray(
							state.dispensaries,
							dispensaries
						);
					});
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			}
		),
			builder.addCase(getInitialDispensaries.pending, (state) => {
				state.isLoading = true;
			}),
			builder.addCase(getInitialDispensaries.rejected, (state, { payload }) => {
				const error = payload;
				state.errorMessage = error;
				console.error('get initial dispensaries error: ', error);
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			}),
			builder.addCase(
				getDispensariesLocal.fulfilled,
				(
					state,
					{
						payload,
					}: PayloadAction<
						(OrganizationWithShopDetails & OrganizationMetadata)[]
					>
				) => {
					const dispensaries = payload;

					isArray(dispensaries) &&
						dispensaries.forEach((dispensary) => {
							dispensary.metadata = {
								productsFetched: true,
							};
							// const index = state.dispensaries.findIndex(
							// 	(d) => d.id === dispensary.id,
							// );
							// if (index === -1)
							// 	state.dispensaries = [...state.dispensaries, dispensary];
							// else state.dispensaries[index] = dispensary;
							state.dispensaries = reconcileStateArray(
								state.dispensaries,
								dispensaries
							);
						});
					state.isLoading = false;
					state.isSuccess = true;
					state.isError = false;
				}
			),
			builder.addCase(getDispensariesLocal.pending, (state) => {
				state.isLoading = true;
			}),
			builder.addCase(getDispensariesLocal.rejected, (state, { payload }) => {
				const error = payload;
				state.errorMessage = error;
				console.error('get dispensaries local error: ', error);
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			}),
			builder.addCase(
				getProductsFromLocal.fulfilled,
				(state, { payload }: PayloadAction<ProductWithDetails[]>) => {
					// are products returned for individual dispensaries?
					// if so, where is the data stored?

					// can we use this V global products data to populate the products for each dispensary?
					const products = payload;
					if (products.length > 0) {
						// products.forEach((d) => {
						//   d.metadata = {
						//     productsFetched: false,
						//   };
						// });
						// console.info('state before reconcile: ', state.dispensaries)
						// const index = state.dispensaries.findIndex((i) => i.id === d.id);
						// if (index === -1)
						//   state.dispensaries = [...state.dispensaries, d]
						// else
						//   state.dispensaries[index] = item;
						// console.info('state after reconcile: ', state.dispensaries)
					}
					state.isLoading = false;
					state.isSuccess = true;
					state.isError = false;
				}
			),
			builder.addCase(getProductsFromLocal.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			}),
			builder.addCase(getProductsFromLocal.rejected, (state, { payload }) => {
				const error = payload as string;
				state.errorMessage = error;
				console.error('get products local error: ', error);
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			});

		// [getVendorsExcluding.fulfilled]: (state, { payload }) => {
		//   const { vendors } = payload;
		//   vendors.forEach((vendor) => {
		//     vendor.metadata = {
		//       productsFetched: false,
		//     };
		//   });

		//   state.isFetching = false;
		//   state.isSuccess = true;
		//   state.vendors.push(...vendors);
		//   console.info("getVendors excluding success");
		// },

		// [getVendorsExcluding.pending]: (state) => {
		//   state.isFetching = true;
		// },
		// [getVendorsExcluding.rejected]: (state, { payload }) => {
		//   console.info("get vendors excluding rejected");
		//   state.isFetching = false;
		//   state.isError = true;
		// },

		// [getProductsByVendor.fulfilled]: (state, { payload }) => {
		//   state.isLoading = false;
		//   state.isFetching = false;
		//   state.isSuccess = true;

		//   let { index, data } = payload;
		//   state.vendors[index].products = data;
		//   state.vendors[index].metadata.productsFetched = true;

		//   // * update to use filter for discretion
		//   // let { vendorId, data } = payload;
		//   // console.info("get products by vendor payload: ", data);
		//   // const updatedVendor = state.vendors.filter(
		//   //   (vendor) => vendor.vendorId === vendorId
		//   // )[0];
		//   // state.vendors..products = data;
		//   // state.vendors[index].metadata.productsFetched = true;
		// },
		// [getProductsByVendor.pending]: (state, action) => {
		//   state.isLoading = true;
		//   state.isFetching = true;
		// },
		// [getProductsByVendor.rejected]: (state, { payload }) => {
		//   state.isLoading = false;
		//   state.isFetching = false;
		//   state.isError = true;
		// },
	},
});

const shopActions = {
	getInitialDispensaries,
	getDispensariesLocal,
	getProductsFromLocal,
	// getVendorsExcluding,
	// getProductsByVendor,
	...shopSlice.actions,
};

const shopReducer = shopSlice.reducer;

const selectShopState = (state: AppState) => state.shop;
const selectOrganizationById = (id: string) => (state: AppState) =>
	state.shop.dispensaries.find((organization) => organization.id === id);
const selectOrganizationBySubdomain =
	(subdomain: string) => (state: AppState) =>
		state.shop.dispensaries.find(
			(organization) => organization.subdomain.id === subdomain
		);
const selectMarketPlaceDispensaries = (state: AppState) =>
	state.shop.dispensaries.filter((disp) => disp.showInMarketPlace);

export {
	shopActions,
	shopSlice,
	shopReducer,
	selectShopState,
	selectOrganizationById,
	selectOrganizationBySubdomain,
	selectMarketPlaceDispensaries,
}

export type {
	ShopStateProps
}