// @ts-nocheck

import { DriverWithSessionDetails } from "@cd/data-access";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlBuilder } from "../../utils";
import { AppState, ThunkArgumentsType } from "../types";

export const updateOnlineStatus = createAsyncThunk<{ success: boolean, isOnline: boolean }, boolean, {extra: ThunkArgumentsType}> (
    "driver/updateOnlineStatus",
    async (onlineStatus, thunkAPI) => {
        try {

          const
          id = await thunkAPI.extra.store.getState()
          
          console.log('hello')
          console.log(id, onlineStatus)
          const
          response = await axios.post(
              urlBuilder.main.driverUpdateStatus(), {
                  id, onlineStatus
              });

              console.log('response: ', response)
          if (response.status !== 200)
          throw new Error(response.data);

          return { ...response.data, success: true, isOnline: onlineStatus };
            
        } catch (error) {
            console.error('updateOnlineStatus error: ', error.message);
            return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
        }
    }
);

export type DriverSessionState = {
  driver: DriverWithSessionDetails;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: DriverSessionState = {
    driver: {
        user: {
            id: "",
            email: "",
            username: "",
            firstName: "",
            lastName: "",
            dialCode: '',
            phone: '',
            emailVerified: false, 
            isLegalAge: null,
            idVerified: false,
            passwordHash: '', 
            passwordResetToken: '',
            termsAccepted: false
        },
        driverSession: {
            id: '',
            isOnline: false,
            isActiveDelivery: false,
            currentCoordinates: [],
            currentRoute: [],
        }
    },
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
};

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      return state;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {

    builder.addCase(updateOnlineStatus.fulfilled, (state, { payload })  => {
      
      // const
      // { isOnline } = payload

      // state.driver.driverSession['isOnline'] = isOnline;

      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;

    }),
    builder.addCase(updateOnlineStatus.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(updateOnlineStatus.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload as string
      throw new Error(state.errorMessage)
    })
  }
});

export const driverActions = {
    ...driverSlice.actions,
    updateOnlineStatus,
};

export const driverReducer = driverSlice.reducer;

export const selectDriverState = (state: AppState) => state.driver;