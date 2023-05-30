// @ts-nocheck

import { DriverWithDetails, DriverWithSessionDetails } from "@cd/data-access";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { pruneData, urlBuilder } from "../../utils";
import { AppState, ThunkArgumentsType } from "../reduxTypes";

export const updateOnlineStatus = createAsyncThunk<{ success: boolean, isOnline: boolean }, boolean, {extra: ThunkArgumentsType}> (
    "driver/updateOnlineStatus",
    async (onlineStatus, thunkAPI) => {
        try {

          const
          state = await thunkAPI.getState() as DriverSessionState

          let
          id = state.driver.driver.id;

          const
          response = await axios.post(
            urlBuilder.main.driverUpdateStatus(), {
              id, onlineStatus },
              { validateStatus: status => status < 500});

          if (response.status !== 200)
          throw new Error(response.data);

          return { 
            ...response.data, 
            success: true, 
            isOnline: onlineStatus 
          };
            
        } catch (error) {
            console.error('updateOnlineStatus error: ', error.message);
            return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
        }
    }
);

const signOutUserAsync = createAsyncThunk<void, void, {
  // dispatch: Dispatch<AnyAction>; 
  extra: ThunkArgumentsType
}>(
  "user/signOutUserAsync",
  async (_, {dispatch, extra, rejectWithValue}) => {
    try {

      const { signOut } = extra.supertokens;
      await signOut()

    } catch (error) {
      return rejectWithValue("signout error: " + error);
    }
  }
)

export type DriverSessionState = {
  driver: DriverWithSessionDetails;
  isSignedIn: boolean;
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
    signinDriverSync: ((state, {payload}: {payload: DriverWithDetails }) => {

      console.log('sign in driver, payload: ', payload)
      
      const driver = pruneData(payload, ['timeJoined', 'createdAt', 'updatedAt'])
      state.driver = driver;

      state.isSignedIn = true;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
    }),
    setActiveDelivery: (state, { payload }) => {
      if (!state.driver.driverSession) 
      throw new Error('Driver session is not defined.');
      // return;
      
      state.driver.driverSession['isActiveDelivery'] = payload;
      
    },
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
      
      // console.log('update online status fulfilled, payload: ', payload);
      const
      { isOnline } = payload

      state.driver.driverSession['isOnline'] = isOnline;

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
    }),

    builder.addCase(signOutUserAsync.fulfilled, () => initialState),
    builder.addCase(signOutUserAsync.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(signOutUserAsync.rejected, (state, { payload }) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = payload as string
    })
  }
});

export const driverActions = {
    ...driverSlice.actions,
    updateOnlineStatus,
    signOutUserAsync
};

export const driverReducer = driverSlice.reducer;

export const selectDriverState = (state: AppState) => state.driver;