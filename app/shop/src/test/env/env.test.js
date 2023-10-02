describe('Env vars are valid', () => {
	const ENV = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...ENV };
	});

	afterAll(() => {
		process.env = ENV;
	});

	it('Shop app url', () => {
		expect(process.env.NEXT_PUBLIC_SHOP_APP_URL).toStrictEqual(
			'http://localhost:3002',
		);
	});
	it('Checkout success url', () => {
		expect(process.env.NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL).toStrictEqual(
			'http://localhost:3002/checkout/success',
		);
	});
});
