import { db_namespace, clientPromise } from '@cd/data-access';
import { type NextApiRequest, type NextApiResponse } from 'next';

import packageInfo from '../../package.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      throw new Error('Method not allowed');
    }

    const client = await clientPromise;
    await client.db(db_namespace.db).command({ ping: 1 });

    res.status(200).json({
      version: packageInfo.version,
    });
  } catch (err: any) {
    const { statusCode = 503 } = err;
    res.status(statusCode).json({});
  }
}
