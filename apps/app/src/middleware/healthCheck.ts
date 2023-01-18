import axios from 'axios';

export default async function healthCheck(req, res, next) {
    try {
        console.log('checking health at ', process.env.SERVER_MAIN_URL + '/api/v1' + '/healthcheck');
        const { data } = await axios('http://localhost:6001' + '/api/v1' + '/healthcheck');
        if (data) console.log('App is ready');

        next();
    } catch (error) {
        console.log('healthcheck error: ', error.message);
        // return NextResponse.redirect(new URL('/services-not-available', req.url));
    }
}
