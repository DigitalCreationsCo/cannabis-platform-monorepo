import { AppState } from "../types";
export declare const getAddressByCoordinates: import("@reduxjs/toolkit").AsyncThunk<{
    street1: string;
    street2: string;
    city: any;
    state: any;
    zipcode: any;
    country: any;
    countryCode: string;
    coordinates: {
        latitude: any;
        longitude: any;
    };
}, {
    latitude: number;
    longitude: number;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const locationTypes: {
    HOME_LOCATION: string;
    CURRENT_LOCATION: string;
    GIFT_LOCATION: string;
};
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
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
};
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
};
export declare const locationActions: {
    setCurrentCoordinates: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
        latitude: number;
        longitude: number;
    }, "location/setCurrentCoordinates">;
    setCurrentLocation: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "location/setCurrentLocation">;
    setSelectLocationType: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "location/setSelectLocationType">;
    setHomeAddress: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<LocationType, "location/setHomeAddress">;
    addAddress: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<LocationType, "location/addAddress">;
    getAddressByCoordinates: import("@reduxjs/toolkit").AsyncThunk<{
        street1: string;
        street2: string;
        city: any;
        state: any;
        zipcode: any;
        country: any;
        countryCode: string;
        coordinates: {
            latitude: any;
            longitude: any;
        };
    }, {
        latitude: number;
        longitude: number;
    }, {
        state?: unknown;
        dispatch?: import("redux").Dispatch<import("redux").AnyAction>;
        extra?: unknown;
        rejectValue?: unknown;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
        fulfilledMeta?: unknown;
        rejectedMeta?: unknown;
    }>;
};
export declare const locationReducer: import("redux").Reducer<import("immer/dist/internal").WritableDraft<LocationStateProps>, import("redux").AnyAction>;
export declare const selectLocationState: (state: AppState) => LocationStateProps;
export declare const selectCurrentLocationState: (state: AppState) => {
    latitude: number;
    longitude: number;
};
export declare const selectSelectedLocationState: (state: AppState) => LocationType;
export {};
