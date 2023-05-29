// @ts-nocheck

import { DriverWithSessionDetails } from "@cd/data-access";
// import { UserWithDetails } from "@cd/data-access";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import * as SecureStore from "expo-secure-store";
import { urlBuilder } from "../../utils";
import { AppState, ThunkArgumentsType } from "../types";


export const updateOnlineStatus = createAsyncThunk<{ success: boolean, isOnline: boolean }, {status: boolean}, {extra: ThunkArgumentsType}> (
    "driver/updateOnlineStatus",
    async (onlineStatus, thunkAPI) => {
        try {

            const 
            { id } = thunkAPI.getState().driver as DriverSessionState['driver'];

            const
            response = await axios.post(
                urlBuilder.main.driverUpdateStatus(), {
                    id, onlineStatus
                });

            if (response.status !== 200)
            throw new Error(response.data);

            return { ...response.data, success: true, isOnline: onlineStatus };
            
        } catch (error) {
            console.error('updateOnlineStatus error: ', error.message);
            return thunkAPI.rejectWithValue(error.message);
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
        state.driver.driverSession
    }),
    builder.addCase(updateOnlineStatus.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(updateOnlineStatus.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload as string
    })
  }
});

export const driverActions = {
    ...driverSlice.actions,
    updateOnlineStatus,
};

export const driverReducer = driverSlice.reducer;

export const selectdriverState = (state: AppState) => state.driver;