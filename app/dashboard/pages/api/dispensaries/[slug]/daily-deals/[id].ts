/* eslint-disable @typescript-eslint/naming-convention */
import { clientPromise } from '@/lib/db';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';
import { throwIfNotAllowed } from '@cd/core-lib';
import { getDailyDeal } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

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
      default:
        res.setHeader('Allow', 'GET');
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

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_daily_deals', 'read');

  const { id } = req.query as { id: string };
  const dailyDeal = await getDailyDeal({
    client,
    where: { slug: teamMember.team.slug, id },
  });

  recordMetric('dispensary.dailyDeal.fetched');

  res.status(200).json({ data: dailyDeal });
};
