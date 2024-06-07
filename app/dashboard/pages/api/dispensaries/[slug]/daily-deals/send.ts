/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { throwIfNotAllowed } from '@cd/core-lib';
import { updateDispensaryDailyDeal, type DailyDeal } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        await handlePOST(req, res);
        break;
      default:
        res.setHeader('Allow', 'POST');
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

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const teamMember = await throwIfNoDispensaryAccess(req, res);
    throwIfNotAllowed(teamMember, 'team_daily_deals', 'read');
    const client = await clientPromise;

    const message = req.body as DailyDeal;

    // TODO:
    // TWILIO.SEND()

    // const response = await Slicktext.sendToList({
    // 	textword: teamMember.team.slickTextTextwordId!,
    // 	segment: teamMember.team.slickTextSegmentId!,
    // 	message,
    // });

    recordMetric('dispensary.dailyDeal.sent');

    await updateDispensaryDailyDeal({
      client,
      data: {
        ...message,
        lastSentAt: Date.now().toString(),
      },
    });

    recordMetric('dispensary.dailyDeal.updated');

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res
      .status(error.response.status)
      .json({ error: { message: 'An error occurred. Try again later.' } });
  }
};
