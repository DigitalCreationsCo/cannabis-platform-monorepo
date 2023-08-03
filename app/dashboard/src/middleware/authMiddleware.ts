import { User } from '@cd/data-access';
import { NextApiRequest, NextApiResponse } from 'next';
import { SessionInformation } from 'supertokens-node/recipe/session';
// import { getToken } from 'next-auth/jwt';

export type ExtendRequest = NextApiRequest & {
	session?: SessionInformation;
	user?: User;
	organizationId?: string;
};

export default async function authMiddleware(
	req: ExtendRequest,
	res: NextApiResponse,
	next: any
) {
	try {
		// const token = await getToken({ req });
		next();
	} catch (error: any) {
		console.error('auth middleware error', error.message);
		throw new Error(error.message);
	}
}
