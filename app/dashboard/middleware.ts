import micromatch from 'micromatch';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import env from './lib/env';

// Add routes that don't require authentication
const unAuthenticatedRoutes = [
	'/',
	'/404',
	'/500',

	// API routes
	'/api/hello',
	'/api/health',
	'/api/robots',
	'/api/auth/**',
	'/api/oauth/**',
	'/api/scim/v2.0/**',
	'/api/invitations/*',
	'/api/webhooks/stripe',
	'/api/webhooks/dsync',
	'/auth/**',

	// public API routes
	'/api/dispensaries/*/customers/add_sms_subscribe',
	'/api/dispensaries/*/customers/remove_sms_subscribe',

	'/sitemap.xml',
	'/robots.txt',

	'/invitations/*',
	'/terms-condition',
	'/unlock-account',
	'/login/saml',
	'/terms',
	'/privacy',
	'/about-gras',
];

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// redirect to login
	if (pathname === '/') {
		const redirectUrl = new URL('/auth/login', req.url);
		return NextResponse.redirect(redirectUrl);
	}

	// Bypass routes that don't require authentication
	if (micromatch.isMatch(pathname, unAuthenticatedRoutes)) {
		console.info('Bypassing auth middleware for', pathname);
		return NextResponse.next();
	}

	const redirectUrl = new URL('/auth/login', req.url);
	redirectUrl.searchParams.set('callbackUrl', encodeURI(req.url));

	// JWT strategy
	if (env.nextAuth.sessionStrategy === 'jwt') {
		const token = await getToken({
			req,
		});

		if (!token) {
			return NextResponse.redirect(redirectUrl);
		}
	}

	// Database strategy
	else if (env.nextAuth.sessionStrategy === 'database') {
		const url = new URL('/api/auth/session', req.url);

		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				cookie: req.headers.get('cookie') || '',
			},
		});

		const session = await response.json();

		if (!session.user) {
			return NextResponse.redirect(redirectUrl);
		}
	}

	// All good, let the request through
	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|api/auth/session).*)',
		'/',
		// '/((?!_next/static|_next/image|favicon.ico|api/auth/session).*)|^/$',
	],
};
