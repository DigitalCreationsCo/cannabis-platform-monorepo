import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';
import { sendAudit } from '@/lib/retraced';
import { dispensaries } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGET(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET');
        res.status(405).json({
          error: { message: `Method ${req.method} Not Allowed` },
        });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;
    console.info('GET api/dispensaries/[slug]', error.message);
    res.status(status).json({ error: { message } });
  }
}

// Get a dispensary by slug
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('req.query', req.query);
  const { slug } = req.query as { slug: string };

  console.info('clientToken', req.headers.authorization?.split(' ')[1]);
  console.info('token', env.nextAuth.secret);

  const clientToken = req.headers.authorization?.split(' ')[1];
  const token = env.nextAuth.secret;

  if (clientToken !== token) {
    throw new Error('Unauthorized');
  }

  const dispensary = await dispensaries.find((d) => d.slug === slug);
  const client = await clientPromise;
  // const dispensary = await getDispensary({ client, where: { slug } });

  recordMetric('team.fetched');

  res.status(200).json({ data: dispensary });
};
