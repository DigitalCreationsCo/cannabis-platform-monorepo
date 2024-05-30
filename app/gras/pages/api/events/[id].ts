import type { NextApiRequest, NextApiResponse } from 'next';
import { recordMetric } from '@/lib/metrics';
import env from '@/lib/env';
import { deleteEvent, getEvent } from '@cd/data-access';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET':
        await handleGET(req, res);
        break;
      case 'DELETE':
        await handleDELETE(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET, DELETE');
        res.status(405).json({
          error: { message: `Method ${method} Not Allowed` },
        });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;
    res.status(status).json({ error: { message } });
  }
}

// Get cannabis events
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientToken = req.headers.authorization?.split(' ')[1];
  const token = env.nextAuth.secret;
  if (clientToken !== token) {
    throw new Error('Unauthorized');
  }
  const { location = 'ny--new-york', query = 'cannabis' } = req.query;
  const { id } = req.query as { id: string };
  const event = await getEvent(id);
  recordMetric('event.fetched');
  res.status(200).json({ data: event });
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientToken = req.headers.authorization?.split(' ')[1];
  const token = env.nextAuth.secret;
  if (clientToken !== token) {
    throw new Error('Unauthorized');
  }
  const { id } = req.query as { id: string };
  await deleteEvent(id);
  res.status(200).json({});
};
