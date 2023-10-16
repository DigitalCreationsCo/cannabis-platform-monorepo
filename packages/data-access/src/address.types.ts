import { type Address } from '@prisma/client';

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
	coordinates: CoordinatesCreateType | null;
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

export const USStatesList = [
	'ALABAMA',
	'ALASKA',
	'ARIZONA',
	'ARKANSAS',
	'CALIFORNIA',
	'COLORADO',
	'CONNECTICUT',
	'DELAWARE',
	'FLORIDA',
	'GEORGIA',
	'HAWAII',
	'IDAHO',
	'ILLINOIS',
	'INDIANA',
	'IOWA',
	'KANSAS',
	'KENTUCKY',
	'LOUISIANA',
	'MAINE',
	'MARYLAND',
	'MASSACHUSETTS',
	'MICHIGAN',
	'MINNESOTA',
	'MISSISSIPPI',
	'MISSOURI',
	'MONTANA',
	'NEBRASKA',
	'NEVADA',
	'NEW HAMPSHIRE',
	'NEW JERSEY',
	'NEW MEXICO',
	'NEW YORK',
	'NORTH CAROLINA',
	'NORTH DAKOTA',
	'OHIO',
	'OKLAHOMA',
	'OREGON',
	'PENNSYLVANIA',
	'RHODE ISLAND',
	'SOUTH CAROLINA',
	'SOUTH DAKOTA',
	'TENNESSEE',
	'TEXAS',
	'UTAH',
	'VERMONT',
	'VIRGINIA',
	'WASHINGTON',
	'WEST VIRGINIA',
	'WISCONSIN',
	'WYOMING',
];

export const StatesAbbreviationList = [
	'AL',
	'AK',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'FL',
	'GA',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'OH',
	'OK',
	'OR',
	'PA',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY',
];
