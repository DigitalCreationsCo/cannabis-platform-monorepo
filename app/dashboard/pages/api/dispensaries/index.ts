import { slugify, ApiError, FreshSales } from '@cd/core-lib';
import {
  createDispensary,
  getStaffMemberDispensaries,
  isTeamExists,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import { recordMetric } from '@/lib/metrics';
import { getCurrentUser } from '@/lib/user';
import { createTeamSchema, validateWithSchema } from '@/lib/zod';
import Twilio from '@cd/core-lib/src/sms/twilio';

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
  const client = await clientPromise;
  const user = await getCurrentUser(req, res);
  const teams = await getStaffMemberDispensaries({
    client,
    where: { userId: user.id },
  });

  recordMetric('team.fetched');

  res.status(200).json({ data: teams });
};

// Create a team
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const create = validateWithSchema(createTeamSchema, req.body);

  const user = await getCurrentUser(req, res);
  const slug = slugify(create.name);

  if (await isTeamExists({ client, where: { slug } })) {
    throw new ApiError(400, 'A team with the slug already exists.');
  }

  let weedTextPhoneNumber: string;
  if (create.isSubscribedForMessaging) {
    weedTextPhoneNumber = await Twilio.provisionSMSPhoneNumber(slug);
  }
  const weedTextSegmentId = await FreshSales.createSegment(slug);

  const team = await createDispensary({
    client,
    userId: user.id,
    data: {
      ...create,
      name: create.name,
      slug,
      weedTextSegmentId,
      weedTextPhoneNumber,
    },
  });

  recordMetric('team.created');

  res.status(200).json({ data: team });
};
