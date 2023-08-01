import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { ExtendRequest } from '../../../session/getSession';

const handler = nc();

// connect dispensary to an existing stripe account
handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {

        const response = await axios.post(
            urlBuilder.payment.connectStripe(),
            req.body,
            { validateStatus: status => (status >= 200 && status <= 302) || status == 404 });

        if (response.status == 404)
            throw new Error('Stripe account is not found.');

        if (response.status === 302) {
            console.info('302 redirect response')
            return res.status(response.status).json(response.data);
        }

        if (response.status === 201) {
            console.info('201 response')
            return res.status(response.status).json(response.data);
        }

        if (response.status === 200) {
            console.info('200 response')
            return res.status(response.status).json(response.data);
        }

    } catch (error: any) {
        console.error('next api connect stripe account error: ', error.message);
        throw new Error(error.message)
    }
});

export default handler;
