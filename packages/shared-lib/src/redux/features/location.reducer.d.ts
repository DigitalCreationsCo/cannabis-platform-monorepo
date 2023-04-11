import { AppState } from "../types";
export declare const getAddressByCoordinates: any;
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
export declare const locationActions: any;
export declare const locationReducer: any;
export declare const selectLocationState: (state: AppState) => LocationStateProps;
export declare const selectCurrentLocationState: (state: AppState) => {
    latitude: number;
    longitude: number;
};
export declare const selectSelectedLocationState: (state: AppState) => LocationType;
export {};
