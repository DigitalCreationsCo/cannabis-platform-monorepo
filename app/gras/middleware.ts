import micromatch from 'micromatch';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';
import env from './lib/env';

// Add routes that don't require authentication
const unAuthenticatedRoutes = [
  '/',
  '/api/hello',
  '/api/health',
  '/api/robots',
  '/api/dispensaries',
  '/api/events',
  '/api/auth/**',
  '/api/oauth/**',
  '/api/scim/v2.0/**',
  '/api/invitations/*',
  '/api/webhooks/stripe',
  '/api/webhooks/dsync',
  '/auth/**',
  '/invitations/*',
  '/terms-condition',
  '/unlock-account',
  '/login/saml',
  '/browse',
  '/events/*',
  // '/weed-text',
  '/blog/**',
  '/blog/*',
  '/blog',
  // '/help',
  '/work-with-us',
  '/workwithus',
  '/services',
  '/messaging',
];

const allowAllUsers = [
  '/',
  '/work-with-us',
  '/workwithus',
  '/services',
  '/messaging',
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/workwithus') {
    const url = new URL('/work-with-us', req.url);
    return NextResponse.redirect(url);
  }

  const over21 = await getCookie('yesOver21', { req });
  // Redirect to browse page if user is over 21
  if (pathname === '/' && over21 == 'true') {
    const url = new URL('/browse', req.url);
    return NextResponse.redirect(url);
  }

  // Redirect to home page if user is under 21
  if (!micromatch.isMatch(pathname, allowAllUsers) && over21 !== 'true') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Bypass routes that don't require authentication
  if (micromatch.isMatch(pathname, unAuthenticatedRoutes)) {
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
  ],
};
