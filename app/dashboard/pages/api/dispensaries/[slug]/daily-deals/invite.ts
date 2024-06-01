/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { clientPromise } from '@/lib/db';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';
import { sendAudit } from '@/lib/retraced';
import { sendEvent } from '@/lib/svix';
import { axios, throwIfNotAllowed } from '@cd/core-lib';
import Slicktext from '@cd/core-lib/src/sms/slicktext';
import {
  deleteDispensaryDailyDeal,
  updateDispensaryDailyDeal,
  type DailyDeal,
  createDispensaryDailyDeal,
  type Customer,
  getOneCustomerByDispensary,
  upsertCustomerByDispensary,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

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
      // case 'DELETE':
      // 	await handleDELETE(req, res);
      // 	break;
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

// Invite Customer to daily deals messages
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_customers', 'send');
  const client = await clientPromise;

  const customer = req.body as Customer;
  const slickTextTextwordId = '4034501';

  await upsertCustomerByDispensary({
    client,
    data: { ...customer, slickTextTextwordId },
  });

  recordMetric('dispensary.customer.fetched');

  await Slicktext.optInCustomer(customer);

  res.status(200).json({});
};
