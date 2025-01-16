import {
	getStaffMemberWithDispensary,
	type StaffMemberWithDispensary,
} from '@gras/data-access';
import { getSession } from '../lib/session';
import { clientPromise } from './db';

/**
 * Check if the current user has access to the team
 * Should be used in API routes to check if the user has access to the team
 *
 */
export const throwIfNoDispensaryAccess = async (
	req: any,
	res: any
): Promise<StaffMemberWithDispensary> => {
	const client = await clientPromise;
	const session = await getSession(req, res);
	if (!session) {
		throw new Error('Unauthorized');
	}

	const { slug } = req.query as { slug: string };
	const staffMember = await getStaffMemberWithDispensary({
		client,
		where: { teamSlug: slug, id: session.user.id },
	});

	if (!staffMember) {
		throw new Error('You do not have access to this team');
	}
	return {
		...session.user,
		...staffMember,
		image: session.user.image || staffMember.image || '',
	};
};
