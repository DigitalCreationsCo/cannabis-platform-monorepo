/* eslint-disable sonarjs/no-duplicate-string */
export const _userCreate = {
	email: 'Bmejia220@gmail.com',
	username: 'Big Chief',
	firstName: 'Bryant',
	lastName: 'Mejia',
	address: {
		street1: '819 222 st',
		street2: '',
		city: 'New York',
		state: 'NY',
		zipcode: '01294',
		country: 'United States',
		countryCode: 'US',
	},
	dialCode: '1',
	phone: '2013589648',
	emailVerified: false,
	passwordHash: undefined,
	termsAccepted: true,
	imageUser: null,
	is_legal_age: true,
	id_verified: true,
	memberships: [],
};

export const _incompleteUserCreate = {
	email: 'Bmejia220@gmail.com',
	username: 'Big Chief',
	firstName: 'Bryant',
	lastName: 'Mejia',
	address: {
		street1: '819 222 st',
		street2: '',
		city: 'New York',
		state: 'NY',
		countryCode: 'US',
	},
	dialCode: '1',
	phone: '2013589648',
	emailVerified: false,
	id_verified: true,
	memberships: [],
};

export const _userAdminCreatePayload = {
	user: {
		email: 'Bmejia220@gmail.com',
		username: 'Big Chief',
		firstName: 'Bryant',
		lastName: 'Mejia',
		address: {
			street1: '819 222 st',
			street2: '',
			city: 'New York',
			state: 'NY',
			zipcode: '01294',
			country: 'United States',
			countryCode: 'US',
		},
		dialCode: '1',
		phone: '2013589648',
		emailVerified: false,
		termsAccepted: true,
		imageUser: null,
		is_legal_age: true,
		id_verified: true,
		memberships: [],
	},
	role: 'OWNER',
	dispensaryId: 'bfhk6k4u7xq030rz7wvgiwao',
};
