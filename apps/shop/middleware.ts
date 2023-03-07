import { NextRequest } from 'next/server';
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
    console.log('SHOP_APP_URL: ', shopAppUrl);

    const url = req.nextUrl;
    console.log('url: ', url.href);

    const pathname = url.pathname;
    console.log('pathname: ', pathname);

    const hostname = req.headers.get('host');
    console.log('hostname: ', hostname);

    const subDomain = hostname?.replace(shopAppUrl, ''); // PUT YOUR DOMAIN HERE
    console.log('subDomain: ', subDomain);

    // 1. IF VIEWING THE BASE,URL REDIREC TO /BROWSE FOR MARKETPLACE PAGE
    // 2. IF HOSTNAME STARTS WITH APP., REDIRECT TO DASHBOARD APP URL
    // if (subDomain === 'app') {
    //     // check cookies and sign in if session token exists
    //     // if (
    //     //     url.pathname === '/login' &&
    //     //     (req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token'))
    //     // ) {
    //     //     url.pathname = '/';
    //     //     return NextResponse.redirect(url);
    //     // }
    //     url.pathname = `/app${pathname}`;
    //     // return NextResponse.rewrite(url);
    // }

    // if (subDomain === shopAppUrl && pathname === '/') {
    //     console.log('redirecting to /browse');
    //     return NextResponse.redirect(`http://${shopAppUrl}/browse`);
    // }
    // // 3. IF HOSTNAME STARTS WITH STORE, REDIRECT TO STOREFRONT DYNAMIC APP URL
    // else if (
    //     !hostname.includes(':') && // exclude all files in the public folder
    //     !pathname.startsWith('/api') // exclude all API routes
    // ) {
    //     console.log('rewriting to /_stores');
    //     console.log(req.url + `/_stores/${subDomainId}${pathname}`);
    //     // rewrite to the current hostname under the pages/sites folder
    //     // the main logic component will happen in pages/sites/[site]/index.tsx
    //     return NextResponse.rewrite(new URL(`/_stores/${subDomainId}${pathname}`, req.url));
    // }
    console.log(' ');
    // return NextResponse.rewrite(new URL(`/_stores/${subDomainId}${pathname}`, req.url));

    // Prevent security issues – users should not be able to canonically access
    // the pages/sites folder and its respective contents. This can also be done
    // via rewrites to a custom 404 page
    // if (pathname.startsWith(`/_sites`)) {
    //     return new Response(null, { status: 404 });
    // }
}
