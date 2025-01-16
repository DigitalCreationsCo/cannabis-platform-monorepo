/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { type Address } from '@gras/data-access';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type AppState } from '../types';
import { getGeoAddressFromCoordinates } from '../utils';

export const getAddressByCoordinates = createAsyncThunk(
	'location/getAddressByCoordinates',
	async (
		coordinates: { latitude: number; longitude: number },
		{ rejectWithValue }
	) => {
		try {
			return await getGeoAddressFromCoordinates(coordinates);
		} catch (error) {
			console.info('getAddressByCoordinates: ', error);
			return rejectWithValue('Could not get address');
		}
	}
);

export const locationTypes = {
	HOME_LOCATION: 'homeLocation',
	CURRENT_LOCATION: 'currentLocation',
	GIFT_LOCATION: 'giftLocation',
};

export interface LocationType {
	locationType: string;
	address: {
		id: string;
		street1: string;
		street2: string;
		city: string;
		state: USStateAbbreviated;
		zipcode: string;
		country: string;
		countryCode: string | null;
		coordinates: { latitude: number; longitude: number };
	};
}

export interface LocationStateProps {
	radius: number;
	selectLocationType:
		| typeof locationTypes.HOME_LOCATION
		| typeof locationTypes.CURRENT_LOCATION
		| typeof locationTypes.GIFT_LOCATION;
	homeLocation: LocationType;
	currentLocation: LocationType;
	giftLocation: LocationType;
	allLocations: Address[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
}

const initialState: LocationStateProps = {
	radius: 10000,
	selectLocationType: locationTypes.CURRENT_LOCATION,
	homeLocation: {
		locationType: locationTypes.HOME_LOCATION,
		address: {
			id: '',
			street1: '',
			street2: '',
			city: '',
			state: '',
			zipcode: '',
			country: '',
			countryCode: null,
			coordinates: {
				latitude: 0,
				longitude: 0,
			},
		},
	},
	currentLocation: {
		locationType: locationTypes.CURRENT_LOCATION,
		address: {
			id: '',
			street1: '',
			street2: '',
			city: '',
			state: '',
			zipcode: '',
			country: '',
			countryCode: null,
			coordinates: {
				latitude: 0,
				longitude: 0,
			},
		},
	},
	giftLocation: {
		locationType: locationTypes.GIFT_LOCATION,
		address: {
			id: '',
			street1: '',
			street2: '',
			city: '',
			state: '',
			zipcode: '',
			country: '',
			countryCode: null,
			coordinates: {
				latitude: 0,
				longitude: 0,
			},
		},
	},
	allLocations: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	errorMessage: '',
};

const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {
		setCurrentCoordinates: (
			state,
			{ payload }: { payload: { latitude: number; longitude: number } }
		) => {
			console.debug('setCurrentCoordinates action, ', payload);
			state.currentLocation.address.coordinates.latitude = payload.latitude;
			state.currentLocation.address.coordinates.longitude = payload.longitude;
		},
		setSelectLocationType: (
			state,
			{ payload }: { payload: LocationStateProps['selectLocationType'] }
		) => {
			console.debug('setSelectLocationType action');
			state.selectLocationType = payload;
		},
		setCurrentAddress: (state, { payload }: { payload: AddressPayload }) => {
			console.debug('setCurrentLocation action');
			state.currentLocation.address = {
				...state.currentLocation.address,
				...payload,
				coordinates:
					payload.coordinates || state.currentLocation.address.coordinates,
			};
		},
		setHomeAddress: (state, { payload }: { payload: AddressPayload }) => {
			console.debug('setHomeAddress action');
			state.homeLocation.address = {
				...state.homeLocation.address,
				...payload,
				coordinates:
					payload.coordinates || state.homeLocation.address.coordinates,
			};
		},
		setAllLocations: (state, { payload }: { payload: AddressPayload[] }) => {
			const allAddresses = payload.reduce((all, address) => {
				const _address = {
					...address,
					coordinates: address.coordinates || { latitude: 0, longitude: 0 },
				};

				all.push(_address);
				return all;
			}, []);

			state.allLocations = allAddresses;
		},
		addAddress: (state, { payload }: { payload: LocationType }) => {
			console.info('addAddress action');
			state.allLocations = [...state.allLocations, payload];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			getAddressByCoordinates.fulfilled,
			(state, { payload }: { payload: AddressPayload }) => {
				console.info('getAddressByCoordinates fulfilled');
				const address = payload;
				state.currentLocation.address = { ...address };
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			}
		),
			builder.addCase(getAddressByCoordinates.pending, (state) => {
				console.info('getAddressByCoordinates pending');
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			}),
			builder.addCase(
				getAddressByCoordinates.rejected,
				(state, { payload }) => {
					console.info('getAddressByCoordinates rejected');
					const error = payload;
					console.info('getAddressByCoordinates error: ', error);
					state.isLoading = false;
					state.isSuccess = false;
					state.isError = true;
				}
			);
	},
});

export const locationActions = {
	getAddressByCoordinates,
	...locationSlice.actions,
};

export const locationReducer = locationSlice.reducer;

export const selectLocationState = (state: AppState) => state.location;

export const selectCurrentLocationState = (state: AppState) =>
	state.location.currentLocation.address.coordinates;

export const selectSelectedLocationState = (state: AppState) => {
	const selectedLocationType = state.location.selectLocationType;
	const selectedLocation: LocationType = state.location[selectedLocationType];
	return selectedLocation;
};
