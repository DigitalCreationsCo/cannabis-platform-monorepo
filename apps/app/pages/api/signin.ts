import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { getSession } from '../../src/session';
import { urlBuilder } from '../../src/utils';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);

handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const formData: userLoginData = req.body;
        const { session, user } = await getSession();
        if (session && user) return res.json(session);
        console.log('formData: ', formData);
        console.log('url: ', urlBuilder.main.signin());
        const { data } = await axios.post(urlBuilder.main.signin(), formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('data: ', data);
        return res.status(res.statusCode).json(data);
    } catch (error) {
        // throw new error to handle any error discrepancy between frontend and next api
        console.error(error.message);
        throw new Error(error.response.data);
    }
});

export default handler;

type userLoginData = {
    email: string;
    password: string;
};
