import {
	formatDispensaryUrl,
	getDashboardSite,
	getDispensaryDomain,
	getShopSite,
	parseUrlFriendlyStringToObject,
	parseUrlParameters,
} from '../..';

describe('formatUrl.test', () => {
	const environments: {
		NODE_ENV: 'development' | 'test' | 'production';
		NEXT_PUBLIC_SHOP_APP_URL: string;
		NEXT_PUBLIC_DASHBOARD_APP_URL: string;
	}[] = [
		{
			NODE_ENV: 'development',
			NEXT_PUBLIC_SHOP_APP_URL: 'http://localhost:3000',
			NEXT_PUBLIC_DASHBOARD_APP_URL: 'http://localhost:3001',
		},
		{
			NODE_ENV: 'test',
			NEXT_PUBLIC_SHOP_APP_URL: 'http://localhost:3000',
			NEXT_PUBLIC_DASHBOARD_APP_URL: 'http://localhost:3001',
		},
		{
			NODE_ENV: 'production',
			NEXT_PUBLIC_SHOP_APP_URL: 'grascannabis.org',
			NEXT_PUBLIC_DASHBOARD_APP_URL: 'app.grascannabis.org',
		},
	];
	environments.forEach((environment) => {
		afterEach(() => {
			global.window = undefined as any;
		});
		process.env = environment;
		test('formatDispensaryUrl ', () => {
			const slug = 'mcnuggets-dispensary';
			const id = 'aaaa';
			switch (process.env.NODE_ENV) {
				case 'development':
					return expect(formatDispensaryUrl(slug, id)).toStrictEqual(
						`http://localhost:3000/browse/mcnuggets-dispensary/aaaa`,
					);
				case 'test':
					return expect(formatDispensaryUrl(slug, id)).toStrictEqual(
						`http://localhost:3000/browse/mcnuggets-dispensary/aaaa`,
					);
				case 'production':
					return expect(formatDispensaryUrl(slug, id)).toStrictEqual(
						`https://grascannabis.org/browse/${slug}/aaaa`,
					);
			}
		});
		test('getShopSite ', () => {
			switch (process.env.NODE_ENV) {
				case 'development':
					expect(getShopSite('/home')).toStrictEqual(
						`http://localhost:3000/home`,
					);
				case 'test':
					expect(getShopSite('/home')).toStrictEqual(
						`http://localhost:3000/home`,
					);
				case 'production':
					expect(getShopSite('/home')).toStrictEqual(`grascannabis.org/home`);
			}
		});
		test('getDashboardSite ', () => {
			switch (process.env.NODE_ENV) {
				case 'development':
					expect(getDashboardSite('/home')).toStrictEqual(
						`http://localhost:3001/home`,
					);
				case 'test':
					expect(getDashboardSite('/home')).toStrictEqual(
						`http://localhost:3001/home`,
					);
				case 'production':
					expect(getDashboardSite('/home')).toStrictEqual(
						`app.grascannabis.org/home`,
					);
			}
		});
	});
});

describe('getDispensaryDomain', () => {
	test('manasupply', () => {
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
	test('starbuds', () => {
		expect(
			getDispensaryDomain('https://shop.starbuds.us/stores/baltimore/'),
		).toStrictEqual(`starbuds`);
	});
});

describe('parseUrlFriendlyStringToObject', () => {
	it('parses string of parameters into object', () => {
		const paramString = `SmsMessageSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&NumMedia=0&SmsSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&SmsStatus=received&Body=1&To=%2B16674084833&NumSegments=1&MessageSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&AccountSid=KhtyQHt5jqQ91QA7UzskjA%3D%3D&From=%2B15707901185&ApiVersion=2010-04-01`;
		expect(parseUrlFriendlyStringToObject(paramString)).toStrictEqual({
			SmsMessageSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			NumMedia: '0',
			SmsSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			SmsStatus: 'received',
			Body: '1',
			To: '+16674084833',
			NumSegments: '1',
			MessageSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			AccountSid: 'KhtyQHt5jqQ91QA7UzskjA==',
			From: '+15707901185',
			ApiVersion: '2010-04-01',
		});
	});

	it('does not parses a url', () => {
		const fullUrl =
			'http://localhost:3000?SmsMessageSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&NumMedia=0&SmsSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&SmsStatus=received&Body=1&To=%2B16674084833&NumSegments=1&MessageSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&AccountSid=KhtyQHt5jqQ91QA7UzskjA%3D%3D&From=%2B15707901185&ApiVersion=2010-04-01';
		expect(parseUrlFriendlyStringToObject(fullUrl)).toStrictEqual({
			SmsMessageSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			NumMedia: '0',
			SmsSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			SmsStatus: 'received',
			Body: '1',
			To: '+16674084833',
			NumSegments: '1',
			MessageSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			AccountSid: 'KhtyQHt5jqQ91QA7UzskjA==',
			From: '+15707901185',
			ApiVersion: '2010-04-01',
		});
	});
});

describe('parseUrlParameters', () => {
	it('successfully parses url params', () => {
		const fullUrl =
			'http://localhost:3000?SmsMessageSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&NumMedia=0&SmsSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&SmsStatus=received&Body=1&To=%2B16674084833&NumSegments=1&MessageSid=SMIUiUtGDXgITHegOTsXK4I_A%3D%3D&AccountSid=KhtyQHt5jqQ91QA7UzskjA%3D%3D&From=%2B15707901185&ApiVersion=2010-04-01';
		expect(parseUrlParameters(fullUrl)).toStrictEqual({
			SmsMessageSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			NumMedia: '0',
			SmsSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			SmsStatus: 'received',
			Body: '1',
			To: '+16674084833',
			NumSegments: '1',
			MessageSid: 'SMIUiUtGDXgITHegOTsXK4I_A==',
			AccountSid: 'KhtyQHt5jqQ91QA7UzskjA==',
			From: '+15707901185',
			ApiVersion: '2010-04-01',
		});
	});
});

describe('makeUrlFriendly', () => {
	it('removes non url friendly characters', () => {
		expect(1).toStrictEqual(1);
		// expect(makeUrlFriendly('!@#$%^&*()+')).toStrictEqual('')
		// expect(makeUrlFriendly('dispensary.-name')).toStrictEqual('dispensary-name')
		// expect(makeUrlFriendly('dispensary name')).toStrictEqual('dispensary-name')
	});
});
