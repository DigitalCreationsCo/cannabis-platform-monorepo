import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { ExtendRequest } from '../../../session/getSession';

// const cache = new NodeCache({ stdTTL: 30 });

const handler = nc();

// get stripe connect account
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        
        // res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');

        const { id: stripeAccountId } = req.query;

        // if (cache.has(`stripeAccount/${stripeAccountId}`)) {

        //     const account = 
        //     cache.get(`stripeAccount/${stripeAccountId}`);
            
        //     return res.status(200).json(account);
            
        // } else {

            const response = await axios.get(urlBuilder.payment.account(stripeAccountId), { validateStatus: status => (status >= 200 && status < 300) || status == 404 });
            if (response.status == 404) {
                throw new Error('Stripe account is not found.');
            }
            if (response.status === 200) {
                // cache.set(`stripeAccount/${stripeAccountId}`, data);
                
                return res.status(res.statusCode);
            }
        // }
    } catch (error: any) {
        console.error('get stripe account error: ', error.message);
        return res.status(res.statusCode).json(error);
    }
});

// Notes on caching in directory: /_dev/cache.txt

// get a single organization details
// handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

//         const { id } = req.query;

//         if (cache.has(`organization/${id}`)) {
//             const org = 
//             cache.get(`organization/${id}`);
            
//             return res.status(200).json(org);
//         } else {
//             const { data } = await axios.get(urlBuilder.main.organizationById(id), { validateStatus: status => (status >= 200 && status < 300) || status == 404 });
//             cache.set(`organization/${id}`, data);

//             return res.status(res.statusCode).json(data);
//         }
//     } catch (error: any) {
//         console.error(error.message);
//         return res.status(res.statusCode).json(error);
//     }
// });

export default handler;
