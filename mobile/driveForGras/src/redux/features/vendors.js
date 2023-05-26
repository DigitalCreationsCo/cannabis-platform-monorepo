import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, urlTable } from "../../helpers";

export const getVendors = createAsyncThunk(
  "vendors/getVendors",
  async ({ location, searchRadius }, thunkAPI) => {
    try {
      const response = await fetchData(urlTable.GET_VENDORS(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userLocation: {
            type: "Point",
            coordinates: location,
          },
          proximityRadius: searchRadius,
        }),
      });
      if (response.status === 200) {
        let data = await response.json();

        return data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("A general error occured. ");
    }
  }
);

export const getProductsByVendor = createAsyncThunk(
  "vendors/getProductsByVendor",
  async ({ vendorId, index }, thunkAPI) => {
    try {
      const response = await fetchData(
        urlTable.GET_PRODUCTS_BY_VENDOR(vendorId),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        let data = await response.json();
        return { data, index };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("A general error occured. ");
    }
  }
);

export const vendorSlice = createSlice({
  name: "vendors",
  initialState: {
    vendors: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {},
  extraReducers: {
    [getVendors.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.vendors = payload;
      // console.log("vendors payload: ", payload);
    },
    [getVendors.pending]: (state) => {
      state.isFetching = true;
    },
    [getVendors.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;

      // console.log(payload);
    },
    [getProductsByVendor.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      let { index, data } = payload;
      state.vendors[index].products = data;
      state.vendors[index].productsFetched = true;
    },
    [getProductsByVendor.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getProductsByVendor.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;

      console.log("products error payload: ", payload);
    },
  },
});

export default vendorSlice.reducer;
