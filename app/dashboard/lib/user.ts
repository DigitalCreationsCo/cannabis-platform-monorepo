import { type StaffMember, getStaffMember } from '@cd/data-access';
import { getSession } from '../lib/session';
import { clientPromise } from './db';

// Get current user from session
export const getCurrentUser = async (req: any, res: any) => {
  const session = await getSession(req, res);

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session.user;
};

export const getCurrentUserWithDispensary = async (req: any, res: any) => {
  const user = await getCurrentUser(req, res);
  const client = await clientPromise;
  // const { slug } = validateWithSchema(teamSlugSchema, req.query);
  const { slug } = req.query as { slug: string };

  const { role, team } = (await getStaffMember({
    client,
    where: { userId: user.id, slug },
  })) as StaffMember;

  return {
    ...user,
    role,
    team,
  };
};
