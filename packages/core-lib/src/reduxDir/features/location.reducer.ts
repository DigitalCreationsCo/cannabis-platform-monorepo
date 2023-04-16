// @ts-nocheck

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGeoAddressByCoordinates } from "../../utils/geo";
import { AppState } from "../types";

export const getAddressByCoordinates = createAsyncThunk(
  "location/getAddressByCoordinates",
  async (coordinates: {latitude: number; longitude: number}, {rejectWithValue}) => {
    try {
      const address = await getGeoAddressByCoordinates(coordinates);
      return address
    } catch (error) {
      console.log("getAddressByCoordinates: ", error);
      return rejectWithValue("Could not get address");
    }
  }
);

export const locationTypes = {
    HOME_LOCATION: 'homeLocation',
    CURRENT_LOCATION: 'currentLocation',
    GIFT_LOCATION: 'giftLocation'
}

type LocationType = {
    locationType: string;
    address: {
        street1: string;
        street2: string;
        city: string;
        state: string;
        zipcode: string;
        country: string;
        countryCode: string | null;
        coordinates: {latitude: number; longitude: number};
    };

}

type AddressPayload = { 
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    countryCode: string | null;
    coordinates: {latitude: number; longitude: number};
}

export type LocationStateProps = {
    radius: number;
    selectLocationType: typeof locationTypes.HOME_LOCATION | typeof locationTypes.CURRENT_LOCATION | typeof locationTypes.GIFT_LOCATION;
    homeLocation: LocationType;
    currentLocation: LocationType;
    giftLocation: LocationType;
    allLocations: LocationType[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
}

const initialState: LocationStateProps = {
    radius: 100000000,
    selectLocationType: locationTypes.CURRENT_LOCATION,
    homeLocation: {
        locationType: locationTypes.HOME_LOCATION,
        address: {
          street1: "",
          street2: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          countryCode: null,
          coordinates: {
            latitude: 0,
            longitude: 0
          }
        }
      },
      currentLocation: {
        locationType: locationTypes.CURRENT_LOCATION,
        address: {
          street1: "",
          street2: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          countryCode: null,
          coordinates: {
            latitude: 0,
            longitude: 0
          }
        },
      },
      giftLocation: {
        locationType: locationTypes.GIFT_LOCATION,
        address: {
          street1: "",
          street2: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          countryCode: null,
          coordinates: {
            latitude: 0,
            longitude: 0
          }
        },
      },
    allLocations: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setCurrentCoordinates: (state, { payload }: { payload: { latitude: number; longitude: number }}) => {
          state.currentLocation.address.coordinates.latitude = payload.latitude
          state.currentLocation.address.coordinates.longitude = payload.longitude
        },
        setCurrentLocation: (state, { payload }: { payload: { currentLocation :LocationType }}) => {
            state.currentLocation = payload.currentLocation
        },
        setSelectLocationType: (state, {payload}: {payload: LocationStateProps['selectLocationType']}) => {
            state.selectLocationType = payload
        },
        setHomeAddress: (state, {payload}: {payload: LocationType}) => {
          state.homeLocation = {...state.homeLocation, ...payload }
        },
        addAddress: (state, {payload}: {payload: LocationType}) => {
          state.allLocations = [...state.allLocations, payload ]
        },
    },
    extraReducers: (builder) => {
      builder.addCase(getAddressByCoordinates.fulfilled, (state, { payload }: {payload: AddressPayload}) => {
        const address = payload
        state.currentLocation.address = address
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      }),
      builder.addCase(getAddressByCoordinates.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      }),
      builder.addCase(getAddressByCoordinates.rejected, (state, { payload }) => {
        const error = payload;
        console.log('getAddressByCoordinates error: ', error)
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
    }
})

export const locationActions = {
  getAddressByCoordinates,
  ...locationSlice.actions
}

export const locationReducer = locationSlice.reducer

export const selectLocationState = (state:AppState) => state.location;

export const selectCurrentLocationState = (state:AppState) => 
  state.location.currentLocation.address.coordinates;

export const selectSelectedLocationState = (state:AppState) => {
  const selectedLocationType = state.location.selectLocationType
  const selectedLocation: LocationType =  state.location[selectedLocationType]
  return selectedLocation
};