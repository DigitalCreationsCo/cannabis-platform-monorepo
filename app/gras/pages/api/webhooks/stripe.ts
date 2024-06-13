/* eslint-disable @typescript-eslint/naming-convention */
import type { Readable } from 'node:stream';
import {
  createStripeSubscription,
  deleteStripeSubscription,
  getBySubscriptionId,
  getDispensaryByCustomerId,
  updateStripeSubscription,
  getServiceByPriceId,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import { stripe } from '@/lib/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Get raw body as string
async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks: any[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const relevantEvents: Stripe.Event.Type[] = [
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
];

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const rawBody = await getRawBody(req);

  const sig = req.headers['stripe-signature'] as string;
  const { webhookSecret } = env.stripe;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return;
    }
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    return res.status(400).json({ error: { message: err.message } });
  }

  if (relevantEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case 'customer.subscription.created':
          await handleSubscriptionCreated(event);
          break;
        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event);
          break;
        case 'customer.subscription.deleted':
          await deleteStripeSubscription({
            client,
            where: { id: (event.data.object as Stripe.Subscription).id },
          });
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      return res.status(400).json({
        error: {
          message: 'Webhook handler failed. View your nextjs function logs.',
        },
      });
    }
  }
  return res.status(200).json({ received: true });
}

async function handleSubscriptionUpdated(event: Stripe.Event) {
  const client = await clientPromise;

  const {
    cancel_at,
    id,
    status,
    current_period_end,
    current_period_start,
    customer,
  } = event.data.object as Stripe.Subscription;

  const subscription = await getBySubscriptionId({
    client,
    where: { subscriptionId: id },
  });
  if (!subscription) {
    const teamExists = await getDispensaryByCustomerId({
      client,
      where: { billingId: customer as string },
    });
    if (!teamExists) {
      return;
    } else {
      await handleSubscriptionCreated(event);
    }
  } else {
    // type Stripe.Subscription.Status = "active" | "canceled" | "incomplete" | "incomplete_expired" | "past_due" | "paused" | "trialing" | "unpaid"
    await updateStripeSubscription({
      client,
      data: {
        id,
        active: status === 'active',
        endDate: current_period_end
          ? new Date(current_period_end * 1000)
          : undefined,
        startDate: current_period_start
          ? new Date(current_period_start * 1000)
          : undefined,
        cancelAt: cancel_at ? new Date(cancel_at * 1000) : undefined,
      },
    });
    const [product, team] = await Promise.all([
      getServiceByPriceId({ client, where: { priceId: subscription.priceId } }),
      getDispensaryByCustomerId({
        client,
        where: { billingId: subscription.customerId },
      }),
    ]);
    if (!product || !team) return;
  }
}

async function handleSubscriptionCreated(event: Stripe.Event) {
  const client = await clientPromise;

  const { customer, id, current_period_start, current_period_end, items } =
    event.data.object as Stripe.Subscription;

  await createStripeSubscription({
    client,
    data: {
      customerId: customer as string,
      id,

      active: true,
      startDate: new Date(current_period_start * 1000),
      endDate: new Date(current_period_end * 1000),
      priceId: items.data.length > 0 ? items.data?.[0]?.plan?.id || '' : '',
    },
  });
}
