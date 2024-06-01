import { getStaffMember } from '@cd/data-access/src';
import { getSession } from '../lib/session';
import { clientPromise } from './db';

/**
 * Check if the current user has access to the team
 * Should be used in API routes to check if the user has access to the team
 *
 */
export const throwIfNoDispensaryAccess = async (req: any, res: any) => {
  const session = await getSession(req, res);

  if (!session) {
    throw new Error('Unauthorized');
  }
  const client = await clientPromise;

  const { slug } = req.query as { slug: string };

  const staffMember = await getStaffMember({
    client,
    where: { userId: session.user.id, slug },
  });

  if (!staffMember) {
    throw new Error('You do not have access to this team');
  }

  return {
    ...staffMember,
    user: {
      ...session.user,
    },
  };
};
