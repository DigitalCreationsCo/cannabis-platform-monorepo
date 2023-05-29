// @ts-nocheck

// import { UserWithDetails } from "@cd/data-access";
import { DriverWithDetails } from "@cd/data-access";
import { createSlice } from "@reduxjs/toolkit";
// import * as SecureStore from "expo-secure-store";
import { pruneData } from "../../utils";
import { AppState } from "../types";

export type DriverSessionState = {
  driver: DriverWithDetails;
  isOnline: boolean;
  error: string;
}

const initialState: DriverSessionState = {
  driver: {
    id: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    dialCode: '',
    address: [
      {
        id: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        countryCode: '',
      }
    ],
    phone: '',
    orders: [],
    // preferences: {},
    emailVerified: false, 
    isLegalAge: null,
    idVerified: false,
    passwordHash: '', 
    passwordResetToken: '',
    termsAccepted: false
  },
  isSignedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    signinUserSync: ((state, {payload}: {payload }) => {
      const user = pruneData(payload, ['timeJoined', 'createdAt', 'updatedAt'])
      state.user = user;
      state.isSignedIn = true;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    }),
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

    builder.addCase(signinUserAsyncEmailPassword.fulfilled, (state, { payload }) => {
      const user = payload
      if (user !== undefined) {
        state.user = {...state.user, ...user}
      }
      state.isLoading = false;
      state.isSignedIn = true;
      state.isSuccess = true;
      state.isError = false
      state.errorMessage = ""
    }),
    builder.addCase(signinUserAsyncEmailPassword.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(signinUserAsyncEmailPassword.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload as string
    })
  }
});

export const driverActions = {
};

export const driverReducer = driverSlice.reducer;

export const selectdriverState = (state: AppState) => state.driver;