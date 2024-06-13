import { throwIfNotAllowed, ApiError } from '@cd/core-lib';
import {
  deleteDispensary,
  getDispensary,
  updateDispensary,
  type Dispensary,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';
import { sendAudit } from '@/lib/retraced';
import { getCurrentUserWithDispensary } from '@/lib/user';
import { updateTeamSchema, validateWithSchema } from '@/lib/zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await throwIfNoDispensaryAccess(req, res);

    switch (req.method) {
      case 'GET':
        await handleGET(req, res);
        break;
      case 'PUT':
        await handlePUT(req, res);
        break;
      case 'DELETE':
        await handleDELETE(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET, PUT, DELETE');
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

// Get a team by slug
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const user = await getCurrentUserWithDispensary(req, res);

  throwIfNotAllowed(user, 'team', 'read');

  const team = await getDispensary({ client, where: { id: user.team.id } });

  recordMetric('team.fetched');

  res.status(200).json({ data: team });
};

// Update a team
const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const user = await getCurrentUserWithDispensary(req, res);

  throwIfNotAllowed(user, 'team', 'update');

  const { name, slug, domain } = validateWithSchema(updateTeamSchema, req.body);

  let updatedTeam: Dispensary | null = null;

  try {
    updatedTeam = await updateDispensary({
      client,
      data: {
        name,
        slug,
        domain: domain as string,
      },
    });
  } catch (error: any) {
    if (error.message.includes('slug')) {
      throw new ApiError(409, 'This slug is already taken for a team.');
    }

    if (error.message.includes('domain')) {
      throw new ApiError(409, 'This domain is already associated with a team.');
    }

    throw error;
  }

  sendAudit({
    action: 'team.update',
    crud: 'u',
    user,
    team: user.team,
  });

  recordMetric('team.updated');

  res.status(200).json({ data: updatedTeam });
};

// Delete a team
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!env.teamFeatures.deleteTeam) {
    throw new ApiError(404, 'Not Found');
  }
  const client = await clientPromise;
  const user = await getCurrentUserWithDispensary(req, res);

  throwIfNotAllowed(user, 'team', 'delete');

  await deleteDispensary({ client, where: { id: user.team.id } });

  sendAudit({
    action: 'team.delete',
    crud: 'd',
    user,
    team: user.team,
  });

  recordMetric('team.removed');

  res.status(204).end();
};
