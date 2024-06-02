/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { axios, throwIfNotAllowed } from '@cd/core-lib';
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

  const create = req.body as DailyDeal;
  const { doesRepeat, teamSlug, schedule, id, startTime, endTime, timezone } =
    create;
  const [minutes, hours, mdays, months, wdays] = schedule
    .split(' ')
    .reduce((arr, t) => {
      t = t.replace(/\*/g, '-1');
      arr.push([t]);
      return arr;
    }, [] as string[][]);

  console.info('time zone??!! ', timezone);
  console.info('schedule: ', schedule);
  console.info('schedule: ', minutes, hours, mdays, months, wdays);
  console.info('start time ', startTime);
  console.info('end time ', endTime);

  if (schedule) {
    // create cron job
    const response = await axios.put<{ jobId: string }>(
      `https://api.cron-job.org/jobs`,
      {
        job: {
          title: `Daily Deal ${teamSlug}:${startTime}`,
          enabled: true,
          folderId: 36202,
          schedule: {
            timezone,
            minutes,
            hours,
            mdays,
            months,
            wdays,
            expiresAt: endTime || 0,
          },
          url: `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/api/dispensaries/${teamSlug}/daily-deals/send`,
          notification: {
            onFailure: true,
            onSuccess: true,
            onDisable: true,
          },
          requestMethod: '1',
          headers: { Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}` },
          body: create,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CRON_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const { jobId } = response.data;
    create.jobId = jobId;
  }

  const dailyDealCreated = await createDispensaryDailyDeal({
    client,
    data: create,
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

  if (update.jobId) {
    // UPDATE CRON JOB
    await axios.patch<{ jobId: string }>(
      `https://api.cron-job.org/jobs/${update.jobId}`,
      {
        job: {
          title: `Daily Deal ${teamSlug}: ${id}-${startTime}`,
          enabled: true,
          folderId: 36202,
          schedule: {
            timezone,
            minutes,
            hours,
            mdays,
            months,
            wdays,
            expiresAt: endTime || 0,
          },
          url: `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/api/dispensaries/${teamSlug}/daily-deals/send`,
          notification: {
            onFailure: true,
            onSuccess: true,
            onDisable: true,
          },
          requestMethod: 'POST',
          headers: { Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}` },
          body: dailyDealUpdated,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CRON_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
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
