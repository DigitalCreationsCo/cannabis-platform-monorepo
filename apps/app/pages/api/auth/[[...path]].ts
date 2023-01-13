import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { middleware } from 'supertokens-node/framework/express'
import { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from 'express';
import supertokens from 'supertokens-node'
import { backendConfig } from '../../../config/backendConfig'
import NextCors from "nextjs-cors";
import { websiteDomain } from '@cd/shared-config/auth/appInfo';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { ExtendRequest } from '../../../src/middleware';

supertokens.init(backendConfig())

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
      return await verifySession()(req, res, next)
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