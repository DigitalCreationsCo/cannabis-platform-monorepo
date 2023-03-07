import { NextRequest, NextResponse } from 'next/server';
export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /examples (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        '/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)'
    ]
};

/**
 * @param req
 */
export default function middleware(req: NextRequest) {
    const shopAppUrl = process.env.NEXT_PUBLIC_SHOP_APP_URL.split('//')[1];

    const url = req.nextUrl;
    const hostname = req.headers.get('host');
    const subDomain = hostname?.replace('.' + shopAppUrl, ''); // PUT YOUR DOMAIN HERE

    // Prevent security issues – users should not be able to canonically access
    // the pages/_stores folder, or /app directory and its respective contents. This can also be done
    // via rewrites to a custom 404 page
    if (subDomain !== 'app' && url.pathname.startsWith(`/app`)) {
        url.pathname = '/404';

        return NextResponse.rewrite(url);
    }

    if (url.pathname.startsWith(`/_stores`)) {
        url.pathname = '/404';

        return NextResponse.rewrite(url);
    }

    // IF HOSTNAME IS APP, REDIRECT TO DASHBOARD APP URL
    if (subDomain === 'app') {
        // check cookies and sign in if session token exists
        // if (
        //     url.pathname === '/login' &&
        //     (req.cookies.get('next-auth.session-token') || r                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          eq.cookies.get('__Secure-next-auth.session-token'))
        // ) {
        //     url.pathname = '/';
        //     return NextResponse.redirect(url);
        // }
        if (url.pathname === '/') {
            url.pathname = `/app${url.pathname}`;

            return NextResponse.rewrite(url);
        } else {
            return NextResponse.next();
        }
    }

    // IF HOSTNAME IS NOT APP and has subdomain, REDIRECT TO store URL
    if (subDomain !== shopAppUrl) {
        console.log('rewriting to /_stores');
        return NextResponse.rewrite(new URL(`/_stores/${subDomain}${url.pathname}`, req.nextUrl.origin));
    }

    // base url redirect to /browse
    if (subDomain === shopAppUrl && url.pathname === '/') {
        console.log('redirecting to /browse');
        return NextResponse.redirect(`http://${shopAppUrl}/browse`);
    }
}
