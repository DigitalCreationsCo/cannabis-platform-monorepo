import { urlBuilder } from '@cd/core-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
import { axios } from '../../../config';


// Notes on caching in directory: /_dev/cache.txt
const cache = new NodeCache({ stdTTL: 30 });

const handler = nc();

// THIS IS THE CORRECT RESPONSE HANDLING PATTERN WITH AXIOS CONFIG! VVV


// get a single organization details
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

        const
            { id } = req.query;

        if (cache.has(`organization/${id}`)) {

            const
                org = cache.get(`organization/${id}`);

            return res.status(200).json({
                success: true,
                payload: org,
                fromCache: true
            });

        } else {
            const
                response = await axios.get(urlBuilder.main.organizationById(id));

            if (response.data.success === true)
                cache.set(`organization/${id}`, response.data.payload);

            return res.status(response.status).json(response.data);
        }
    } catch (error: any) {
        console.error('next-api organization[id] Error: ', error.message);

        return res.json({
            success: false,
            message: error.message
        });
    }
});

export default handler;
