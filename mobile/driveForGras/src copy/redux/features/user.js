import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, urlTable } from "../../helpers";
import * as SecureStore from "expo-secure-store";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (
    {
      firstName,
      lastName,
      country,
      dialCode,
      countryCode,
      mobileNumber,
      userName,
      email,
      password,
    },
    thunkAPI
  ) => {
    try {
      const response = await fetchData(urlTable.SIGNUP(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          country,
          dialCode,
          countryCode,
          mobileNumber,
          userName,
          email,
          password,
        }),
      });

      if (response.status === 200) {
        let data = await response.json();

        serializedUserData = JSON.stringify({
          token: data.auth_token,
          email: data.info.email,
          password: data.info.password,
        });
        await SecureStore.setItemAsync(
          "authentication",
          serializedUserData
        ).catch((err) => console.log(err));
        // if (storage) {
        //   console.log("token stored in local storage: ", storage);
        // } else {
        //   console.log("No values stored under that key.");
        // }

        // how will the secure storage work to log a user in, ??
        // and persist a user session without the user having to log their credentials again

        // set the user token to storage
        // in the top level of the app, get the token from storage
        // const token = SecureStore.getItemAsync("token");
        // {
        //   token ? <renderThis /> : <renderThat />;
        // }

        // the token will not be pulling the user data, so how will this work?
        // possibly send a backend end request to get userdata decoded from the token?

        // remember to set a possible expiration for the token! maybe 3 days of inactivity?
        // I'm doing a great job!

        // Implementation plan

        // Here's how the token storage will work and the automatic login will work
        // redux actions for login and sign up, when they're successful they will
        // store the token in the secure local storage
        // One possible way I could do it is to have a state property
        // in the top level of the app to hold the token and then make
        // use of the use affect talk with the token as a dependency so
        // that when the token changes that's not really making use of the local storage...

        // OK one way to do it would be to have a use effect hook in the top level
        // of the app on the app starts you do a call to get the token from
        // local storage I'm gonna do that and I'm gonna see how it works

        return {
          ...data,
          firstName,
          lastName,
          country,
          dialCode,
          countryCode,
          mobileNumber,
          userName,
          email,
          password,
        };
      }
      if (response.status === 400) {
        const errorMessage = await response.json();
        return thunkAPI.rejectWithValue(Object.values(errorMessage));
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetchData(urlTable.LOGIN(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        let data = await response.json();
        let serializedUserData = JSON.stringify({
          token: data.auth_token,
          email: data.info.email,
          password: data.info.password,
        });

        await SecureStore.setItemAsync(
          "authentication",
          serializedUserData
        ).catch((err) => console.log(err));

        return {
          ...data,
          email,
          password,
        };
      }
      if (response.status === 401) {
        const errorMessage = await response.json();
        return thunkAPI.rejectWithValue(errorMessage.error);
      } else {
        return thunkAPI.rejectWithValue(response.json());
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("A general error occured. ");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async ({ token, email }, thunkAPI) => {
    try {
      const response = await fetchData(urlTable.LOGOUT(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          // send auth token to web server
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (response.status === 200) {
        let data = await response.json();

        await SecureStore.deleteItemAsync("authentication").catch((err) =>
          console.log(err)
        );
        return;
      }
      if (response.status === 400) {
        const errorMessage = await response.json();
        return thunkAPI.rejectWithValue(Object.values(errorMessage));
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getLocationLookup = createAsyncThunk(
  "user/getLocationLookup",
  async (coords, thunkAPI) => {
    try {
      // const response = await fetchData(
      //   urlTable.REVERSE_GEO_LOOKUP(coords[0], coords[1]),
      //   {
      //     method: "GET",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // if (response.status === 200) {
      //   let locationResult = await response.json();
      //   return locationResult;
      // }
      // if (response.status === 401) {
      //   console.log("access token invalid");
      //   return thunkAPI.rejectWithValue(coords);
      // }
      // if (response.status === 400) {
      //   console.log("bad coordinate arg");
      //   return thunkAPI.rejectWithValue(coords);
      // }
      // API request is turned off for now, until memoization is implemented,
      // I am using much too many API calls in development
      return { address: { road: coords.join(", ") } };
    } catch (err) {
      return thunkAPI.rejectWithValue(coords);
    }
  }
);

export const updateOnlineStatus = createAsyncThunk(
  "user/updateOnlineStatus",
  async (status, thunkAPI) => {
    try {
      const { driverId } = thunkAPI.getState().user.user;
      const response = await fetchData(
        "http://127.0.0.1:6001/api/v1/drivers/onlineStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ driverId, updateStatus: status }),
        }
      );

      if (response.status === 200) {
        console.log("update status: ", status);
        return status;
      }
      if (response.status === 400) {
        const errorMessage = await response.json();
        return thunkAPI.rejectWithValue(Object.values(errorMessage));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentLocationUpdate = createAsyncThunk(
  "user/currentLocationUpdate",
  async ({ geoLocation }, thunkAPI) => {
    try {
      // const { driverId } = thunkAPI.getState().user.user;
      thunkAPI.dispatch(
        userActions.localCurrentLocationUpdate({ geoLocation })
      );
    } catch (error) {
      console.log("A general error occured: currentLocationUpdate-", error);
      thunkAPI.rejectWithValue(
        "A general error occured: currentLocationUpdate-",
        error
      );
    }
  }
);

export const updateDBSessionLocation = createAsyncThunk(
  "user/updateUserSessionLocation",
  async (geoLocation, thunkAPI) => {
    try {
      const { driverId } = thunkAPI.getState().user.user;
      const response = await fetchData(urlTable.UPDATE_SESSION_LOCATION(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ driverId, geoLocation }),
      });
      console.log("updating db current location");
      if (response.status === 400 || response.status === 500) {
        const errorMessage = await response.json();
        console.log(
          "A general error occured: updateDBSessionLocation-",
          errorMessage
        );
        return thunkAPI.rejectWithValue(Object.values(errorMessage));
      }
    } catch (error) {
      console.log("A general error occured: updateDBSessionLocation-", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// update driverPath in the pendingOrder document for the given order
// this process needs to defer a network transaction, for efficiency, so figure that out.
// Use the expo location API to defer events
export const updateOrderDriverPath = createAsyncThunk(
  "user/updateOrderDriverPath",
  // driverPathPacketList is an object containing orderIds, with a list of coordinate points,
  // that will be bulk written in their respective database order documents
  /* driverPathPacketList: {
    '123456': [
      {geoLocationPoint 1},
      {geoLocationPoint 2},
      {geoLocationPoint 3}
    ],
    '234567': [
      {geoLocationPoint 1},
      {geoLocationPoint 2},
      {geoLocationPoint 3}
    ]
  } */
  async (driverPathPacketList, thunkAPI) => {
    try {
      const orderList = Object.keys(driverPathPacketList);
      const response = await fetchData(urlTable.UPDATE_ORDER_DRIVER_PATH(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ driverPathPacketList }),
      });
      if (response.status === 400 || response.status === 500) {
        const errorMessage = await response.json();
        console.log(
          "A general error occured: updateOrderDriverPath-",
          errorMessage
        );
        return thunkAPI.rejectWithValue(Object.values(errorMessage));
      }
      console.log("updating db driverPath for orders: ", orderList);
    } catch (error) {
      console.log("A general error occured: updateOrderDriverPath-", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    user: {
      driverId: "61d3ace76615e07345291ade",
      firstName: "Bob",
      lastName: "Law",
      phone: {
        home: {
          dialCode: null,
          number: null,
        },
        mobile: {
          dialCode: 1,
          number: 1232343456,
        },
        work: {
          dialCode: 1,
          number: 1232343456,
        },
      },
      location: {
        type: "Point",
        coordinates: [-90, 35],
      },
      address: {
        street: "633 Carisa Mountains",
        city: "Port Cyrus",
        state: "NC",
        country: "United States",
        countryCode: "US",
        zipcode: "28032",
      },
      metadata: { isOnline: false, isActiveDelivery: false },
    },
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
    },
    localCurrentLocationUpdate: (state, { payload }) => {
      const { geoLocation } = payload;
      if (geoLocation.type === "Point" && geoLocation.coordinates.length === 2)
        state.user.location.geoLocation = geoLocation;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.user = payload.info;
      state.token = payload.auth_token;
      // console.log("signup payload ", payload);
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
      // state.errorMessage = "";
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;

      state.errorMessage = payload;
      state.isError = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.user = payload.info;
      state.token = payload.auth_token;
      // console.log("login payload ", payload);
      return state;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;

      state.isError = true;
      state.errorMessage = payload;
    },
    [logoutUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.user = null;
      state.token = null;
    },
    [logoutUser.pending]: (state) => {
      state.isFetching = true;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;

      state.errorMessage = payload;
    },
    [getLocationLookup.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      // state.currentLocation = payload; // for testing on android device
      state.user.location.geoLocation = payload;
    },
    [getLocationLookup.pending]: (state) => {
      state.isFetching = true;
    },
    [getLocationLookup.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;

      // state.currentLocation = payload; // for testing on android device
      state.user.location.geoLocation = payload;
    },
    [updateOnlineStatus.fulfilled]: (state, { payload }) => {
      // console.log("update status payload: ", payload);
      state.user.isOnline = payload;
    },
    [updateOnlineStatus.pending]: (state, { payload }) => {},
    [updateOnlineStatus.rejected]: (state, { payload }) => {
      // console.log("Could not update status");
      state.user.isOnline = false;
    },
    [currentLocationUpdate.fulfilled]: (state) => {},
    [currentLocationUpdate.pending]: (state) => {},
    [currentLocationUpdate.rejected]: (state) => {},
    [updateDBSessionLocation.fulfilled]: (state) => {},
    [updateDBSessionLocation.pending]: (state) => {},
    [updateDBSessionLocation.rejected]: (state) => {},
  },
});

export const userActions = {
  signupUser,
  loginUser,
  logoutUser,
  getLocationLookup,
  updateOnlineStatus,
  currentLocationUpdate,
  updateDBSessionLocation,
  updateOrderDriverPath,
  ...userSlice.actions,
};
export default userSlice.reducer;
