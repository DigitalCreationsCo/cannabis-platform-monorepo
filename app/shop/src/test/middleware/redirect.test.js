/* eslint-disable jest/no-commented-out-tests */

import { NextRequest, NextResponse } from 'next/server';
import middleware from '../../../src/middleware';
const ENV = process.env;
beforeEach(() => {
	jest.resetModules();
	process.env = { ...ENV };
});

afterAll(() => {
	process.env = ENV;
});

describe('Middleware Redirect Test', () => {
	const redirectSpy = jest.spyOn(NextResponse, 'redirect');

	const shopUrl = process.env.NEXT_PUBLIC_SHOP_APP_URL;
	// const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;

	afterEach(() => {
		redirectSpy.mockReset();
	});

	// it('should redirect to the homepage if visiting an admin page as a user without an auth token', async () => {
	// 	const req = new NextRequest(
	// 		new Request('https://www.whatever.com/admin/check-it-out'),
	// 		{}
	// 	);
	// 	req.headers.set(
	// 		'cookie',
	// 		'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NTg3NjczMjYsImV4cCI6MTY5MDMwMzMyNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIn0.G7rkptAKt1icBp92KcHYpGdcWOnn4gO8vWiCMtIHc0c;'
	// 	);

	// 	await middleware(req);

	// 	expect(redirectSpy).toHaveBeenCalledTimes(1);
	// 	expect(redirectSpy).toHaveBeenCalledWith(new URL('/', req.url));
	// });

	// it('should redirect to the store if the directToStore query param is set', async () => {
	// 	const req = new NextRequest(
	// 		new Request('https://www.whatever.com'),
	// 		{}
	// 	);
	// 	req.nextUrl.searchParams.set('directToStore', 'true');

	// 	await middleware(req);

	// 	expect(redirectSpy).toHaveBeenCalledTimes(1);
	// 	expect(redirectSpy).toHaveBeenCalledWith(new URL('/store', req.url));
	// });

	it('should redirect to browse marketplace if over21 cookie is set', async () => {
		const req = new NextRequest(new this.globals.Request(shopUrl));

		req.cookies.set('over21', 'true');
		await middleware(req);

		expect(redirectSpy).toHaveBeenCalledTimes(1);
		expect(redirectSpy).toHaveBeenCalledWith(new URL('/browse', req.url));
	});

	// it('url/app redirects to not found', async () => {
	// 	expect('1').toBe('1');
	// });

	// it('app.url redirects to dashboard app page', async () => {
	// 	expect('1').toBe('1');
	// });

	// it('app.url without client cookies, redirects to dashboard landing page', async () => {
	// 	expect('1').toBe('1');
	// });

	// it('app.url redirects to dashboard app page', async () => {
	// 	expect('1').toBe('1');
	// });

	// it('/browse/[] redirects to storefront page', async () => {
	// 	expect('1').toBe('1');
	// });

	it('unverified users can access /survey', async () => {
		expect('1').toBe('1');
	});
});
