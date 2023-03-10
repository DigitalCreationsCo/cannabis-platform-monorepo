import { Address } from '@prisma/client';
import axios from 'axios';
import { compareSync, hashSync } from 'bcryptjs';
import { customAlphabet } from 'nanoid';
import { createHash } from 'node:crypto';

/**
 * @param input String to hash
 * @returns Input hashed with SHA265 in hexadecimal form
 */
export function sha265hex(input: string) {
	return createHash('sha256').update(input).digest('hex');
}

const alphanumericChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Create a random alphanumberic string (of default length 128 characters)
 */
export const createToken = customAlphabet(alphanumericChars, 128);

/**
 * Add passwordHash field to object, and remove password and re_password fields
 */
export const createPasswordHash = (data: any) => {
	const { password, re_password, ...rest } = data;
	return {
		...rest,
		passwordHash: hashSync(password, Number(process.env.PASSWORD_SALT_ROUNDS)),
	};
}

export const isPasswordMatch = (password: string, passwordHash: string) => {
	return compareSync(password, passwordHash ?? '')
}

export const getGeoCoordinates = async (address: Address) => {
	const { street1, street2 ,city, state, country, zipcode,countryCode } = address;
	const addressString = `${street1} ${street2} ${city} ${state} ${country} ${zipcode} ${countryCode}`;
	const coordinates = await getCoordinates(addressString);
	console.log('getGeoCoordinates: ', coordinates)
	return coordinates
}

const getCoordinates = async (addressString: string):Promise<{
    latitude: any;
    longitude: any;
}| null> => {
	try {
		const {data } = await axios(process.env.LOCATION_IQ_URL, {
			params: {
				key: process.env.LOCATION_IQ_API_KEY,
				q: addressString,
				format: 'json',
				}
			})
		const { lat: latitude, lon: longitude } = data[0];
		const coordinates = { latitude, longitude };
		return coordinates || null;
	} catch (error) {
		console.log('Error getting coordinates: ', error);
		return null
	}
}