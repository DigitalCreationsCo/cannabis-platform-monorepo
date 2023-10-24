export const _orgUpsert = {
	id: '1',
	scheduleId: '1',
	subdomainId: 'curaleaf',
	name: 'Curaleaf',
	stripeAccountId: '1345',
	stripeOnboardingComplete: false,
	dialCode: '1',
	phone: '1232356456',
	addressId: '1',
	vendorId: '2',
	termsAccepted: false,
	address: {
		street1: '407 W Chest St',
		street2: '',
		city: 'Lancaster',
		state: 'Pennsylvania',
		zipcode: 17603,
		country: 'United States',
		countryCode: 'US',
		coordinates: {
			radius: 10000,
			latitude: 40.0411,
			longitude: -76.3133,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	},
	images: [
		{
			location:
				'https://mgmagazine.com/wp-content/uploads/2021/05/CURALEAF_logo_mg_Magazine_mgretailler-e1675120877801.jpg',
			blurhash: '',
		},
	],
	schedule: {
		days: 1234,
		openAt: 10,
		closeAt: 18,
	},
	products: [],
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const _orgFind = {
	id: '2',
};

export const _orgIdList = ['1', '2', '3'];

export const _orgList = [];

export const _orgWithStripeAccountId = {
	id: '234234',
	name: 'Alpha buzz3342',
	stripeAccountId: '123',
	address: {
		id: '123444',
		street1: '8282 4244 ave',
		street2: '',
		city: 'New York City',
		state: 'NY',
		zipcode: Number('02040'),
		country: 'United States',
		countryCode: 'US',
		coordinates: {
			addressId: '123444',
			latitude: 23.345,
			longitude: 45.0,
		},
		userId: '',
		organizationId: '234234',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	dialCode: '1',
	phone: '2597504690',
	email: 'dogdaysjune0a35sd20@gmail.com',
	vendorId: '2',
	termsAccepted: true,
	subdomainId: 'alphabuzz',
};
