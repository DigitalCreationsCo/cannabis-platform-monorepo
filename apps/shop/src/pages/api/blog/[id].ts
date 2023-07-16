import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

// get a single article
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );

    const id = req.query.id as string;

    const response = await axios(urlBuilder.main.blogById(id));

    if (response.data.success)
      return res.status(res.statusCode).json(response.data.payload);
  } catch (error: any) {
    console.error(error.message);
    return res.json(error);
  }
});

export default handler;
