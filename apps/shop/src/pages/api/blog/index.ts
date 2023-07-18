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
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );
    if (cache.has(`blogs/latest`)) {
      const blogs = cache.get(`blogs/latest`);
      return res.status(200).json(blogs);
    }

    const response = await axios(urlBuilder.main.blog());
    console.info('response: ', response);

    cache.set(`blogs/latest`, response.data.payload);
    return res.status(res.statusCode).json(response.data.payload);
  } catch (error: any) {
    console.error('/blog GET error: ', error.message);
    return res.json(error);
  }
});

export default handler;
