import { ServerResponse } from 'http';
import { NextRequest } from 'next/server';

// export const config = {
//     matcher: [
//         /*
//          * Match all paths except for:
//          * 1. /api routes
//          * 2. /_next (Next.js internals)
//          * 3. /examples (inside /public)
//          * 4. all root files inside /public (e.g. /favicon.ico)
//          */
//         '/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)'
//     ]
// };

// /**
//  * @param req
//  */

// // the redirects are not designed well, but they work for now.
export default function middleware(req: NextRequest, res: ServerResponse) {
//     const shopAppUrl = process?.env?.NEXT_PUBLIC_SHOP_APP_URL && process?.env?.NEXT_PUBLIC_SHOP_APP_URL.split('//')[1].split(':')[0] || 'localhost';
//     const url = req.nextUrl;
//     console.log('url', url);
//     const hostname = req.headers.get('host');
//     console.log('hostname', hostname);
//     const subDomain = hostname; // PUT YOUR DOMAIN HERE
//     console.log('subDomain', subDomain);
//     console.log('shopAppUrl', shopAppUrl);

//     // Prevent security issues – users should not be able to canonically access
//     // the pages/_stores folder, or /app directory and its respective contents. This can also be done
//     // via rewrites to a custom 404 page

//     if ( subDomain === null ) return

//     if (!subDomain.startsWith('app') && url.pathname.startsWith(`/app`)) {
//         url.pathname = '/404';

//         return NextResponse.rewrite(url);
//     }

//     if (subDomain.startsWith('app')) {
//         // check cookies and sign in if session token exists
//         // if (
//         //     url.pathname === '/login' &&
//         //     (req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token'))
//         // ) {
//         //     url.pathname = '/';
//         //     return NextResponse.redirect(url);
//         // }
//         if (url.pathname === '/') {
//             url.pathname = `/app${url.pathname}`;

//             return NextResponse.rewrite(url);
//         } else {
//             return NextResponse.next();
//         }
//     }

//     // rewrite to /_stores/*
//     if (!subDomain.startsWith(shopAppUrl)) {
//         return NextResponse.rewrite(new URL(`/_stores/${subDomain}${url.pathname}`, req.nextUrl.origin));
//     }

//     // block manual access to /_stores/*
//     if (url.pathname.startsWith(`/_stores`)) {
//         // const intendedSubdomain = url.pathname.split('/')[2];
//         // console.log('intendedSubdomain', intendedSubdomain);
//         // console.log('/_stores url detected');
//         // console.log(!subDomain.startsWith(shopAppUrl));
//         // if (!subDomain.startsWith(shopAppUrl)) {
//         //     if (intendedSubdomain === undefined) {
//         url.pathname = '/404';
//         return NextResponse.rewrite(url);
//         //     }
//         //     console.log('rewriting to /_stores');
//         //     return NextResponse.rewrite(`http://${intendedSubdomain}.localhost:3000`);
//         // }
//     }

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
}