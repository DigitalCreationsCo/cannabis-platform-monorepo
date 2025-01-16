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

// const _acceptEncoding = 'gzip,deflate,compress';

export const stateMap: StateMap = {
	ALABAMA: { abbreviation: 'AL', legalAge: 21 },
	ALASKA: { abbreviation: 'AK', legalAge: 21 },
	ARIZONA: { abbreviation: 'AZ', legalAge: 21 },
	ARKANSAS: { abbreviation: 'AR', legalAge: 21 },
	CALIFORNIA: { abbreviation: 'CA', legalAge: 21 },
	COLORADO: { abbreviation: 'CO', legalAge: 21 },
	CONNECTICUT: { abbreviation: 'CT', legalAge: 21 },
	DELAWARE: { abbreviation: 'DE', legalAge: 21 },
	FLORIDA: { abbreviation: 'FL', legalAge: 21 },
	GEORGIA: { abbreviation: 'GA', legalAge: 21 },
	HAWAII: { abbreviation: 'HI', legalAge: 21 },
	IDAHO: { abbreviation: 'ID', legalAge: 21 },
	ILLINOIS: { abbreviation: 'IL', legalAge: 21 },
	INDIANA: { abbreviation: 'IN', legalAge: 21 },
	IOWA: { abbreviation: 'IA', legalAge: 21 },
	KANSAS: { abbreviation: 'KS', legalAge: 21 },
	KENTUCKY: { abbreviation: 'KY', legalAge: 21 },
	LOUISIANA: { abbreviation: 'LA', legalAge: 21 },
	MAINE: { abbreviation: 'ME', legalAge: 21 },
	MARYLAND: { abbreviation: 'MD', legalAge: 21 },
	MASSACHUSETTS: { abbreviation: 'MA', legalAge: 21 },
	MICHIGAN: { abbreviation: 'MI', legalAge: 21 },
	MINNESOTA: { abbreviation: 'MN', legalAge: 21 },
	MISSISSIPPI: { abbreviation: 'MS', legalAge: 21 },
	MISSOURI: { abbreviation: 'MO', legalAge: 21 },
	MONTANA: { abbreviation: 'MT', legalAge: 21 },
	NEBRASKA: { abbreviation: 'NE', legalAge: 21 },
	NEVADA: { abbreviation: 'NV', legalAge: 21 },
	'NEW HAMPSHIRE': { abbreviation: 'NH', legalAge: 21 },
	'NEW JERSEY': { abbreviation: 'NJ', legalAge: 21 },
	'NEW MEXICO': { abbreviation: 'NM', legalAge: 21 },
	'NEW YORK': { abbreviation: 'NY', legalAge: 21 },
	'NORTH CAROLINA': { abbreviation: 'NC', legalAge: 21 },
	'NORTH DAKOTA': { abbreviation: 'ND', legalAge: 21 },
	OHIO: { abbreviation: 'OH', legalAge: 21 },
	OKLAHOMA: { abbreviation: 'OK', legalAge: 21 },
	OREGON: { abbreviation: 'OR', legalAge: 21 },
	PENNSYLVANIA: { abbreviation: 'PA', legalAge: 21 },
	'RHODE ISLAND': { abbreviation: 'RI', legalAge: 21 },
	'SOUTH CAROLINA': { abbreviation: 'SC', legalAge: 21 },
	'SOUTH DAKOTA': { abbreviation: 'SD', legalAge: 21 },
	TENNESSEE: { abbreviation: 'TN', legalAge: 21 },
	TEXAS: { abbreviation: 'TX', legalAge: 21 },
	UTAH: { abbreviation: 'UT', legalAge: 21 },
	VERMONT: { abbreviation: 'VT', legalAge: 21 },
	VIRGINIA: { abbreviation: 'VA', legalAge: 21 },
	WASHINGTON: { abbreviation: 'WA', legalAge: 21 },
	'WEST VIRGINIA': { abbreviation: 'WV', legalAge: 21 },
	WISCONSIN: { abbreviation: 'WI', legalAge: 21 },
	WYOMING: { abbreviation: 'WY', legalAge: 21 },
};

export const usStatesList = [
	'ALABAMA',
	'ALASKA',
	'ARIZONA',
	'ARKANSAS',
	'CALIFORNIA',
	'COLORADO',
	'CONNECTICUT',
	'DELAWARE',
	'FLORIDA',
	'GEORGIA',
	'HAWAII',
	'IDAHO',
	'ILLINOIS',
	'INDIANA',
	'IOWA',
	'KANSAS',
	'KENTUCKY',
	'LOUISIANA',
	'MAINE',
	'MARYLAND',
	'MASSACHUSETTS',
	'MICHIGAN',
	'MINNESOTA',
	'MISSISSIPPI',
	'MISSOURI',
	'MONTANA',
	'NEBRASKA',
	'NEVADA',
	'NEW HAMPSHIRE',
	'NEW JERSEY',
	'NEW MEXICO',
	'NEW YORK',
	'NORTH CAROLINA',
	'NORTH DAKOTA',
	'OHIO',
	'OKLAHOMA',
	'OREGON',
	'PENNSYLVANIA',
	'RHODE ISLAND',
	'SOUTH CAROLINA',
	'SOUTH DAKOTA',
	'TENNESSEE',
	'TEXAS',
	'UTAH',
	'VERMONT',
	'VIRGINIA',
	'WASHINGTON',
	'WEST VIRGINIA',
	'WISCONSIN',
	'WYOMING',
];

