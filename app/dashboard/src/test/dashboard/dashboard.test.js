// TODO: need end to end tests for data fetching
// typechecking test for data fetching
// sanity check for data fetching - (is the data what we expect?)
// dom testing - (is the dom what we expect?)
// do components receive the data they are expecting?
// write unit tests first for most coverage, then E2E

describe('Dashboard Tests', () => {
	it('organization name is shown', async () => {
		expect('1').toStrictEqual('1');
	});
	it('user first name is shown', async () => {
		expect('1').toStrictEqual('1');
	});
	it(`Today's Orders is accurate`, async () => {
		expect('1').toStrictEqual('1');
	});
	it(`Low Stock Variants is populated`, async () => {
		expect('1').toStrictEqual('1');
	});
	it(`Products is populated`, async () => {
		expect('1').toStrictEqual('1');
	});
	it(`Orders is populated`, async () => {
		expect('1').toStrictEqual('1');
	});

	// extract this to a component test file
	it(`Recent Orders row is populated`, async () => {
		expect('1').toStrictEqual('1');
	});

	// extract this to a component test file
	it(`Products Row is populated`, async () => {
		expect('1').toStrictEqual('1');
	});
});

// PLACEHOLDER
describe('Dashboard href tests', () => {
	it('dashboard organization is shown when user state is loaded, and organizationid is in the href', () => {
		expect('1').toStrictEqual('1');
	});
	it('dashboard returns to signin page is shown when user state is not loaded', () => {
		expect('1').toStrictEqual('1');
	});
});
