import { NextResponse, type NextRequest } from 'next/server';

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /examples (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api/|_next/|_next/static|_next/image|favicon.ico|_static/|examples/|[\\w-]+\\.\\w+).*)',
	],
};

const dashboardBaseUrl =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'https://app.grascannabis.org';

// eslint-disable-next-line sonarjs/cognitive-complexity
export default async function middleware(req: NextRequest) {
	const subdomain =
		req.headers.get('host')?.split('.')[0].split(':')[0] || 'localhost';

	const pagesAllowOver21Only = ['/browse', '/checkout', '/support'];

	let url;
	switch (true) {
		case subdomain === 'www':
			console.info('middleware detected: www');
			url = req.nextUrl.clone();
			url.host = url.host.replace('www.', '');
			return NextResponse.redirect(url.host);
			break;

		case subdomain === 'app':
			console.info('middleware detected: app path');
			url = req.nextUrl.clone();
			return NextResponse.redirect(dashboardBaseUrl);
			break;

		case subdomain === 'localhost' || subdomain === 'grascannabis':
			console.info('middleware detected: shop path');
			url = req.nextUrl.clone();

			// eslint-disable-next-line no-case-declarations
			const over21 = req.cookies.get('yesOver21')?.value;
			// base url redirect to /browse if over21
			if (url.pathname === '/' && over21 === 'true') {
				url.pathname = '/browse';
				return NextResponse.redirect(url);
			}

			// redirect under21 to homepage
			if (pagesAllowOver21Only.includes(url.pathname) && over21 !== 'true') {
				url.pathname = '/';
				return NextResponse.redirect(url);
			}
			return NextResponse.next();
			break;

		default:
			return NextResponse.next();
	}
}
