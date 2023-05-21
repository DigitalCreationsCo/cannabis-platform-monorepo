import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { ExtendRequest } from '../../../session/getSession';

const handler = nc();

// create stripe checkout
handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const checkoutOrder = req.body;

        const response = await axios.post(urlBuilder.payment.checkout(), checkoutOrder, {
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => status >= 200 && status <= 400 || status === 404
        });
        
        return res.status(response.status).json(response.data);
        
    } catch (error: any) {
        console.log('next api checkout-session error: ', error.message);
        throw new Error(error.message);
    }
});

export default handler;
