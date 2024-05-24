/* eslint-disable @typescript-eslint/naming-convention */
import { throwIfNotAllowed } from '@cd/core-lib';
import {
  getDispensaryDailyDeals,
  deleteDispensaryDailyDeal,
  updateDispensaryDailyDeal,
  type DailyDeal,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';
import { sendAudit } from '@/lib/retraced';
import { sendEvent } from '@/lib/svix';

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
      case 'PATCH':
        await handlePATCH(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET, DELETE, PATCH');
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
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_daily_deals', 'read');

  // const dailyDeals = await getDispensaryDailyDeals(teamMember.team.slug);

  const dailyDeals: DailyDeal[] = [
    {
      id: '1',
      title: 'Test',
      description: 'This is a test daily deal.',
      isExpired: false,
      teamSlug: teamMember.team.slug,
      startTime: new Date(),
    },
  ];

  recordMetric('dispensary.dailyDeal.fetched');

  res.status(200).json({ data: dailyDeals });
};

// Delete dailyDeal
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_daily_deals', 'delete');

  const { id } = req.query as { id: string };

  const dailyDealRemoved = await deleteDispensaryDailyDeal(id);

  await sendEvent(
    teamMember.teamId,
    'dispensary.dailyDeal.removed',
    dailyDealRemoved
  );

  sendAudit({
    action: 'team.daily_deals.delete',
    crud: 'd',
    user: teamMember.user,
    team: teamMember.team,
  });

  recordMetric('dispensary.dailyDeal.removed');

  res.status(200).json({ data: {} });
};

// Update dailyDeal
const handlePATCH = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_member', 'update');

  const update = req.body as DailyDeal;

  // const { memberId, role } = validateWithSchema(
  // 	updateMemberSchema,
  // 	req.body as { memberId: string; role: Role },
  // );

  const dailyDealUpdated = await updateDispensaryDailyDeal(update);

  sendAudit({
    action: 'team.daily_deals.update',
    crud: 'u',
    user: teamMember.user,
    team: teamMember.team,
  });

  recordMetric('dispensary.dailyDeal.updated');

  res.status(200).json({ data: dailyDealUpdated });
};
