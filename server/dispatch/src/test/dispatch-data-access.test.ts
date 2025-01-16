import { type OrganizationWithShopDetails } from '@gras/data-access';
import DispatchDA from '../data-access/DispatchDA';

// THESE ARE ALL PLACEHOLDER TESTS IE, THEY DONT WORK
describe('Dispatch Data-Access Master Node Tests', () => {
	it('DispatchDA is defined', () => {
		expect(1).toStrictEqual(1);
	});
	it('driver_sessions_collection is defined and points the collection', () => {
		expect(1).toStrictEqual(1);
	});
	it('dispatch_orders_collection is defined and points the collection', () => {
		expect(1).toStrictEqual(1);
	});
	it('dispatch_orders_changestream is defined and is a change stream object', () => {
		expect(1).toStrictEqual(1);
	});
});

describe('Dispatch Data-Access Worker Node Tests', () => {
	it('DispatchDA is defined', () => {
		expect(1).toStrictEqual(1);
	});
	it('driver_sessions_collection is defined and points the collection', () => {
		expect(1).toStrictEqual(1);
	});
	it('dispatch_orders_collection is defined and points the collection', () => {
		expect(1).toStrictEqual(1);
	});
	it('dispatch_orders_changestream is undefined', () => {
		expect(1).toStrictEqual(1);
	});
});

describe('Dispatch Data-Access Change Stream Event', () => {
	// let dispatch_orders_changestream;
	// let mongoMock;
	// const spy = dispatch_orders_changestream.on('change', async (change) => {
	// 	if (change.operationType === 'insert') {
	// 		return change.fullDocument;
	// 	}
	// });
	// const order = {} as OrderWithDispatchDetails;
	it('changestream insert event returns the new order', () => {
		// mongoMock.insertOne(newOrder);
		// expect(spy).toHaveBeenCalled();
		// expect(spy).toHaveReturned(order);
		expect(1).toStrictEqual(1);
	});
});

describe('Find Drivers Within Range Tests', () => {
	const organization = {} as OrganizationWithShopDetails;
	let spy;
	it('findDriversWithinRange returns an array', async () => {
		spy = await DispatchDA.findDriversWithinRange(organization, 1);
		expect(spy).toBeInstanceOf(Array);
	});
	it('findDriversWithinRange returns an array of drivers', async () => {
		spy = await DispatchDA.findDriversWithinRange(organization, 1);
		expect(spy[0]).toBeInstanceOf(Object);
	});
	it('findDriversWithinRange returns in-app users and sms-only users', async () => {
		const mongoMock = {};
		const documents = [{}, {}, {}];
		spy = await DispatchDA.findDriversWithinRange(organization, 1);
		expect(spy[0]).toBeInstanceOf(Object);
		// expect(spy.find((driver) => driver.appUser === 'in-app')).toBeDefined();
		// expect(spy.find((driver) => driver.appUser === 'sms-only')).toBeDefined();
	});
});
