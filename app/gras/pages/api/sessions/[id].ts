import { deleteSession, findFirstSessionOrThrown } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@/lib/session';
import { validateWithSchema, deleteSessionSchema } from '@/lib/zod';
import { clientPromise } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'DELETE':
        await handleDELETE(req, res);
        break;
      default:
        res.setHeader('Allow', 'DELETE');
        res.status(405).json({
          error: { message: `Method ${req.method} Not Allowed` },
        });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;

    res.status(status).json({ error: { message } });
  }
}

// Delete a session for the current user
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const { id } = validateWithSchema(deleteSessionSchema, req.query);

  const session = await getSession(req, res);

  await findFirstSessionOrThrown({
    client,
    where: {
      id,
      userId: session?.user.id,
    },
  });

  await deleteSession({
    client,
    where: {
      id,
    },
  });

  res.status(204).end();
};
