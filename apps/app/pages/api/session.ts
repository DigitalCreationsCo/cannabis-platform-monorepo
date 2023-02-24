import axios from 'axios';
import { ExtendRequest } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../src/utils';

const handler = nc();

// get session from backend
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        console.log('next backend: GET SESSION')
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const { data } = await axios(urlBuilder.main.getSession());
        return res.status(res.statusCode).json(data);
    } catch (error) {
        // throw new error to handle any error discrepancy between frontend and next api
        throw new Error(error.response.data);
    }
});

export default handler;
