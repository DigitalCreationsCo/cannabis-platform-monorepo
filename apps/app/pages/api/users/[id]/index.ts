import axios from 'axios';
import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../../../src/utils';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);
// get a single user
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('get user api route');
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const { id } = req.query;
        const { data } = await axios(urlBuilder.main.userById(id));
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

// admin user checker middleware
// handler.use(adminMiddleware);
export default handler;
