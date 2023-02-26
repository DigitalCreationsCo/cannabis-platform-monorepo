import { UserCreateType } from '@cd/data-access/dist';
import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../src/utils';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);

handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const formData: UserCreateType = req.body;
        const { data } = await axios.post(urlBuilder.main.signup(), formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('NEXT: signup data: ', data);
        return res.status(res.statusCode).json('hello');
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
