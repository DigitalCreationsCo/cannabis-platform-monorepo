import {
	formatDispensaryUrl,
	getDashboardSite,
	getShopSite,
} from '../../src/utils/url.util';

describe('formatUrt.test', () => {
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
			const subdomainId = 'mcnuggets-dispensary';
			switch (process.env.NODE_ENV) {
				case 'development':
					return expect(formatDispensaryUrl(subdomainId)).toEqual(
						`http://${subdomainId}.localhost:3000`,
					);
				case 'test':
					return expect(formatDispensaryUrl(subdomainId)).toEqual(
						`http://${subdomainId}.localhost:3000`,
					);
				case 'production':
					return expect(formatDispensaryUrl(subdomainId)).toEqual(
						`https://grascannabis.org/browse/${subdomainId}`,
					);
			}
		});

		test('getShopSite ', () => {
			switch (process.env.NODE_ENV) {
				case 'development':
					expect(getShopSite('/home')).toEqual(`http://localhost:3000/home`);
				case 'test':
					expect(getShopSite('/home')).toEqual(`http://localhost:3000/home`);
				case 'production':
					expect(getShopSite('/home')).toEqual(`grascannabis.org/home`);
			}
		});

		test('getDashboardSite ', () => {
			switch (process.env.NODE_ENV) {
				case 'development':
					expect(getDashboardSite('/home')).toEqual(
						`http://localhost:3001/home`,
					);
				case 'test':
					expect(getDashboardSite('/home')).toEqual(
						`http://localhost:3001/home`,
					);
				case 'production':
					expect(getDashboardSite('/home')).toEqual(
						`app.grascannabis.org/home`,
					);
			}
		});
	});
});
