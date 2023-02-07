import { NextResponse } from 'next/server';
import { useQuery } from '../hooks';
import { urlBuilder } from '../utils';

export default async function HealthCheck(req, res, next) {
    try {
        // console.log('checking server health at', process.env.SERVER_MAIN_URL + '/api/v1' + '/healthcheck');
        useQuery({ url: urlBuilder.main.healthCheck() });
        // await axios(urlBuilder.main.healthCheck());
        next();
    } catch (error) {
        console.log('healthcheck error: ', error.message);
        NextResponse.redirect(new URL('/services-not-available', req.url));
    }
}
