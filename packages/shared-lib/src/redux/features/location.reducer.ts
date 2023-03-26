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
        coordinates: {latitude: number; longitude: number};
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
          coordinates: {
            latitude: 0,
            longitude: 0
          }
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
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setCurrentCoordinates: (state, { payload }: { payload: { latitude: number; longitude: number }}) => {
          state.currentLocation?.address?.coordinates?.latitude = payload.latitude
          state.currentLocation?.address?.coordinates?.longitude = payload.longitude
        },
        setCurrentLocation: (state, { payload }: { payload }) => {
            state.currentLocation = payload.currentLocation
        },
        setLocationType: (state, {payload}: {payload: LocationStateProps['selectLocationType']}) => {
            state.selectLocationType = payload
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