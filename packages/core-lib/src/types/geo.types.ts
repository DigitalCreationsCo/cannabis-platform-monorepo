/* eslint-disable @typescript-eslint/naming-convention */
export type StateMap = Record<
	string,
	{ abbreviation: StateAbbreviationType; legalAge: number }
>;

export const stateMap: StateMap = {
	ALABAMA: { abbreviation: 'AL', legalAge: 21 },
	ALASKA: { abbreviation: 'AK', legalAge: 21 },
	ARIZONA: { abbreviation: 'AZ', legalAge: 21 },
	ARKANSAS: { abbreviation: 'AR', legalAge: 21 },
	CALIFORNIA: { abbreviation: 'CA', legalAge: 21 },
	COLORADO: { abbreviation: 'CO', legalAge: 21 },
	CONNECTICUT: { abbreviation: 'CT', legalAge: 21 },
	DELAWARE: { abbreviation: 'DE', legalAge: 21 },
	FLORIDA: { abbreviation: 'FL', legalAge: 21 },
	GEORGIA: { abbreviation: 'GA', legalAge: 21 },
	HAWAII: { abbreviation: 'HI', legalAge: 21 },
	IDAHO: { abbreviation: 'ID', legalAge: 21 },
	ILLINOIS: { abbreviation: 'IL', legalAge: 21 },
	INDIANA: { abbreviation: 'IN', legalAge: 21 },
	IOWA: { abbreviation: 'IA', legalAge: 21 },
	KANSAS: { abbreviation: 'KS', legalAge: 21 },
	KENTUCKY: { abbreviation: 'KY', legalAge: 21 },
	LOUISIANA: { abbreviation: 'LA', legalAge: 21 },
	MAINE: { abbreviation: 'ME', legalAge: 21 },
	MARYLAND: { abbreviation: 'MD', legalAge: 21 },
	MASSACHUSETTS: { abbreviation: 'MA', legalAge: 21 },
	MICHIGAN: { abbreviation: 'MI', legalAge: 21 },
	MINNESOTA: { abbreviation: 'MN', legalAge: 21 },
	MISSISSIPPI: { abbreviation: 'MS', legalAge: 21 },
	MISSOURI: { abbreviation: 'MO', legalAge: 21 },
	MONTANA: { abbreviation: 'MT', legalAge: 21 },
	NEBRASKA: { abbreviation: 'NE', legalAge: 21 },
	NEVADA: { abbreviation: 'NV', legalAge: 21 },
	'NEW HAMPSHIRE': { abbreviation: 'NH', legalAge: 21 },
	'NEW JERSEY': { abbreviation: 'NJ', legalAge: 21 },
	'NEW MEXICO': { abbreviation: 'NM', legalAge: 21 },
	'NEW YORK': { abbreviation: 'NY', legalAge: 21 },
	'NORTH CAROLINA': { abbreviation: 'NC', legalAge: 21 },
	'NORTH DAKOTA': { abbreviation: 'ND', legalAge: 21 },
	OHIO: { abbreviation: 'OH', legalAge: 21 },
	OKLAHOMA: { abbreviation: 'OK', legalAge: 21 },
	OREGON: { abbreviation: 'OR', legalAge: 21 },
	PENNSYLVANIA: { abbreviation: 'PA', legalAge: 21 },
	'RHODE ISLAND': { abbreviation: 'RI', legalAge: 21 },
	'SOUTH CAROLINA': { abbreviation: 'SC', legalAge: 21 },
	'SOUTH DAKOTA': { abbreviation: 'SD', legalAge: 21 },
	TENNESSEE: { abbreviation: 'TN', legalAge: 21 },
	TEXAS: { abbreviation: 'TX', legalAge: 21 },
	UTAH: { abbreviation: 'UT', legalAge: 21 },
	VERMONT: { abbreviation: 'VT', legalAge: 21 },
	VIRGINIA: { abbreviation: 'VA', legalAge: 21 },
	WASHINGTON: { abbreviation: 'WA', legalAge: 21 },
	'WEST VIRGINIA': { abbreviation: 'WV', legalAge: 21 },
	WISCONSIN: { abbreviation: 'WI', legalAge: 21 },
	WYOMING: { abbreviation: 'WY', legalAge: 21 },
};

export const USStates = [
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
export type USStateType = typeof USStates[number];

export const StatesAbbreviation = [
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
export type StateAbbreviationType = typeof StatesAbbreviation[number];
