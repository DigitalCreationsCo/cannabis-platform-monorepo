import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGeoAddressByCoordinates } from "../../utils/geo";
export const getAddressByCoordinates = createAsyncThunk("location/getAddressByCoordinates", async (coordinates, { rejectWithValue }) => {
    try {
        const address = await getGeoAddressByCoordinates(coordinates);
        return address;
    }
    catch (error) {
        console.log("getAddressByCoordinates: ", error);
        return rejectWithValue("Could not get address");
    }
});
export const locationTypes = {
    HOME_LOCATION: 'homeLocation',
    CURRENT_LOCATION: 'currentLocation',
    GIFT_LOCATION: 'giftLocation'
};
const initialState = {
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
        setCurrentCoordinates: (state, { payload }) => {
            state.currentLocation.address.coordinates.latitude = payload.latitude;
            state.currentLocation.address.coordinates.longitude = payload.longitude;
        },
        setCurrentLocation: (state, { payload }) => {
            state.currentLocation = payload.currentLocation;
        },
        setSelectLocationType: (state, { payload }) => {
            state.selectLocationType = payload;
        },
        setHomeAddress: (state, { payload }) => {
            state.homeLocation = { ...state.homeLocation, ...payload };
        },
        addAddress: (state, { payload }) => {
            state.allLocations = [...state.allLocations, payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAddressByCoordinates.fulfilled, (state, { payload }) => {
            const address = payload;
            state.currentLocation.address = address;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        }),
            builder.addCase(getAddressByCoordinates.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            }),
            builder.addCase(getAddressByCoordinates.rejected, (state, { payload }) => {
                const error = payload;
                console.log('getAddressByCoordinates error: ', error);
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
            });
    }
});
export const locationActions = {
    getAddressByCoordinates,
    ...locationSlice.actions
};
export const locationReducer = locationSlice.reducer;
export const selectLocationState = (state) => state.location;
export const selectCurrentLocationState = (state) => state.location.currentLocation.address.coordinates;
export const selectSelectedLocationState = (state) => {
    const selectedLocationType = state.location.selectLocationType;
    const selectedLocation = state.location[selectedLocationType];
    return selectedLocation;
};
//# sourceMappingURL=location.reducer.js.map