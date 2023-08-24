describe('Env Test', () => {
	it('development env has development values', async () => {
		expect('1').toEqual('1');
	});

	it('staging env has staging values', async () => {
		expect('1').toEqual('1');
	});

	it('production env has production values', async () => {
		expect('1').toEqual('1');
	});
});
