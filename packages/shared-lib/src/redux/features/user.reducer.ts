
import { UserWithDetails } from "@cd/data-access";
import { AnyAction, createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
// import * as SecureStore from "expo-secure-store";
import toast from 'react-hot-toast';
import { AppState, ThunkArgumentsType } from "..";

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

export const signinUserAsync = createAsyncThunk<boolean, {email: string; password: string}, {dispatch: Dispatch<AnyAction>; extra: ThunkArgumentsType}>(
  "user/signinUser",
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
        toast.error('Email or Password is incorrect.');
    }
    if (response.status === 'OK') {
        // do something with the session object, save in persisted storage
        // Router.push('/');
        window.location.href = '/';
        toast.success('Signed in', { duration: 5000 });
    }
    return response.user
        // await SecureStore.setItemAsync(
        //   "authentication",
        //   serializedUserData
        // ).catch((err) => console.log(err));

    } catch (error) {
      return rejectWithValue("signin error: " + error);
    }
  }
);

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
  friendList: any[];
  isSignedIn: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState:UserStateProps = {
  token: null,
  user: {
    id: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    dialCode: null,
    address: [
      {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        countryCode: null,
      }
    ],
    phone: null,
    orders: [],
    preferences: null,
    emailVerified: false, 
    passwordHash: '', 
    passwordResetToken: '',
    termsAccepted: false
  },
  friendList: [
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
    { userName: "Geena", customerId: "12345" },
    { userName: "Hansel", customerId: "23456" },
    { userName: "Sean", customerId: "345678" },
  ],
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
    signinUserSync: ((state, {payload}) => {
      state.user = payload.user;
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

    builder.addCase(signinUserAsync.fulfilled, (state, { payload }) => {
      // const { user } = state;
      // let { address, location, ...userData } = payload.info;
      // Object.assign(user, userData);
      // // console.log("login user state: ", user);
      // // console.log("login user data: ", userData);
      // user.locationData.homeLocation.address = address;
      // user.locationData.homeLocation.location = location;
      // state.user = user;
      // state.token = payload.auth_token;
      state.isLoading = false;
      state.isSignedIn = true;
      // state.isSuccess = true;
    }),
    builder.addCase(signinUserAsync.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(signinUserAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      // state.errorMessage = payload;
    })

    // builder.addCase(logoutUser.fulfilled, () => initialState),
    // builder.addCase(logoutUser.pending]: (state) => {
    //   state.isFetching = true;
    // }),
    // builder.addCase(logoutUser.rejected, (state, { payload }) => {
    //   state.isFetching = false;
    //   state.isError = true;
    //   state.errorMessage = payload;
    // }),
  }
});

export const userActions = {
//   signupUser,
  signinUserAsync,
//   logoutUser,
  ...userSlice.actions,
};

export const userReducer = userSlice.reducer;

export const selectUserState = (state: AppState) => state.user;