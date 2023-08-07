import {
	type AddressCreateType,
	type AddressPayload,
	type Coordinates,
} from '@cd/data-access';
import { axios } from '../axiosInstance';

export async function getGeoCoordinatesFromAddress(address: AddressPayload) {
	const { street1, street2, city, state, country, zipcode } = address;

	const addressString = `${street1} ${street2}, ${city}, ${state}, ${country}, ${zipcode}`;
	return await getCoordinatesByAddressString(addressString);
}

async function getCoordinatesByAddressString(addressString: string): Promise<{
	latitude: any;
	longitude: any;
}> {
	try {
		const format = 'json';
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_LOCATION_IQ_GEOCODE_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&q=${addressString}&format=${format}`,
			{
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Accept-Encoding': 'gzip,deflate,compress',
				},
			},
		);

		if (!response.data || !response.data[0] || response.data.length == 0)
			throw new Error('No coordinates found for address');
		const { lat: latitude, lon: longitude } = response.data[0];

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
					'Accept-Encoding': 'gzip,deflate,compress',
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

export function getCoordinatePairFromUserLocation(userlocation: Coordinates) {
	if (userlocation.latitude && userlocation.longitude)
		return [Number(userlocation.longitude), Number(userlocation.latitude)];
	else throw new Error('Invalid user location');
}

export function coordinatesIsEmpty(address: AddressCreateType) {
	const latitude = address?.coordinates?.latitude;

	return latitude === 0 || latitude === undefined || latitude === null;
}
