/* eslint-disable @typescript-eslint/naming-convention */
import { axios, throwIfNotAllowed } from '@cd/core-lib';
import {
  deleteDispensaryDailyDeal,
  updateDispensaryDailyDeal,
  type DailyDeal,
  createDispensaryDailyDeal,
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
      case 'POST':
        await handlePOST(req, res);
        break;
      case 'DELETE':
        await handleDELETE(req, res);
        break;
      case 'PATCH':
        await handlePATCH(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET, POST, DELETE, PATCH');
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
      message: 'This is a test daily deal.',
      startTime: new Date(),
      endTime: new Date(),
      doesRepeat: false,
      schedule: 'daily',
      teamSlug: teamMember.team.slug,
      timezone: 'America/New_York',
    },
  ];

  recordMetric('dispensary.dailyDeal.fetched');

  res.status(200).json({ data: dailyDeals });
};

// Create dailyDeal
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_member', 'create');

  const create = req.body as DailyDeal;

  const dailyDealCreated = await createDispensaryDailyDeal(create);

  const { doesRepeat, teamSlug, schedule, id, startTime, endTime, timezone } =
    dailyDealCreated;

  const [minutes, hours, mdays, months, wdays] = schedule.split(' ');
  if (doesRepeat) {
    // schedule cron job to send notification to users
    await axios.put(
      `https://api.cron-job.org/jobs`,
      {
        job: {
          title: `Daily Deal ${teamSlug}: ${id}-${startTime?.toISOString()}`,
          enabled: true,
          folderId: 36202,
          schedule: {
            timezone,
            minutes,
            hours,
            mdays,
            months,
            wdays,
            expiresAt: endTime?.toISOString() || 0,
          },
          url: `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/api/dispensaries/${teamSlug}/daily-deals/${id}`,
          notification: {
            onFailure: true,
            onSuccess: true,
            onDisable: true,
          },
          requestMethod: 'GET',
          headers: { Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}` },
          body: dailyDealCreated,
        },
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  sendAudit({
    action: 'team.daily_deals.create',
    crud: 'u',
    user: teamMember.user,
    team: teamMember.team,
  });

  recordMetric('dispensary.dailyDeal.created');

  res.status(200).json({ data: dailyDealCreated });
};

// Delete dailyDeal
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_daily_deals', 'delete');

  const { id } = req.query as { id: string };

  const dailyDealRemoved = await deleteDispensaryDailyDeal(id);

  // DELETE cron job
  await axios.delete(
    `https://api.cron-job.org/jobs/${teamMember.team.slug}:${id}`,
    {
      headers: { Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}` },
    }
  );

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

  const dailyDealUpdated = await updateDispensaryDailyDeal(update);

  // UPDATE CRON JOB

  sendAudit({
    action: 'team.daily_deals.update',
    crud: 'u',
    user: teamMember.user,
    team: teamMember.team,
  });

  recordMetric('dispensary.dailyDeal.updated');

  res.status(200).json({ data: dailyDealUpdated });
};
