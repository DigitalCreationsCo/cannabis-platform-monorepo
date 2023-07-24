// @ts-nocheck
import {
  AddressCreateType,
  AddressWithCoordinates,
  Coordinates,
  Prisma
} from '@cd/data-access';
import axios from 'axios';

export async function getGeoCoordinatesFromAddress(
  address: typeof Prisma.AddressCreateWithoutOrganizationInput
) {
  const { street1, street2, city, state, country, zipcode, countryCode } =
    address;
  const addressString = `${street1} ${street2}, ${city}, ${state}, ${country}, ${zipcode}`;
  console.info('getting coordinates for address: ', addressString);
  const coordinates = await getCoordinatesByAddressString(addressString);
  return coordinates;
}

async function getCoordinatesByAddressString(addressString: string): Promise<{
  latitude: any;
  longitude: any;
}> {
  try {
    const format = 'json';
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCATION_IQ_GEOCODE_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&q=${addressString}&format=${format}`
    );

    console.info('geolocate response: ', response.data);

    if (!response?.data?.[0])
      throw new Error('No coordinates found for address');

    const { lat: latitude, lon: longitude } = response?.data?.[0],
      coordinates = { latitude, longitude };

    return coordinates;
  } catch (error) {
    console.info('getCoordinatesByAddressString: ', error);
    throw new Error(error.message);
  }
}

export async function getGeoAddressFromCoordinates(coordinates: {
  latitude: number;
  longitude: number;
}): Promise<AddressWithCoordinates> {
  try {
    const format = 'json';
    const { latitude, longitude } = coordinates;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCATION_IQ_REVERSE_GEOCODE_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=${format}`
    );

    const { address, lat, lon } = response.data;

    const formattedAddress: AddressWithCoordinates = {
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
    console.info('getGeoAddressFromCoordinates: ', error);
    return null;
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
