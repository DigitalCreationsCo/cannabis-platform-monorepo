import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { ExtendRequest } from '../../../session/getSession';

// const cache = new NodeCache({ stdTTL: 30 });
const handler = nc();

// connect dispensary to an existing stripe account
handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        
        // res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');

        // if (cache.has(`stripeAccount/${stripeAccountId}`)) {

        //     const account = 
        //     cache.get(`stripeAccount/${stripeAccountId}`);
            
        //     return res.status(200).json(account);
            
        // } else {
            
            const response = await axios.post(urlBuilder.payment.connectStripe(), req.body, { validateStatus: status => (status >= 200 && status < 300) || status == 404 });
            if (response.status == 404) {
                throw new Error('Stripe account is not found.');
            }
            if (response.status === 200) {
                // cache.set(`stripeAccount/${stripeAccountId}`, data);
                
                return res.status(res.statusCode);
            }
        // }
    } catch (error: any) {
        console.error('connect stripe account error: ', error.message);
        return res.status(res.statusCode).json(error);
    }
});

export default handler;
