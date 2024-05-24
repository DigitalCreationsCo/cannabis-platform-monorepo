import { slugify, ApiError } from '@cd/core-lib';
import {
  createDispensary,
  getStaffMemberDispensaries,
  isTeamExists,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { recordMetric } from '@/lib/metrics';
import { getCurrentUser } from '@/lib/user';
import { createTeamSchema, validateWithSchema } from '@/lib/zod';

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
      case 'POST':
        await handlePOST(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET, POST');
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

// Get teams
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getCurrentUser(req, res);
  const teams = await getStaffMemberDispensaries(user.id);

  recordMetric('team.fetched');

  res.status(200).json({ data: teams });
};

// Create a team
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = validateWithSchema(createTeamSchema, req.body);

  const user = await getCurrentUser(req, res);
  const slug = slugify(name);

  if (await isTeamExists(slug)) {
    throw new ApiError(400, 'A team with the slug already exists.');
  }

  const team = await createDispensary({
    userId: user.id,
    name,
    slug,
  });

  recordMetric('team.created');

  res.status(200).json({ data: team });
};