export const usStatesAbbreviationList: USStateAbbreviated[] = [
	'AL',
	'AK',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'FL',
	'GA',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'OH',
	'OK',
	'OR',
	'PA',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY',
];

export async function getGeoCoordinatesFromAddress(address: AddressPayload) {
	const { street1, city, state, country, zipcode } = address;

	const addressString = `${street1}, ${city}, ${state}, ${country}, ${zipcode}`;
	return await getCoordinatesByAddressString(addressString);
}

async function getCoordinatesByAddressString(addressString: string): Promise<{
	latitude: any;
	longitude: any;
}> {
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

export async function getGeoAddressFromCoordinates(coordinates: {
	latitude: number;
	longitude: number;
}): Promise<AddressPayload> {
	try {
		const format = 'json';
		const { latitude, longitude } = coordinates;
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_LOCATION_IQ_REVERSE_GEOCODE_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=${format}`
		);

		if (!response.ok) {
			throw new Error('No coordinates found for address');
		}

		const data = await response.json();

		const { address, lat, lon } = data;

		const formattedAddress: AddressPayload = {
			street1: address.house_number + ' ' + address.road,
			street2: '',
			city: address.city,
			state: address.state,
			zipcode: address.postcode,
			country: address.country,
			countryCode: 'US',
			coordinates: {
				latitude: lat,
				longitude: lon,
			},
		};

		return formattedAddress;
	} catch (error) {
		throw new Error(error);
	}
}

export function getCoordinatePairFromCoordinates([lat, lon]: Coordinates): [
	number,
	number,
] {
	if (lat && lon) return [Number(lat), Number(lon)];
	else throw new Error('Invalid coordinates');
}

export function getGeoJsonPairFromCoordinates(coordinates: Coordinates): {
	type: 'Point';
	coordinates: [number, number];
} {
	if (coordinatesIsEmpty({ coordinates } as any))
		throw new Error('Invalid coordinates');
	return {
		type: 'Point',
		coordinates,
	};
}

export function setCoordinateRadius() {
	return 10000; // meters
}

export function coordinatesIsEmpty(address: AddressCreateType) {
	return (
		!address.coordinates || (!address.coordinates[0] && !address.coordinates[1])
	);
}

/**
 * calculates haversine distance between two coordinate points
 */
export function getHaversineDistanceFromCoordinates(
	source: Coordinates,
	dest: Coordinates
) {
	return haversine(source, dest);
}

/**
 * DUMMY FUNC
 * @param source
 * @param dest
 * @returns 50000
 */
export async function getTravelDistanceFromCoordinates(
	source: Coordinates,
	dest: Coordinates
) {
	return 50000;
	// return await (
	// 	await getRoutingDetails(source, dest)
	// ).trips[0].distance;
}

/**
 * Returns routing details for an order
 * @param order OrderCreateType
 * @returns RoutingDetailsResponse
 */
export async function getRoutingDetails(
	source: Coordinates,
	dest: Coordinates
): Promise<RoutingDetailsResponse> {
	try {
		const sourceCoordinates = getCoordinatePairFromCoordinates(source);
		const destCoordinates = getCoordinatePairFromCoordinates(dest);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_LOCATION_IQ_ROUTING_URL}/${sourceCoordinates};${destCoordinates}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&overview=false&roundtrip=false`
		);

		if (!response.ok) {
			throw new Error('Failed to get routing details.');
		}

		const data = await response.json();

		if (isEmpty(data?.trips)) {
			throw new Error('No routing data.');
		}

		return data;
	} catch (error) {
		console.info('getRoutingDetails: ', error);
		throw new Error(error);
	}
}

/**
 * Returns the optimized routing for a list of addresses, with routing details
 * @param addresses AddressWithCoordinates[]
 */
export async function getOptimizedRouting() {
	try {
		return;
	} catch (error) {
		console.info('getOptimizedRouting: ', error);
		throw new Error(error);
	}
}

export interface RoutingDetailsResponse {
	code: 'Ok';
	waypoints: {
		waypoint_index: number;
		trips_index: number;
		hint: string;
		distance: number;
		location: [number, number];
		name: string;
	}[];
	trips: {
		legs: {
			steps: any[];
			weight: number;
			distance: number;
			summary: string;
			duration: number;
		}[];
		weight_name: any;
		geometry: any;
		weight: number;
		distance: number;
		duration: number;
	}[];
}

export const isValidZipcode = (input: string) => {
	// match 5 digit zip code
	const zipCodeRegex = /^\d{5}$/;
	return zipCodeRegex.test(input);
};
