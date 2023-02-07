import axios from 'axios';
import { urlBuilder } from '../utils';

export default async function HealthCheck(req, res, next) {
    try {
        console.log('checking server health at', process.env.SERVER_MAIN_URL + '/api/v1' + '/healthcheck');
        await axios(urlBuilder.main.healthCheck());
        next();
    } catch (error) {
        console.log('healthcheck error: ', error.message);
        throw new Error(error);
    }
}
