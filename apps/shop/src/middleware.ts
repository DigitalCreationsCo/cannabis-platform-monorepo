import { ServerResponse } from 'http';
import { NextResponse } from 'next/server';

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

export default function middleware(req: any, res: ServerResponse) {

    console.log('req headers referer: ', req.headers.get('referer'));
    
    const
    subdomain = req.headers.get('host')?.split('.')[0].split(':')[0] || 'localhost',
    url = req.nextUrl;

    console.log('url', url);
    console.log('subdomain', subdomain);

    // Redirect to /app if subdomain is app and path does not start with /app
    if (subdomain === 'app') {
        
        if (!url.pathname.startsWith('/app/')) {
            url.pathname = `/app${url.pathname}`;
            
            return NextResponse.rewrite(url);
        }
    }

    
    // Prevent security issues – users should not be able to canonically access /app path.
    // Instead redirect to /404
    if (subdomain !== ('app') && url.pathname.startsWith(`/app`)) {
        url.pathname = '/404';

        return NextResponse.redirect(url);
    }

    
    // Prevent security issues – users should not be able to canonically access
    // the pages/_stores folder and its respective contents.
    // Instead redirect to /404
    if (url.pathname.startsWith(`/_stores`)) {
        if (subdomain === 'app' || subdomain === 'grascannabis' || subdomain === 'localhost') {
            
            url.pathname = '/404';
            return NextResponse.redirect(url);
        }
        else 
        return NextResponse.redirect(`http://${subdomain}.localhost:3000`);
    }

    // rewrite to /_stores/*
    // if (subdomain !== 'app' && subdomain !== 'grascannabis' && subdomain !== 'localhost') {
    // if (subdomain !== 'app' && subdomain !== 'grascannabis' && subdomain !== 'localhost') {
    //     console.log('stores path')
    //     // if (url.pathname !== '/') {
    //     //     console.log('url pathname? ', url.pathname)
    //     //     console.log('go to: ', `${req.nextUrl.origin}${url.pathname}`, )
            
    //     //     return NextResponse.redirect(`http://localhost:3000${url.pathname}`);
    //     // }

    //     // else if (url.pathname === '/'){
    //         console.log('go to storefront')
    //     // return NextResponse.redirect(new URL(`/_stores/${subdomain}${url.pathname}`, req.nextUrl.origin));
    //     return NextResponse.rewrite(formatDispensaryUrl(subdomain));

    //     // }
    // }

    // base url redirect to /browse if over21
    if (url.pathname === '/' && subdomain === 'localhost' || subdomain === 'grascannabis') {
        let over21 = req.cookies.get('yesOver21')?.value

        if (over21) {
            url.pathname = '/browse';
            return NextResponse.redirect(url); 
        }
    }

    // under21 redirect to base url
    if (url.pathname !== '/' && subdomain === 'localhost' || subdomain === 'grascannabis') {
        
        let over21 = req.cookies.get('yesOver21')?.value

        if (url.pathname === '/about-gras')
        return NextResponse.next()

        if (url.pathname === '/signup/create-dispensary-account')
        return NextResponse.next()
        
        if (!over21) {
            url.pathname = '/';
            return NextResponse.redirect(url); 
        }
    }

}