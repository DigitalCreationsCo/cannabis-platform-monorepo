import { getDispensaryDomain } from '@cd/core-lib';

describe('getDispensaryDomain', () => {
	it('localhost', () => {
		expect(getDispensaryDomain('localhost:9000')).toBeNull();
	});
	it('manasupply', () => {
		expect(getDispensaryDomain('manasupply.com')).toStrictEqual(`manasupply`);
		expect(getDispensaryDomain('www.manasupply.com')).toStrictEqual(
			`manasupply`,
		);
		expect(getDispensaryDomain('https://manasupply.com')).toStrictEqual(
			`manasupply`,
		);
		expect(getDispensaryDomain('https://www.manasupply.com')).toStrictEqual(
			`manasupply`,
		);
		expect(
			getDispensaryDomain(
				'https://manasupply.com/shop/edgewater-maryland/?dtche%5Bpath%5D=checkout',
			),
		).toStrictEqual(`manasupply`);
	});
	it('starbuds', () => {
		expect(
			getDispensaryDomain('https://shop.starbuds.us/stores/baltimore/'),
		).toStrictEqual(`starbuds`);
	});
});
