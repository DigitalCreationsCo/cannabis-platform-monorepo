import { OrganizationWithShopDetails, ProductWithDetails } from "@cd/data-access";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { urlBuilder } from "../../utils";
import { AppState } from "../types";
import { LocationStateProps } from './location.reducer';

export const getDispensariesLocal = createAsyncThunk(
  "shop/getDispensariesLocal",
  async (_, {getState, rejectWithValue}) => {
    try {
      
      const { location } = getState() as { location: LocationStateProps};
      
      const { selectLocationType, radius } = location;
      const {coordinates} = location[selectLocationType].address
        
      const {data } = await axios.post(
        urlBuilder.location.organizationsLocal(), {
          userLocation: coordinates,
          proximityRadius: radius,
        }, { 
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        });
        return data
    } catch (error) {
      console.log("getDispensariesLocal: ", error);
      return rejectWithValue("Could not get dispensaries");
    }
  }
);

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
//       console.log("A general error occured: getVendorsExcluding-");
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
//         // console.log("getProducts by vendor data: ", data);
//         return { data, index };
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue("A general error occured. ");
//     }
//   }
// );

export const getProductsFromLocal = createAsyncThunk(
  "shop/getProductsFromLocal",
  async (_, thunkAPI) => {
    try {
      const { shop } = thunkAPI.getState() as { shop: ShopStateProps };
      const { dispensaries } = shop;
      
      const dispensaryIdList = dispensaries.map((disp) => disp.id);

      const {data} = await axios.post(urlBuilder.main.productsByMultipleOrgs(1, 20), {
        ...dispensaryIdList
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue("A general error occured. ");
    }
  }
);

type OrganizationWithDetailsAndMetadata = OrganizationWithShopDetails & { metadata?: { productsFetched?: boolean }}
export type ShopStateProps = {
    dispensaries: OrganizationWithDetailsAndMetadata[];
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
    errorMessage: ""
}

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDispensariesLocal.fulfilled, (state, { payload }: PayloadAction<OrganizationWithDetailsAndMetadata[]>) => {
      const dispensaries = payload

      dispensaries.forEach((disp) => {
        disp.metadata = {
          productsFetched: false,
        };
        state.dispensaries.push(disp)
      });

      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
    builder.addCase(getDispensariesLocal.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getDispensariesLocal.rejected, (state, { payload }) => {
      const error = payload;
      console.log('get dispensaries local error: ', error)
      
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    }),
    
    builder.addCase(getProductsFromLocal.fulfilled, (state, { payload }: PayloadAction<ProductWithDetails[]>) => {
      const products = payload;
      state.products.push(...products);
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
    builder.addCase(getProductsFromLocal.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    }),
    builder.addCase(getProductsFromLocal.rejected, (state, { payload }) => {
      const error = payload as string
      console.log('get products local error: ', error)
      
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = error
    })

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
    //   console.log("getVendors excluding success");
    // },

    // [getVendorsExcluding.pending]: (state) => {
    //   state.isFetching = true;
    // },
    // [getVendorsExcluding.rejected]: (state, { payload }) => {
    //   console.log("get vendors excluding rejected");
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
    //   // console.log("get products by vendor payload: ", data);
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
  }
})

export const shopActions = {
  getDispensariesLocal,
  getProductsFromLocal,
  // getVendorsExcluding,
  // getProductsByVendor,
  ...shopSlice.actions,
};

export const shopReducer = shopSlice.reducer;

export const selectShopState = (state: AppState) => state.shop;