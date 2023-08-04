/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
	type OrganizationWithShopDetails,
	type ProductWithDetails,
} from '@cd/data-access';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { urlBuilder } from '../../utils';
import { type AppState } from '../types/reduxTypes';
import { type LocationStateProps } from './location.reducer';

export const getInitialDispensaries = createAsyncThunk(
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
				},
			);

			// ADD AXIOS REPSONSE TYPE TO INSTANCE CONFIG!
			if (response.data.success) return response.data.payload;
		} catch (error) {
			console.error('getInitialDispensaries: ', error);
			return rejectWithValue('Could not get initial dispensaries');
		}
	},
);

// TODO: IMPROVE THIS, SO IT ONLY FETCHES FOR DATA THAT IS NOT ALREADY IN STATE
export const getDispensariesLocal = createAsyncThunk<
	OrganizationWithDetailsAndMetadata[],
	void
>('shop/getDispensariesLocal', async (_, { getState, rejectWithValue }) => {
	try {
		const { location } = getState() as { location: LocationStateProps };

		const { selectLocationType, radius } = location;
		const { coordinates } = location[selectLocationType].address;

		const response = await axios.post(
			urlBuilder.location.organizationsLocal(),
			{
				userLocation: coordinates,
				proximityRadius: radius,
			},
			{
				headers: {
					...applicationHeaders,
				},
			},
		);

		// ADD AXIOS REPSONSE TYPE TO INSTANCE CONFIG!
		if (response.data.success) return response.data.payload;
	} catch (error) {
		console.error('getDispensariesLocal failed: ', error);
		return rejectWithValue('Could not get dispensaries');
	}
});

// find out why getProducts async action is failing
// export const getVendorsExcluding = createAsyncThunk(
//   "shop/getDispensariesLocalExcluding",
//   async ({ vendorIdList }, thunkAPI) => {
//     try {
//       const { locationData } = thunkAPI.getState().user.user;
//       const { selectedLocationType, searchRadius } = locationData;
//       const { location } = locationData[selectedLocationType];
//       const response = await fetchData(urlList.GET_VENDORS_EXCLUDING(), {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userLocation: location,
//           proximityRadius: searchRadius,
//           vendorIdList: vendorIdList,
//         }),
//       });
//       if (response.status === 200) {
//         let vendors = await response.json();
//         return { vendors };
//       }
//     } catch (err) {
//       console.info("A general error occured: getVendorsExcluding-");
//       return thunkAPI.rejectWithValue(
//         "A general error occured: getVendorsExcluding-"
//       );
//     }
//   }
// );

// export const getProductsByVendor = createAsyncThunk(
//   "shop/getProductsByDispensary",
//   async ({ vendorId, index }, thunkAPI) => {
//     try {
//       const response = await fetchData(
//         urlList.GET_PRODUCTS_BY_VENDOR(vendorId),
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.status === 200) {
//         let data = await response.json();
//         // console.info("getProducts by vendor data: ", data);
//         return { data, index };
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue("A general error occured. ");
//     }
//   }
// );

// TODO: IMPROVE THIS, SO IT ONLY FETCHES FOR DATA THAT IS NOT ALREADY IN STATE
export const getProductsFromLocal = createAsyncThunk<
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
			},
		);

		// ADD AXIOS REPSONSE TYPE TO INSTANCE CONFIG!
		if (response.data.success) return response.data.payload;
	} catch (err) {
		return thunkAPI.rejectWithValue('A general error occured. ');
	}
});

type OrganizationWithDetailsAndMetadata = OrganizationWithShopDetails & {
	metadata?: { productsFetched?: boolean };
};
export type ShopStateProps = {
	dispensaries: OrganizationWithDetailsAndMetadata[];
	products: ProductWithDetails[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
};

const initialState: ShopStateProps = {
	dispensaries: [],
	products: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	errorMessage: '',
};

export const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getInitialDispensaries.fulfilled,
			(
				state,
				{ payload }: PayloadAction<OrganizationWithDetailsAndMetadata[]>,
			) => {
				const dispensaries = payload;
				if (dispensaries.length > 0) {
					dispensaries.forEach((dispensary) => {
						dispensary.metadata = {
							productsFetched: false,
						};

						console.info('state before reconcile: ', state.dispensaries);

						const index = state.dispensaries.findIndex(
							(d) => d.id === dispensary.id,
						);
						if (index === -1)
							state.dispensaries = [...state.dispensaries, dispensary];
						else state.dispensaries[index] = dispensary;

						console.info('state after reconcile: ', state.dispensaries);
					});
				}
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			},
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
					{ payload }: PayloadAction<OrganizationWithDetailsAndMetadata[]>,
				) => {
					const dispensaries = payload;

					if (dispensaries.length > 0) {
						dispensaries.forEach((dispensary) => {
							dispensary.metadata = {
								productsFetched: false,
							};

							console.info('state before reconcile: ', state.dispensaries);

							const index = state.dispensaries.findIndex(
								(d) => d.id === dispensary.id,
							);
							if (index === -1)
								state.dispensaries = [...state.dispensaries, dispensary];
							else state.dispensaries[index] = dispensary;

							console.info('state after reconcile: ', state.dispensaries);
						});
					}
					state.isLoading = false;
					state.isSuccess = true;
					state.isError = false;
				},
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
				},
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

export const shopActions = {
	getInitialDispensaries,
	getDispensariesLocal,
	getProductsFromLocal,
	// getVendorsExcluding,
	// getProductsByVendor,
	...shopSlice.actions,
};

export const shopReducer = shopSlice.reducer;

export const selectShopState = (state: AppState) => state.shop;
