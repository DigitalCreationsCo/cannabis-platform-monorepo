import axios from 'axios';
import { ExtendRequest } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../src/utils';

const handler = nc();

// get session from backend
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=10');
        const { data } = await axios(urlBuilder.main.getSession(), {
            headers: {
                Cookie: req.headers.cookie
            }
        });
        res.status(res.statusCode).json({ status: true, data });
    } catch (error) {
        console.log('next api session error: ', error);
        res.status(res.statusCode).json({ status: false, error });
    }
});

export default handler;
