import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

handler.use(authMiddleware).use(healthCheckMiddleware);

// get a single user
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        // const { data } = await axios(urlBuilder.main.orderById(id));
        return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

// admin user checker middleware
// handler.use(adminMiddleware);

export default handler;
