// @ts-nocheck

import { UserWithDetails } from "@cd/data-access";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import * as SecureStore from "expo-secure-store";
import { pruneData } from "../../utils";
import { AppState, ThunkArgumentsType } from "../reduxTypes";
import { locationActions } from './location.reducer';

// import { messageActions } from "./message";
// import { vendorActions } from "./vendors";
// import { productActions } from "./products";
// import {
//   locationTypes,
//   messageTypes,
//   modalTypes,
//   TextContent,
// } from "@cannabis_delivery/component_dispensary.constants";
// import {
//   fetchData,
//   urlList,
// } from "@cannabis_delivery/component_dispensary.utils";

// export const signupUser = createAsyncThunk(
//   "user/signupUser",
//   async (
//     signUpUserPayload: UserCreateType,
//     {dispatch, extra} : {dispatch: any; extra: ThunkArgumentsType}
//   ) => {
//     try {
//       const response = await fetchData(urlList.SIGNUP(), {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstName,
//           lastName,
//           phone,
//           location,
//           address,
//           userName,
//           email,
//           password,
//         }),
//       });
//       if (response.status === 200) {
//         let data = await response.json();

//         serializedUserData = JSON.stringify({
//           token: data.auth_token,
//           email: data.info.email,
//           password: data.info.password,
//         });
//         await SecureStore.setItemAsync(
//           "authentication",
//           serializedUserData
//         ).catch((err) => console.log(err));
//         // if (storage) {
//         //   console.log("token stored in local storage: ", storage);
//         // } else {
//         //   console.log("No values stored under that key.");
//         // }

//         // how will the secure storage work to log a user in, ??
//         // and persist a user session without the user having to log their credentials again

//         // set the user token to storage
//         // in the top level of the app, get the token from storage
//         // const token = SecureStore.getItemAsync("token");
//         // {
//         //   token ? <renderThis /> : <renderThat />;
//         // }

//         // the token will not be pulling the user data, so how will this work?
//         // possibly send a backend end request to get userdata decoded from the token?

//         // remember to set a possible expiration for the token! maybe 3 days of inactivity?
//         // I'm doing a great job!

//         // Implementation plan

//         // Here's how the token storage will work and the automatic login will work
//         // redux actions for login and sign up, when they're successful they will
//         // store the token in the secure local storage
//         // One possible way I could do it is to have a state property
//         // in the top level of the app to hold the token and then make
//         // use of the use affect talk with the token as a dependency so
//         // that when the token changes that's not really making use of the local storage...

//         // OK one way to do it would be to have a use effect hook in the top level
//         // of the app on the app starts you do a call to get the token from
//         // local storage I'm gonna do that and I'm gonna see how it works

//         return {
//           ...data,
//           // firstName,
//           // lastName,
//           // phone,
//           // location,
//           // address,
//           // userName,
//           // email,
//           // password,
//         };
//       }
//       if (response.status === 400) {
//         const errorMessage = await response.json();
//         return thunkAPI.rejectWithValue(Object.values(errorMessage));
//       } else {
//         return thunkAPI.rejectWithValue(response);
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

export const signinUserAsyncEmailPassword = createAsyncThunk<UserWithDetails, {email: string; password: string}, { 
  // dispatch: Dispatch<AnyAction>; 
  extra: ThunkArgumentsType 
}>(
  "user/signinUserAsyncEmailPassword",
  async ({ email, password }, {dispatch, extra, rejectWithValue}) => {
    const { signIn } = extra.supertokens;
    try {
      const response = await signIn({
        formFields: [
            {
                id: 'email',
                value: email
            },
            {
                id: 'password',
                value: password
            }
        ]
    });
    if (response.status === 'WRONG_CREDENTIALS_ERROR') {
        // toast.error('Email or Password is incorrect.');
    }
    if (response.status === 'OK') {
        // await SecureStore.setItemAsync(
        //   "authentication",
        //   serializedUserData
        // ).catch((err) => console.log(err));

        if (response.user.address !== undefined && Array.isArray(response.user.addresss)) {
          response.user.address.forEach(address => dispatch(locationActions.addAddress(response.user.address)))
        }
        window.location.href = '/';
        // toast.success('Signed in', { duration: 5000 });
        return response.user
    }
        
    } catch (error) {
      return rejectWithValue("signin error: " + error);
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
// export const logoutUser = createAsyncThunk(
//   "user/logoutUser",
//   async ({ token, email }, thunkAPI) => {
//     try {
//       const response = await fetchData(urlList.LOGOUT(), {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",

//           // send auth token to web server
//           Authorization: "Bearer " + token,
//         },
//         body: JSON.stringify({
//           email,
//         }),
//       });

//       if (response.status === 200) {
//         let data = await response.json();

//         await SecureStore.deleteItemAsync("authentication").catch((err) =>
//           console.log(err)
//         );
//         return;
//       }
//       if (response.status === 400) {
//         const errorMessage = await response.json();
//         return thunkAPI.rejectWithValue(Object.values(errorMessage));
//       } else {
//         return thunkAPI.rejectWithValue(response.data);
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

export type UserStateProps = {
  token: string | null;
  user: UserWithDetails;
  // friendList: any[];
  isSignedIn: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState:UserStateProps = {
  token: "",
  user: {
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinUserSync: ((state, {payload}: {payload: UserWithDetails }) => {

      console.log('signinUserSync payload', payload)
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
    // builder.addCase(signupUser.fulfilled, (state, { payload }) => {
    //   state.isFetching = false;
    //   state.isSuccess = true;

    //   state.user = payload.info;
    //   state.token = payload.auth_token;
    //   // console.log("signup payload ", payload);
    // }),
    // builder.addCase(signupUser.pending, (state) => {
    //   state.isFetching = true;
    //   state.errorMessage = "";
    // }),
    // builder.addCase(signupUser.rejected, (state, { payload }) => {
    //   state.isFetching = false;

    //   state.errorMessage = payload;
    //   state.isError = true;
    // }),

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

export const userActions = {
  ...userSlice.actions,
  // signupUser,
  signinUserAsyncEmailPassword,
  signOutUserAsync,
};

export const userReducer = userSlice.reducer;

export const selectUserState = (state: AppState) => state.user;
export const selectIsAddressAdded = (state: AppState) => state.user?.user?.address?.length > 0;