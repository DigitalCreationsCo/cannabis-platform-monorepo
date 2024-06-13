import { throwIfNotAllowed, ApiError } from '@cd/core-lib';
import { deleteApiKey } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';
import { getCurrentUserWithDispensary } from '@/lib/user';
import { deleteApiKeySchema, validateWithSchema } from '@/lib/zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!env.teamFeatures.apiKey) {
      throw new ApiError(404, 'Not Found');
    }

    await throwIfNoDispensaryAccess(req, res);

    switch (req.method) {
      case 'DELETE':
        await handleDELETE(req, res);
        break;
      default:
        res.setHeader('Allow', 'DELETE');
        res.status(405).json({
          error: { message: `Method ${req.method} Not Allowed` },
        });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;

    res.status(status).json({ error: { message } });
  }
}

// Delete an API key
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const user = await getCurrentUserWithDispensary(req, res);
  throwIfNotAllowed(user, 'team_api_key', 'delete');

  const { apiKeyId } = validateWithSchema(deleteApiKeySchema, req.query);

  await deleteApiKey({ client, where: { id: apiKeyId } });

  recordMetric('apikey.removed');

  res.status(204).end();
};
