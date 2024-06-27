/* eslint-disable @typescript-eslint/naming-convention */

export type CountryCode =
	| 'US'
	| 'CA'
	| 'GB'
	| 'AU'
	| 'DE'
	| 'FR'
	| 'NL'
	| 'IE'
	| 'NZ'
	| 'OTHER';

export type Country =
	| 'United States'
	| 'Canada'
	| 'United Kingdom'
	| 'Australia'
	| 'Germany'
	| 'France'
	| 'Netherlands'
	| 'Ireland'
	| 'New Zealand'
	| 'Other';

export type USStateAbbreviated =
	| 'AL'
	| 'AK'
	| 'AZ'
	| 'AR'
	| 'CA'
	| 'CO'
	| 'CT'
	| 'DE'
	| 'FL'
	| 'GA'
	| 'HI'
	| 'ID'
	| 'IL'
	| 'IN'
	| 'IA'
	| 'KS'
	| 'KY'
	| 'LA'
	| 'ME'
	| 'MD'
	| 'MA'
	| 'MI'
	| 'MN'
	| 'MS'
	| 'MO'
	| 'MT'
	| 'NE'
	| 'NV'
	| 'NH'
	| 'NJ'
	| 'NM'
	| 'NY'
	| 'NC'
	| 'ND'
	| 'OH'
	| 'OK'
	| 'OR'
	| 'PA'
	| 'RI'
	| 'SC'
	| 'SD'
	| 'TN'
	| 'TX'
	| 'UT'
	| 'VT'
	| 'VA'
	| 'WA'
	| 'WV'
	| 'WI'
	| 'WY';

export interface Address {
	id?: string;
	street1: string;
	street2: string | null;
	city: string;
	state: USStateAbbreviated | null;
	zipcode: string;
	country: string;
	countryCode: CountryCode;
	coordinateId?: string;
	coordinates?: CoordinatesCreateType;
	userId?: string | undefined;
	organizationId?: string | undefined;
}

export interface AddressCreateType {
	id?: string;
	street1: string;
	street2: string | null;
	city: string;
	state: USStateAbbreviated | null;
	zipcode: string;
	country: Country;
	countryCode: CountryCode;
	coordinateId?: string;
	coordinates?: CoordinatesCreateType;
	userId?: string | undefined;
	organizationId?: string | undefined;
}

export interface AddressUserCreateType {
	id?: string;
	street1: string;
	street2: string | null;
	city: string;
	state: USStateAbbreviated;
	zipcode: string;
	country: Country;
	countryCode: CountryCode;
	coordinateId?: string;
	coordinates?: CoordinatesCreateType;
	userId?: string | undefined;
	// ^ userId used to connect with user
}

export interface CoordinatesCreateType {
	id?: string;
	latitude: number;
	longitude: number;
	radius?: number | null;
	driverId?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export type AddressWithCoordinates = Address & {
	coordinates: CoordinatesCreateType | null;
};

export interface AddressPayload {
	street1: string;
	street2: string | null;
	city: string;
	state: USStateAbbreviated;
	zipcode: string;
	country: Country;
	countryCode: CountryCode;
	coordinates?: { radius?: number; latitude: number; longitude: number };
}

export type Coordinates = [number, number];
