import { type StaffMemberWithUser, getStaffMember } from '@cd/data-access';
import { getSession } from '../lib/session';

/**
 * Check if the current user has access to the team
 * Should be used in API routes to check if the user has access to the team
 *
 */
export const throwIfNoDispensaryAccess = async (
  req: any,
  res: any
): Promise<StaffMemberWithUser> => {
  const session = await getSession(req, res);

  if (!session) {
    throw new Error('Unauthorized');
  }

  const { slug } = req.query as { slug: string };

  const staffMember = await getStaffMember(session.user.id, slug);

  console.info('staffMember: ', staffMember);
  if (!staffMember) {
    throw new Error('You do not have access to this team');
  }

  return {
    ...staffMember,
    user: {
      ...session.user,
      ...staffMember.user,
      image: session.user.image || '',
    },
  };
};
