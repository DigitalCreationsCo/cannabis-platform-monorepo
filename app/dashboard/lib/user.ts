import { getStaffMemberWithDispensary } from '@cd/data-access';
import { getSession } from '../lib/session';
import { clientPromise } from './db';
import { teamSlugSchema, validateWithSchema } from './zod';

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
	const { slug } = validateWithSchema(teamSlugSchema, req.query);

	const { role, team } = await getStaffMemberWithDispensary({
		client,
		where: { id: user.id, teamSlug: slug },
	});

	return {
		...user,
		role,
		team,
	};
};
