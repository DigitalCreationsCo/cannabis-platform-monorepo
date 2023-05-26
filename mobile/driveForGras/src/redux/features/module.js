import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
  name: "module",
  initialState: {
    isLoading: true,
  },
  reducers: {
    finishLoading: (state) => {
      console.log("finish loading");
      state.isLoading = false;
    },
  },
});

export const moduleActions = { ...moduleSlice.actions };
export default moduleSlice.reducer;
