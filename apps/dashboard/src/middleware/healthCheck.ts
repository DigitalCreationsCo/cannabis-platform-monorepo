import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';

export default async function HealthCheck(req: any, res: any, next: any) {
    try {
        console.info(' healthcheck at', process.env.SERVER_MAIN_URL + '/api/v1' + '/healthcheck');
        await axios(urlBuilder.main.healthCheck());
        next();
    } catch (error: any) {
        console.info('healthcheck error: ', error.message);
        throw new Error(error.message);
    }
}
