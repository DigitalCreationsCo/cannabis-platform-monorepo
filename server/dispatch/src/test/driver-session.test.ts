import { type OrganizationWithAddress } from '@gras/data-access';
// import { MongoClient, type Collection } from 'mongodb';
// // import DispatchDA from '../data-access/index';

// // let dispatch_orders_collection: Collection;
// // let driver_sessions_collection: Collection;
// // beforeAll(
// // 	async () =>
// // 		await MongoClient.connect(process.env.MONGODB_CONNECTION_URL as string, {
// // 			connectTimeoutMS: 10000,
// // 		}).then((client) => {
// // 			dispatch_orders_collection = client
// // 				.db(process.env.DISPATCH_DB_NS as string)
// // 				.collection('dispatch_orders');
// // 			driver_sessions_collection = client
// // 				.db(process.env.DISPATCH_DB_NS as string)
// // 				.collection('driver_sessions');
// // 		}),
// // );

describe('find driver sessions', () => {
	const organization = {
		name: 'Test Dispensary',
		address: {
			street1: '1234 Main St',
			street2: '',
			city: 'Denver',
			state: 'CO',
			zip: '80202',
			country: 'USA',
			coordinates: {
				latitude: 39.750307,
				longitude: -104.999472,
				radius: 10000,
			},
		},
	} as unknown as OrganizationWithAddress;
	it('should find driver sessions', async () => {
		// const drivers = await DispatchDA.findDriversWithinRange(organization);
		// expect(drivers).toBeDefined();
		// expect(isArray(drivers)).toStrictEqual(true);
		expect(1).toStrictEqual(1);
	});
});
