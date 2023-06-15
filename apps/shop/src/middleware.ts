import { ServerResponse } from 'http';
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

const
    appBaseUrl = process.env.NEXT_PUBLIC_SHOP_APP_URL || 'localhost:3000';

export default function middleware(req: NextRequest, res: ServerResponse) {

    let
        subdomain = req.headers.get('host')?.split('.')[0].split(':')[0] || 'localhost';

    console.log('subdomain', subdomain);

    const allowAllVisitors = [
        '/about-gras',
        '/signup/create-dispensary-account'
    ]

    const shopPages = allowAllVisitors.concat([
        '/mybag',
        '/support',
        '/checkout',
        '/404',
        '/500',
        '/sorry-we-cant-serve-you',
        '/signup',
        '/termsandconditions',
        '/quick-delivery',
        '/browse',
        '/welcome'
    ])

    let
        url;
    switch (true) {
        case subdomain === 'app':
            // console.log('admin path')
            url = req.nextUrl.clone();

            // Redirect to admin app if subdomain is app and path does not start with /app
            if (!url.pathname.startsWith('/app/')) {
                url.pathname = `/app${url.pathname}`;
                console.log('REWRITE')
                return NextResponse.rewrite(url);
            }
            // Prevent security issues – users should not be able to canonically access the pages/_stores folder and its respective contents.
            if (url.pathname.startsWith(`/_stores`)) {
                console.error('accessing stores directly is forbidden')
                url.pathname = '/404';
                console.log('REDIRECT')
                return NextResponse.redirect(url);
            }
            break;
        case (subdomain === 'localhost' || subdomain === 'grascannabis'):
            // console.log('shop path')
            url = req.nextUrl.clone();

            // Prevent security issues – users should not be able to canonically access the pages/_stores folder and its respective contents.
            if (url.pathname.startsWith(`/_stores`)) {
                console.error('accessing stores directly is forbidden')
                url.pathname = '/404';
                console.log('REDIRECT')
                return NextResponse.redirect(url);
            }
            // Prevent security issues – users should not be able to canonically access /app path.
            if (url.pathname.startsWith(`/app`)) {
                url.pathname = '/404';
                console.log('REDIRECT')
                return NextResponse.redirect(url);
            }
            let
                over21 = req.cookies.get('yesOver21')?.value;
            // base url redirect to /browse if over21
            if (url.pathname === '/') {
                if (over21) {
                    url.pathname = '/browse';
                    console.log('REDIRECT')
                    return NextResponse.redirect(url);
                }
            }
            // redirect under21 to homepage
            if (url.pathname !== '/') {
                if (!over21) {
                    if (!allowAllVisitors.includes(url.pathname)) {
                        url.pathname = '/';
                        console.log('REDIRECT')
                        return NextResponse.redirect(url);
                    }
                }
            }
            if (shopPages.includes(url.pathname)) {
                return NextResponse.next();
            }
            break;
        default:
            url = req.nextUrl.clone();
            // Prevent security issues – users should not be able to canonically access /app path.
            if (url.pathname.startsWith(`/app`)) {
                url.pathname = '/404';
                console.log('REDIRECT')
                return NextResponse.redirect(url);
            }
            // if path is not a root shop page, rewrite to storefront
            if (!shopPages.includes(url.pathname)) {
                // console.log('storefront path')
                // console.log('path: ', `/_stores/${subdomain}${url.pathname}`, req.nextUrl.origin)
                console.log('REWRITE')
                return NextResponse.rewrite(new URL(`/_stores/${subdomain}${url.pathname}`, req.nextUrl.origin));
            }
            break;
    }
}