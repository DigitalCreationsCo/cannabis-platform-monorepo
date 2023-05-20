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

export default function middleware(req: NextRequest, res: ServerResponse) {

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
        return NextResponse.rewrite(`http://${subdomain}.localhost:3000`);
    }

    // rewrite to /_stores/*
    if (subdomain !== 'app' && subdomain !== 'grascannabis' && subdomain !== 'localhost') {
        return NextResponse.rewrite(new URL(`/_stores/${subdomain}${url.pathname}`, req.nextUrl.origin));
    }

//     // // redirect to /welcome if not over 21
//     // if (subDomain.includes(shopAppUrl) && url.pathname !== '/welcome') {
//     //     let over21 = req.cookies.get('yesOver21')?.value
//     //     if (!over21) {

//     //         if (url.pathname === '/quick-delivery') {
//     //             return NextResponse.redirect(`http://${subDomain}/welcome?redirect=/quick-delivery`); 
//     //         }

//     //         return NextResponse.redirect(`http://${subDomain}/welcome?redirect=/`); 
//     //     }
//     // }

//     // base url redirect to /browse
//     if (subDomain.includes(shopAppUrl) && url.pathname === '/') {
//         let over21 = req.cookies.get('yesOver21')?.value

//         if (over21) {
//             return NextResponse.redirect(`http://${subDomain}/browse`); 
//         }
//     }

    // redirect to / if not over 21
    // if (subdomain === 'localhost' || subdomain === 'grascannabis' && url.pathname !== '/') {

    //     let over21 = req.cookies.get('yesOver21')?.value
    //     if (!over21) {

    //         // if (url.pathname === '/quick-delivery') {
    //         //     return NextResponse.redirect(`http://${subDomain}/welcome?redirect=/quick-delivery`); 
    //         // }

    //         return NextResponse.redirect(`localhost:3000`); 
    //     }
    //     // if (over21)
    //     // return NextResponse.next()
    // }

    // base url redirect to /browse
    // if (subdomain === 'localhost' || subdomain === 'grascannabis' && url.pathname === '/') {
    //     let over21 = req.cookies.get('yesOver21')?.value

    //     if (over21) {
    //         console.log(url.pathname === '/')
    //         console.log('REDIRECT ?')
    //         return NextResponse.redirect(`localhost:3000/browse`); 
    //     }
    // }
}