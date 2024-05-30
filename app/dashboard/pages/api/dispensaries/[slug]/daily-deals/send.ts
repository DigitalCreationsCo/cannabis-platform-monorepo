/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { throwIfNotAllowed } from '@cd/core-lib';
import Slicktext from '@cd/core-lib/src/sms/slicktext';
import { type DailyDeal } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
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

    const message = req.body as DailyDeal;

    await Slicktext.sendToList({
      textword: message.slickTextTextwordId!,
      segment: message.slickTextSegmentId!,
      message,
    });

    recordMetric('dispensary.dailyDeal.sent');

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res
      .status(error.response.status)
      .json({ error: { message: 'An error occurred. Try again later.' } });
  }
};
