// @ts-nocheck

import { Address, AddressCreateType, AddressWithDetails, Coordinates, Prisma } from "@cd/data-access";
import axios from "axios";

export const getGeoCoordinatesByAddress = async (address: Prisma.AddressCreateWithoutOrganizationInput) => {
	const { street1, street2, city, state, country, zipcode, countryCode } = address;
	const addressString = `${street1} ${street2} ${city} ${state} ${country} ${zipcode} ${countryCode}`;
	console.log('getting coordinates for address: ', addressString);
	const coordinates = await getCoordinatesByAddressString(addressString);
	return coordinates
}

const getCoordinatesByAddressString = async (addressString: string): Promise<{
	latitude: any;
	longitude: any;
} | null> => {
	try {
		const
			geocodeUrl = process.env.NEXT_PUBLIC_LOCATION_IQ_GEOCODE_URL

		const
			response = await axios(geocodeUrl, {
				params: {
					key: process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY,
					q: addressString,
					format: 'json',
				}
			});

		const
			{ lat: latitude, lon: longitude } = response.data[0],

			coordinates = { latitude, longitude };

		return coordinates || null;
	} catch (error) {
		console.log('Error getting coordinates: ', error);
		return null
	}
}

export const getGeoAddressByCoordinates = async (coordinates: { latitude: number; longitude: number }): Promise<AddressWithDetails> => {
	try {

		const mainUrl = process.env.NEXT_PUBLIC_LOCATION_IQ_REVERSE_GEOCODE_URL

		const reverseGeocodeUrl = process.env.NEXT_PUBLIC_LOCATION_IQ_REVERSE_GEOCODE_URL

		const { latitude, longitude } = coordinates;
		const { data } = await axios(reverseGeocodeUrl, {
			params: {
				key: process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY,
				lat: latitude,
				lon: longitude,
				format: 'json',
			}
		})
		const { address } = data;

		const formattedAddress: AddressWithDetails = {
			street1: address.house_number + ' ' + address.road,
			street2: '',
			city: address.city,
			state: address.state,
			zipcode: address.postcode,
			country: address.country,
			countryCode: 'US',
			coordinates: {
				latitude: data.lat,
				longitude: data.lon
			}
		}

		return formattedAddress
	} catch (error) {
		console.log('Error getting address using coordinates: ', error);
		return null
	}
}

export function getCoordinatePairFromUserLocation(userlocation: Coordinates) {
	if (userlocation.latitude && userlocation.longitude) {
		return [Number(userlocation.longitude), Number(userlocation.latitude)];
	} else throw new Error('Invalid user location')
}

export const addressHasValidCoordinates = (address: Address | AddressCreateType) => {
	return address?.coordinates?.latitude && address?.coordinates?.longitude != 0
}