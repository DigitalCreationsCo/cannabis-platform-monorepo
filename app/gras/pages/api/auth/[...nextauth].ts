import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/nextAuth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	const authOptions = getAuthOptions(req, res);

	return await NextAuth(req, res, authOptions);
}
