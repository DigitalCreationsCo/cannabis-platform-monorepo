import { type Address, type Coordinates } from '@prisma/client';

export type AddressCreateType = {
	id?: string;
	street1: string;
	street2: string | null;
	city: string;
	state: string;
	zipcode: number;
	country: string;
	countryCode: string | null;
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
	state: string;
	zipcode: number;
	country: string;
	countryCode: string | null;
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
	coordinates: Coordinates | null;
};

export type AddressPayload = {
	street1: string;
	street2: string | null;
	city: string;
	state: string;
	zipcode: number;
	country: string;
	countryCode: string | null;
	coordinates?: { radius?: number; latitude: number; longitude: number };
};
