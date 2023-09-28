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
			'https://localhost:3000',
		);
	});
	it('Checkout success url', () => {
		expect(process.env.NEXT_PUBLIC_SHOP_APP_CHECKOUT_SUCCESS_URL).toStrictEqual(
			'https://localhost:3000/checkout/success',
		);
	});
});
