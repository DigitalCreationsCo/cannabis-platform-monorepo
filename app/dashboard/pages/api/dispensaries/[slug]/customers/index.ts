/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { clientPromise } from '@/lib/db';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';
import { sendAudit } from '@/lib/retraced';
import { axios, throwIfNotAllowed } from '@cd/core-lib';
import {
  type DailyDeal,
  createDispensaryDailyDeal,
  getCustomersByDispensary,
} from '@cd/data-access';
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

// get all customers
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_customers', 'read');

  const customers = getCustomersByDispensary({
    client,
    where: { teamSlug: teamMember.team.slug },
  });
  recordMetric('dispensary.customers.fetched');

  res.status(200).json({ data: customers });
};

// Create dailyDeal
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_member', 'create');

  const create = req.body as DailyDeal;

  const dailyDealCreated = await createDispensaryDailyDeal({
    client,
    data: create,
  });

  const { doesRepeat, teamSlug, schedule, id, startTime, endTime, timezone } =
    dailyDealCreated;

  const [minutes, hours, mdays, months, wdays] = schedule.split(' ');
  if (doesRepeat) {
    // schedule cron job to send notification to users
    await axios.put(
      `https://api.cron-job.org/jobs`,
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
