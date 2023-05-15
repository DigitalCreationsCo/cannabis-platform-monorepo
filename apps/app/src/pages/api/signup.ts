import { UserCreateType } from '@cd/data-access';
import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../utils';

/**
 * THIS API ROUTE IS NOT USED IN LEUI OF SUPERTOKENS SIGNUP API.
 * 
 * SAME APPLIES TO SIGNIN API ROUTE.
 */
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
        if (data.status === true) {
            return res.status(200).json(data);
        } else return res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        throw new Error(error.response.data);
    }
});

export default handler;
