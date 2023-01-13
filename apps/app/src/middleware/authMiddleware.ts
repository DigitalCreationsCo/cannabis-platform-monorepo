import { NextApiRequest, NextApiResponse } from 'next';
import { EmployeeUserData, EmployeeUserSession, User } from '@cd/data-access';
import { SessionInformation } from 'supertokens-node/recipe/session';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { SessionRequest } from 'supertokens-node/framework/express';
import { urlBuilder } from '../utils';
import axios from 'axios';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { middleware } from 'supertokens-node/framework/express'
import { Request, Response } from 'express';
import supertokens from 'supertokens-node'
import { backendConfig } from '../../config/backendConfig'
import NextCors from "nextjs-cors";
import { websiteDomain } from '@cd/shared-config/auth/appInfo';
// import { superTokensNextWrapper } from 'supertokens-node/nextjs'
// import { getToken } from 'next-auth/jwt';

supertokens.init(backendConfig())

export type ExtendRequest = NextApiRequest & {
    session: SessionInformation;
    user: EmployeeUserData;
};

// export default async function superTokens(
//   req: NextApiRequest & Request,
//   res: NextApiResponse & Response
// ) {
    
// what does this middleware do?
// this middleware, will get userdata from ss stored jwt access token,
// it will add the user data to request, which will be used in the following api call,
// this way, any metadata (id, organizationId, etc) is available for the backend data requests

// export default async function authMiddleware(req: ExtendRequest & Request, res: any, next: any) {
//     try {
//         console.log('REQ: ', req.headers)
//         const { data } = await axios.post(urlBuilder.main.verifySession(), req, {
//             headers: req.headers
//         })
//         if (data !== undefined) {
//             console.log(data)
//             console.log('session exists')
//         } else {
//             console.log('session does not exist')
//         }
//         const user: EmployeeUserData = {
//             id: '1',
//             username: 'kbarnes',
//             firstName: 'Katie',
//             lastName: 'Barnes',
//             organizationId: '2',
//             email: 'kb@gmail.com',
//         };
//         req.user = user;

//         console.log('auth middleware 5');
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

export default async function superTokens(
  req: any,
  res: any
) {

  // NOTE: We need CORS if we are querying the APIs from a different origin
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: websiteDomain,
    credentials: true,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  });

  await superTokensNextWrapper(
    async (next) => {
      res.setHeader(
          "Cache-Control",
          "no-cache, no-store, max-age=0, must-revalidate"
      );
      await middleware()(req, res, next)
    //   return await verifySession()(req, res, next)
    },
    req,
    res
  )
  if (!res.writableEnded) {
    res.status(404).send('Not found')
  }

  return res.json({
      note:
          'Fetch any data from your application for authenticated user after using verifySession middleware',
      userId: req.session.getUserId(),
      sessionHandle: req.session.getHandle(),
      userDataInAccessToken: req.session.getAccessTokenPayload(),
  })
}

// extract this function out, use supertokens
function getUserInfoFromAccessToken(req) {
    return {
        user: getUserFromSession(req),
        session: getSession(req),
    };
}

const getUserFromSession = (req) => {
    try {
        const session = getSession(req);
        // const user:EmployeeUserSession = session.user
        const user: EmployeeUserData = {
            id: '1',
            username: 'kbarnes',
            firstName: 'Katie',
            lastName: 'Barnes',
            organizationId: '2',
            email: 'kb@gmail.com',
        };
        if (typeof user !== undefined) {
            return user;
        } else {
            throw Error('no user credentials found. Could not continue this request.');
        }
    } catch (error) {
        throw Error('no user session found! Something else happened.');
    }
};

const getSession = (req) => {
    try {
        const session = req.session;
        return session;
    } catch (error) {
        return Error('no session found. Did you forget to sign in?');
    }
};