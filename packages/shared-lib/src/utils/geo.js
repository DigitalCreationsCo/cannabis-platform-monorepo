import axios from "axios";
export const getGeoCoordinatesByAddress = async (address) => {
    const { street1, street2, city, state, country, zipcode, countryCode } = address;
    const addressString = `${street1} ${street2} ${city} ${state} ${country} ${zipcode} ${countryCode}`;
    const coordinates = await getCoordinates(addressString);
    return coordinates;
};
const getCoordinates = async (addressString) => {
    try {
        const { data } = await axios(process.env.LOCATION_IQ_GEOCODE_URL, {
            params: {
                key: process.env.LOCATION_IQ_API_KEY,
                q: addressString,
                format: 'json',
            }
        });
        const { lat: latitude, lon: longitude } = data[0];
        const coordinates = { latitude, longitude };
        return coordinates || null;
    }
    catch (error) {
        console.log('Error getting coordinates: ', error);
        return null;
    }
};
export const getGeoAddressByCoordinates = async (coordinates) => {
    const { latitude, longitude } = coordinates;
    try {
        const { data } = await axios(process.env.LOCATION_IQ_REVERSE_GEOCODE_URL, {
            params: {
                key: process.env.LOCATION_IQ_API_KEY,
                lat: latitude,
                lon: longitude,
                format: 'json',
            }
        });
        const { address } = data;
        const formattedAddress = {
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
        };
        return formattedAddress;
    }
    catch (error) {
        console.log('Error getting address using coordinates: ', error);
        return null;
    }
};
//# sourceMappingURL=geo.js.map