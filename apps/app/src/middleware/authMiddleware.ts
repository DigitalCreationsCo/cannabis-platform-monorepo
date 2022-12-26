import { NextApiRequest, NextApiResponse } from 'next';
import {User} from '@cd/data-access'
// import { getToken } from 'next-auth/jwt';

export type ExtendRequest = NextApiRequest & { user: User };

export default async function authMiddleware(req: ExtendRequest, res: NextApiResponse, next: Function) {
  try {
    // const token = await getToken({ req });
    next();
  } catch (error) {
    throw new Error(error.message);
  }
}
