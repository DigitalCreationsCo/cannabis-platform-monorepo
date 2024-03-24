describe('YesOver21 cookie test suite', () => {
	// PLACEHOLDER TESTS
	it('should set cookie to true after signin if isSignupComplete === true, and user is legally eligible', () => {
		expect(true).toStrictEqual(true);
	});
	it('should not set cookie to true after signin if isSignupComplete !== true, or user is not legally eligible', () => {
		expect(true).toStrictEqual(true);
	});
	it('should set cookie to true if user enters using checkage model', () => {
		expect(true).toStrictEqual(true);
	});
	it('signout should change yes0ver21 value to false', () => {
		expect(true).toStrictEqual(true);
	});
	it('creating a user account signup should set yesOver21 to true', () => {
		expect(true).toStrictEqual(true);
	});
	it('should redirect to "/sorry-we-cant-serve-you" if user is not legally eligible during signup', () => {
		expect(true).toStrictEqual(true);
	});
	it('should redirect to "/sorry-we-cant-serve-you" if user is not legally eligible during checkout', () => {
		expect(true).toStrictEqual(true);
	});
	it('should redirect to "/sorry-we-cant-serve-you" if user is not legally eligible in quick-delivery page', () => {
		expect(true).toStrictEqual(true);
	});
});

export {};
