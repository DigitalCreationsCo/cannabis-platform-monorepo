import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { ExtendRequest } from '../../session/getSession';

const handler = nc();

handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const checkoutOrder = req.body;
        // const { data } = await axios.post(urlBuilder.main.organization(), formData, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // return res.status(res.statusCode).json(data);

        console.log('api route: create stripe checkout session');
        console.log('checkout order: ', checkoutOrder)
        const { data } = await axios.post(urlBuilder.payment.checkout(), checkoutOrder, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.log('next route: checkout-session error: ', error.data.message);
        throw new Error(error);
    }
});

export default handler;
