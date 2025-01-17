import createMiddleware from 'next-intl/middleware';
import app, { allLocales } from '@/lib/app';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: allLocales,
    localePrefix: app.localePrefix,
    defaultLocale: app.defaultLocale,
});

const publicPages = [
    '/', 
    '/auth/signin', 
    '/auth/signup'
];

// Helper function to check if the path is public
function isPublicPath(pathname: string) {
    const publicPathnameRegex = RegExp(
        `^(/(${allLocales.join('|')}))?(${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    return publicPathnameRegex.test(pathname);
}

// Compose the middlewares
export default async function middleware(request: any) {
    const pathname = request.nextUrl.pathname;

    // Handle public pages with just intl middleware
    if (isPublicPath(pathname)) {
        return intlMiddleware(request);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],

};