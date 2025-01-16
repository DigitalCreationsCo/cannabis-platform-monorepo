import { getSession } from './session';

// Get current user from session
export const getCurrentUser = async (req: any, res: any) => {
	const session = await getSession(req, res);

	if (!session) {
		throw new Error('Unauthorized');
	}

	return session.user;
};
