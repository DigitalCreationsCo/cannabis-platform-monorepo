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

    const
    subdomain = req.headers.get('host')?.split('.')[0].split(':')[0] || 'localhost',
    url = req.nextUrl;

    const
    launchPages = [
        '/',
        '/support',
        '/about-gras',
    ]
    
    if (subdomain === 'localhost' || subdomain === 'grascannabis') {
        
        if (launchPages.includes(url.pathname))
        return NextResponse.next()

        else 
        return NextResponse.redirect(appBaseUrl)

    }
}