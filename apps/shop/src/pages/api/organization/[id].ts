import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// get a single organization details
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

        const { id } = req.query;
        const { data } = await axios.get(urlBuilder.main.organizationById(id), { validateStatus: status => (status >= 200 && status < 300) || status == 404 });
        
        return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error(error.message);
        return res.status(res.statusCode).json(error);
    }
});

export default handler;
