import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, urlTable } from "../../helpers";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ vendorIdList }, thunkAPI) => {
    try {
      const response = await fetchData(urlTable.GET_PRODUCTS(1, 10), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorIdList,
        }),
      });
      if (response.status === 200) {
        let data = await response.json();
        return data;

        // this action works,
        // i need to update the extraReducers to pass the payload to state. :)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("A general error occured. ");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getProducts.pending]: (state) => {
      state.isFetching = true;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;

      state.errorMessage = payload;
    },
  },
});

export default productsSlice.reducer;
