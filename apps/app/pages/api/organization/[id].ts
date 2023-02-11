import axios from 'axios';
import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../../src/utils';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const { id } = req.query;
        const { data } = await axios(urlBuilder.main.organizationById(id));
        return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

// handler.use(adminMiddleware);

export default handler;
