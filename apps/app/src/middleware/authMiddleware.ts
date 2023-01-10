import { NextApiRequest, NextApiResponse } from 'next';
import {User} from '@cd/data-access'
import { SessionInformation } from 'supertokens-node/recipe/session';
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";

// import { getToken } from 'next-auth/jwt';

export type ExtendRequest = NextApiRequest & {
  session?: SessionInformation
  user?: User;
  organizationId?: string;
};

export default async function authMiddleware(req: SessionRequest, res: any, next: Function) {
  try {
    await verifySession()(req, res, next())
    let userId = req?.session?.getUserId();
    console.log('auth middleware user id: ', userId)
    // let userInfo = await EmailPassword.getUserById({userId})
    next();
  } catch (error) {
    throw new Error(error.message);
  }
}
