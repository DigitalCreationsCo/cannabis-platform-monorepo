/* eslint-disable no-case-declarations */
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
	const pagesAllowOver21Only = ['/browse', '/checkout', '/support'];

	const url = req.nextUrl.clone();

	const over21 = req.cookies.get('yesOver21')?.value;
	const isSignupComplete = req.cookies.get('isSignUpComplete')?.value;

	if (url.pathname === '/browse' && isSignupComplete === 'false') {
		url.pathname = '/signup/create-account';
		return NextResponse.redirect(url);
	}

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

	if (url.pathname === '/signup/create-dispensary-account') {
		url.href = `${dashboardBaseUrl}/signup/create-dispensary-account/${url.search}`;
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}
