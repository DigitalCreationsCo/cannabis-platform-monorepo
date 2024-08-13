import env from '@/lib/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method !== 'GET') {
			throw new Error('Method not allowed');
		}
		const session = await getSession({ req });
		if (!session) {
			throw { status: 401, message: 'Unauthorized' };
		}
		res.status(200).json({ ...env });
	} catch (error: any) {
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;
		res.status(status).json({ error: { message } });
	}
}
