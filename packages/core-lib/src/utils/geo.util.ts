/* eslint-disable @typescript-eslint/naming-convention */
import {
	type AddressCreateType,
	type AddressPayload,
	type Coordinates,
} from '@cd/data-access';
import haversine from 'haversine-distance';
import { axios } from '../axiosInstance';
import { isEmpty } from './object.util';

const _acceptEncoding = 'gzip,deflate,compress';

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
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_LOCATION_IQ_GEOCODE_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&q=${addressString}&format=${format}`,
			{
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Accept-Encoding': _acceptEncoding,
				},
			},
		);

		if (!response.data || !response.data[0] || response.data.length == 0)
			throw new Error('No coordinates found for address');
		const { lat: latitude, lon: longitude } = response.data[0];
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
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_LOCATION_IQ_REVERSE_GEOCODE_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=${format}`,
			{
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Accept-Encoding': _acceptEncoding,
				},
			},
		);

		const { address, lat, lon } = response.data;

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

export function getCoordinatePairFromCoordinates(
	userlocation: Coordinates,
): [number, number] {
	if (userlocation.latitude && userlocation.longitude)
		return [Number(userlocation.longitude), Number(userlocation.latitude)];
	else throw new Error('Invalid coordinates');
}

export function getGeoJsonPairFromCoordinates(coordinates: Coordinates) {
	if (coordinates.latitude && coordinates.longitude)
		return {
			type: 'Point',
			coordinates: [
				Number(coordinates.longitude),
				Number(coordinates.latitude),
			],
		};
	else throw new Error('Invalid coordinates');
}

export function setCoordinateRadius() {
	return 10000; // meters
}

export function coordinatesIsEmpty(address: AddressCreateType) {
	const latitude = address?.coordinates?.latitude;
	const longitude = address?.coordinates?.longitude;

	return (
		latitude === 0 ||
		latitude === undefined ||
		latitude === null ||
		longitude === 0 ||
		longitude === undefined ||
		longitude === null
	);
}

/**
 * calculates haversine distance between two coordinate points
 */
export function getHaversineDistanceFromCoordinates(
	source: Coordinates,
	dest: Coordinates,
) {
	return haversine(source, dest);
}

export async function getTravelDistanceFromCoordinates(
	source: Coordinates,
	dest: Coordinates,
) {
	return await (
		await getRoutingDetails(source, dest)
	).trips[0].distance;
}

/**
 * Returns routing details for an order
 * @param order OrderCreateType
 * @returns RoutingDetailsResponse
 */
export async function getRoutingDetails(
	source: Coordinates,
	dest: Coordinates,
): Promise<RoutingDetailsResponse> {
	try {
		const sourceCoordinates = getCoordinatePairFromCoordinates(source);
		const destCoordinates = getCoordinatePairFromCoordinates(dest);
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_LOCATION_IQ_ROUTING_URL}/${sourceCoordinates};${destCoordinates}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&overview=false&roundtrip=false`,
			{
				headers: {
					'Accept-Encoding': _acceptEncoding,
				},
			},
		);

		if (response.data?.code !== 'Ok' || isEmpty(response.data?.trips))
			throw new Error('Failed to find routing details.');
		return response.data;
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

export type RoutingDetailsResponse = {
	code: 'Ok';
	waypoints: {
		waypoint_index: number;
		trips_index: number;
		hint: string;
		distance: number;
		location: [number, number];
		name: 'Downing Street';
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
};
