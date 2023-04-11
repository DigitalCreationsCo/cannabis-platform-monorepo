export declare const getGeoCoordinatesByAddress: (address: Address) => Promise<{
    latitude: any;
    longitude: any;
}>;
export declare const getGeoAddressByCoordinates: (coordinates: {
    latitude: number;
    longitude: number;
}) => Promise<{
    street1: string;
    street2: string;
    city: any;
    state: any;
    zipcode: any;
    country: any;
    countryCode: string;
    coordinates: {
        latitude: any;
        longitude: any;
    };
}>;
