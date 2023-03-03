// import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { getSession } from '../../src/session';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);

handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const { session } = await getSession({ req, res });
        // await signOut()
    } catch (error) {
        // throw new error to handle any error discrepancy between frontend and next api
        throw new Error(error.response.data);
    }
});

export default handler;
