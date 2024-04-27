import { getStaffMember } from '@cd/data-access';
import { getSession } from '../lib/session';

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

  // const { slug } = validateWithSchema(teamSlugSchema, req.query);
  const { slug } = req.query as { slug: string };

  const { role, team } = await getStaffMember(user.id, slug);

  return {
    ...user,
    role,
    team,
  };
};
