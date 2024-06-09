/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { CronJobApi, axios, throwIfNotAllowed } from '@cd/core-lib';
import {
  updateDispensaryDailyDeal,
  type DailyDeal,
  createDispensaryDailyDeal,
  getDispensaryDailyDeals,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';
import { sendAudit } from '@/lib/retraced';

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
      case 'PATCH':
        await handlePATCH(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET, POST, PATCH');
        res.status(405).json({
          error: { message: `Method ${method} Not Allowed` },
        });
    }
  } catch (error: any) {
    console.error('/daily-deals error: ', error);
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;

    res.status(status).json({ error: { message } });
  }
}

// get team daily deals
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_daily_deals', 'read');
  const client = await clientPromise;

  const dailyDeals = await getDispensaryDailyDeals({
    client,
    where: { slug: teamMember.team.slug },
  });

  recordMetric('dispensary.dailyDeal.fetched');

  res.status(200).json({ data: dailyDeals });
};

// Create dailyDeal
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_member', 'create');
  const client = await clientPromise;

  const deal = req.body as DailyDeal;

  if (deal.schedule && deal.doesRepeat) {
    deal.jobId = await CronJobApi.createDailyDealJob(deal);
  }

  const dailyDealCreated = await createDispensaryDailyDeal({
    client,
    data: deal,
  });

  sendAudit({
    action: 'team.daily_deals.create',
    crud: 'u',
    user: teamMember.user,
    team: teamMember.team,
  });

  recordMetric('dispensary.dailyDeal.created');

  res.status(201).json({ data: dailyDealCreated });
};

// Update dailyDeal
const handlePATCH = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_member', 'update');
  const client = await clientPromise;

  const update = req.body as DailyDeal;

  const { doesRepeat, teamSlug, schedule, id, startTime, endTime, timezone } =
    update;
  const [minutes, hours, mdays, months, wdays] = schedule.split(' ');

  const dailyDealUpdated = await updateDispensaryDailyDeal({
    client,
    data: update,
  });

  if (doesRepeat && update.jobId) {
    await CronJobApi.updateDailyDealJob(update.jobId, update);
  } else {
    await CronJobApi.deleteDailyDealJob(update.jobId);
  }

  sendAudit({
    action: 'team.daily_deals.update',
    crud: 'u',
    user: teamMember.user,
    team: teamMember.team,
  });

  recordMetric('dispensary.dailyDeal.updated');

  res.status(200).json({ data: dailyDealUpdated });
};
