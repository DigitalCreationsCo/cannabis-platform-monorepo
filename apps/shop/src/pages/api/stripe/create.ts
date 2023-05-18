import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

// const cache = new NodeCache({ stdTTL: 30 });

const handler = nc();

// create stripe account, connect to dispensary
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        
        // res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');

        // if (cache.has(`stripeAccount/${stripeAccountId}`)) {

        //     const account = 
        //     cache.get(`stripeAccount/${stripeAccountId}`);
            
        //     return res.status(200).json(account);
            
        // } else {
            
            const response = await axios.post(urlBuilder.payment.createStripe(), req.body, { validateStatus: status => (status >= 200 && status < 400) || status == 404 });

            console.log('create stripe account response: ', response);

            res.writeHead(302, { Location: '/' });
            res.end();
            
            // return res.status(response.status).json(response.data);
            // if (response.status == 404) {
            //     throw new Error('Stripe account is not found.');
            // }
            // if (response.status === 201) {
            //     // cache.set(`stripeAccount/${stripeAccountId}`, data);
                
            //     // return res.status(res.statusCode);
            // }
        // }
    } catch (error: any) {
        console.error('create stripe account error: ', error.message);
        return res.status(res.statusCode).json(error);
    }
});

export default handler;
