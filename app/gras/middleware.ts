/* eslint-disable sonarjs/no-duplicate-string */
import { getCookie } from 'cookies-next';
import micromatch from 'micromatch';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import env from './lib/env';

const matchers = {
	// '/((?!_next/static|_next/image|favicon.ico|api/auth/session).*)',
	// '/',
	// '/((?!_next/static|_next/image|favicon.ico|api/auth/session).*)|^/$',
	pageRoute: '/((?!_next/static|_next/image|favicon.ico|api).*)|^/',
};

// Add routes that don't require authentication
const unAuthenticatedRoutes = [
	'/',
	'/404',
	'/500',

	'/api/env',
	'/api/hello',
	'/api/health',
	'/api/robots',
	'/api/dispensaries/**',
	'/api/events/**',
	'/api/auth/**',
	'/api/oauth/**',
	'/api/scim/v2.0/**',
	'/api/invitations/*',
	'/api/webhooks/stripe',
	'/api/webhooks/dsync',
	'/api/contact-us',
	'/api/save-visitor',
	'/api/blog/**',

	'/sitemap.xml',
	'/robots.txt',

	'/auth/**',

	'/invitations/*',
	'/terms-condition',
	'/unlock-account',

	'/login/saml',
	'/browse/**',
	'/events/**',
	// '/weed-text',
	'/blog/**',
	'/help/**',
	'/work-with-us',
	'/workwithus',
	'/services',
	'/messaging',
	'/terms',
	'/privacy',
	'/about-us',
];

const allowAllUsers = [
	'/',
	'/work-with-us',
	'/workwithus',
	'/services',
	'/messaging',
	'/terms',
	'/privacy',
	'/about-gras',
];

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// alternate spelling
	if (pathname === '/workwithus') {
		const url = new URL('/work-with-us', req.url);
		return NextResponse.redirect(url);
	}

	// Bypass routes that don't require authentication
	if (micromatch.isMatch(pathname, unAuthenticatedRoutes)) {
		console.info('Bypassing auth middleware for', pathname);
		return NextResponse.next();
	}

	console.info('Checking auth middleware for', pathname);
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
