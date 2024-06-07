/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { FreshSales, throwIfNotAllowed } from '@cd/core-lib';
import Slicktext from '@cd/core-lib/src/sms/slicktext';
import { type Customer, createCustomer } from '@cd/data-access';
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

/*
 * THe same functionality can be created using Twilio API (Text 'join' to 42424)
 * So, possibly cancel this feature.
 * Use Segment routing to add contacts from sms subscription to FreshSales crm.
 */
// Invite Customer to daily deals messages
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamMember = await throwIfNoDispensaryAccess(req, res);
  throwIfNotAllowed(teamMember, 'team_customers', 'send');
  // const client = await clientPromise;

  // const customer = req.body as Customer;
  // const slickTextTextwordId = '4084547';

  // await createCustomer({
  // 	client,
  // 	data: { ...customer, slickTextTextwordId },
  // });

  // create or upsert crm contact?
  // if create, must be unique,
  // recordMetric('dispensary.customer.created');

  // await Slicktext.optInCustomer(customer);

  res.status(200).json('nothing happened');
};
