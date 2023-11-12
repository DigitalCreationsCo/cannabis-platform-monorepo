import {
	type USStateAbbreviated,
	type Address,
	type Country,
	type CountryCode,
} from '@prisma/client';

export type AddressCreateType = {
	id?: string;
	street1: string;
	street2: string | null;
	city: string;
	state: USStateAbbreviated | null;
	zipcode: number;
	country: Country;
	countryCode: CountryCode;
	coordinateId?: string;
	coordinates?: CoordinatesCreateType;
	userId?: string | undefined;
	organizationId?: string | undefined;
};

export type AddressUserCreateType = {
	id?: string;
	street1: string;
	street2: string | null;
	city: string;
	state: USStateAbbreviated;
	zipcode: number;
	country: Country;
	countryCode: CountryCode;
	coordinateId?: string;
	coordinates?: CoordinatesCreateType;
	userId?: string | undefined;
	// ^ userId used to connect with user
};

export type CoordinatesCreateType = {
	id?: string;
	latitude: number;
	longitude: number;
	radius?: number | null;
	driverId?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
};

export type AddressWithCoordinates = Address & {
	coordinates: CoordinatesCreateType | null;
};

export type AddressPayload = {
	street1: string;
	street2: string | null;
	city: string;
	state: USStateAbbreviated;
	zipcode: number;
	country: Country;
	countryCode: CountryCode;
	coordinates?: { radius?: number; latitude: number; longitude: number };
};
