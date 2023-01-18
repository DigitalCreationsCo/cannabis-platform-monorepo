import axios from 'axios';
import { NextResponse } from 'next/server';
import { urlBuilder } from '../utils';

export default async function healthCheck(req, res, next) {
    try {
        console.log('checking server health of ', process.env.SERVER_MAIN_URL + '/api/v1' + '/healthcheck');
        await axios(urlBuilder.main.healthCheck());
        next();
    } catch (error) {
        console.log('healthcheck error: ', error.message);
        return NextResponse.redirect(new URL('/services-not-available', req.url));
    }
}
