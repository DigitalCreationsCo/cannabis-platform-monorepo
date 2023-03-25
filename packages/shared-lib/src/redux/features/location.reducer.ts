import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "..";

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
        coordinates: number[];
    };

}

export type LocationStateProps = {
    radius: number;
    selectLocationType: typeof locationTypes.HOME_LOCATION | typeof locationTypes.CURRENT_LOCATION | typeof locationTypes.GIFT_LOCATION;
    homeLocation: LocationType;
    currentLocation: LocationType;
    giftLocation: LocationType;
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
          coordinates: []
        },
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
          coordinates: []
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
          coordinates: []
        },
      },
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setCurrentLocation: (state, { payload }: { payload }) => {
            state.currentLocation = payload.currentLocation
        },
        setLocationType: (state, {payload}) => {
            state.selectLocationType = payload.selectLocationType
        }
    },
    extraReducers: {}
})

export const locationActions = {
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