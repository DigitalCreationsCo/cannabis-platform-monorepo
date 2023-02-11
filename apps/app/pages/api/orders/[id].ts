import axios from 'axios';
import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../../src/utils';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);
// get a single order
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const { id } = req.query;
        // this is the preferred pattern for handling server response VV
        // across ALL apps and systems
        const { data } = await axios(urlBuilder.main.orderById(id));
        return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

// handler.use(adminMiddleware);
// delete order route
// handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { id } = req.query;
//     const deleteOrder = await Order.findByIdAndDelete(id);
//     return res.status(200).json(deleteOrder);
//   } catch (error) {
//     console.error(error.message);
//     return res.json(error);
//   }
// });

export default handler;
