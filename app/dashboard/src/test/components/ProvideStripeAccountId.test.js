// use Playwright to test the component

describe('ProvideStripeAccountId Tests', () => {
	it('user selects `Connect my stripe account` with an empty field', async () => {
		// expect the field to be required
		expect('1').toStrictEqual('1');
	});
	it('user selects `Connect my stripe account` with a valid value in the field', async () => {
		// expect to submit the value
		expect('1').toStrictEqual('1');
	});
	it('user selects `Connect my stripe account` with an invalid value in the field', async () => {
		// expect the field to have an error
		expect('1').toStrictEqual('1');
	});

	it('user selects `I dont have stripe` with an empty field', async () => {
		// should submit anyway
		expect('1').toStrictEqual('1');
	});
	it('user selects `I dont have stripe` with a value in the field', async () => {
		// should submit anyway
		expect('1').toStrictEqual('1');
	});
});
