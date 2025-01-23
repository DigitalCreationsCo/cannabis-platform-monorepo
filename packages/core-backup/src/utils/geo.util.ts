/* eslint-disable @typescript-eslint/naming-convention */
import {
	type USStateAbbreviated,
	type AddressCreateType,
	type AddressPayload,
	type Coordinates,
} from '@gras/data-access';
import haversine from 'haversine-distance';
import { type StateMap } from '../types/geo.types';
import { isEmpty } from './object.util';

const stateMap: StateMap = { /* ... */ };

const usStatesList = [ /* ... */ ];
const usStatesAbbreviationList: USStateAbbreviated[] = [ /* ... */ ];

async function getGeoCoordinatesFromAddress(address: AddressPayload) {
	const { street1, city, state, country, zipcode } = address;
	const addressString = `${street1}, ${city}, ${state}, ${country}, ${zipcode}`;
	return await getCoordinatesByAddressString(addressString);
}

async function getCoordinatesByAddressString(addressString: string) {
	try {
		console.info(`Getting coordinates for address: ${addressString}`);
		const format = 'json';
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_LOCATION_IQ_GEOCODE_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&q=${addressString}&format=${format}`
		);

		if (!response.ok) {
			throw new Error('No coordinates found for address');
		}

		const data = await response.json();
		const { lat: latitude, lon: longitude } = data[0];
		console.info('response: lat: ', latitude, ' lon: ', longitude);

		return { latitude, longitude };
	} catch (error) {
		throw new Error(error);
	}
}

async function getGeoAddressFromCoordinates(coordinates: { latitude: number; longitude: number; }): Promise<AddressPayload> {
	/* ... */
}

function getCoordinatePairFromCoordinates([lat, lon]: Coordinates): [number, number] {
	/* ... */
}

function getGeoJsonPairFromCoordinates(coordinates: Coordinates) {
	/* ... */
}

function setCoordinateRadius() {
	return 10000; // meters
}

function coordinatesIsEmpty(address: AddressCreateType) {
	/* ... */
}

function getHaversineDistanceFromCoordinates(source: Coordinates, dest: Coordinates) {
	return haversine(source, dest);
}

async function getTravelDistanceFromCoordinates(source: Coordinates, dest: Coordinates) {
	return 50000;
}

async function getRoutingDetails(source: Coordinates, dest: Coordinates): Promise<RoutingDetailsResponse> {
	/* ... */
}

async function getOptimizedRouting() {
	/* ... */
}

interface RoutingDetailsResponse {
	/* ... */
}

const isValidZipcode = (input: string) => {
	const zipCodeRegex = /^\d{5}$/;
	return zipCodeRegex.test(input);
};

export {
	stateMap,
	usStatesList,
	usStatesAbbreviationList,
	getGeoCoordinatesFromAddress,
	getGeoAddressFromCoordinates,
	getCoordinatePairFromCoordinates,
	getGeoJsonPairFromCoordinates,
	setCoordinateRadius,
	coordinatesIsEmpty,
	getHaversineDistanceFromCoordinates,
	getTravelDistanceFromCoordinates,
	getRoutingDetails,
	getOptimizedRouting,
	isValidZipcode,
};

export type { RoutingDetailsResponse };
