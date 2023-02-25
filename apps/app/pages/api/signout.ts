// import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
// import { getSession } from '../../src/session';
// import { urlBuilder } from '../../src/utils';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);

handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        // const { session, user } = await getSession();
        // if (session && user) return res.json(session);
        // const { data } = await axios.post(urlBuilder.main.signin());
        // return res.status(res.statusCode).json(data);
    } catch (error) {
        // throw new error to handle any error discrepancy between frontend and next api
        throw new Error(error.response.data);
    }
});

export default handler;
