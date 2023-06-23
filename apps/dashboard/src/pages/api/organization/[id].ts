import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';


// Notes on caching in directory: /_dev/cache.txt
const cache = new NodeCache({ stdTTL: 30 });

const handler = nc();

// get a single organization details
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

        const
            { id } = req.query;

        if (cache.has(`organization/${id}`)) {

            const
                org = cache.get(`organization/${id}`);

            return res.status(200).json(org);

        } else {
            const
                { data } = await axios.get(urlBuilder.main.organizationById(id), { validateStatus: status => (status >= 200 && status < 300) || status == 404 });

            cache.set(`organization/${id}`, data);

            return res.status(res.statusCode).json(data);

        }
    } catch (error: any) {
        console.error('next api getOrganization: ', error.message);
        return res.status(500).json(error.message);

    }
});

export default handler;
