import { type NextRequest } from 'next/server';

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /examples (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api/|_next/|app/_next/|_static/|examples/|[\\w-]+\\.\\w+).*)',
	],
};

export default async function middleware(req: NextRequest) {
	// const url = req.nextUrl.clone();
	// if (url.pathname === '/') {
	// 	url.pathname = '/dashboard';
	// 	return NextResponse.redirect(url);
	// }
}
