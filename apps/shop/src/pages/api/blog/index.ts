import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 20 });
const handler = nc();

// get latest blogs
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        if (cache.has(`blogs/latest`)) {
            const blogs = cache.get(`blogs/latest`);
            return res.status(200).json(blogs);
        }

        const { data } = await axios(urlBuilder.main.blog());
        cache.set(`blogs/latest`, data);
        return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error('/products GET error: ', error.message);
        return res.json(error);
    }
});

export default handler;
