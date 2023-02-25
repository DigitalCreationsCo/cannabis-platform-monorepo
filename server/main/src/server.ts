import { websiteDomain } from '@cd/shared-config/auth/appInfo';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import Supertokens from 'supertokens-node';
import { errorHandler, middleware } from 'supertokens-node/framework/express';
import { driver, error, organization, session, shop, user } from './api/routes';
import { backendConfig } from './config/backendConfig';
console.log('Starting server...');
console.log('supertokens connection string: ', process.env.SUPERTOKENS_CONNECTION_URI);
console.log('node env: ', process.env.NODE_ENV);

if (Supertokens) {
    Supertokens.init(backendConfig());
} else throw Error('Supertokens is not available.');
const app = express();
app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ['content-type', ...Supertokens.getAllCORSHeaders()],
        credentials: true
    })
);
app.use(middleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/healthcheck', (req, res) => {
    return res.status(200).json('OK');
});
// app.get('/api/v1/session', async (req:SessionRequest, res, next) => {
//     try {
//         await verifySession()(req, res, next);
//         // await superTokensNextWrapper(
//         //     async (next) => {
//         //         return await verifySession()(req, res, next);
//         //     },
//         //     req,
//         //     res
//         // );
//         // console.log('getting session from supertokens');
//         let sessionData = req.session;
//         console.log('session data: ', sessionData);

//         // console.log('Session available?: ', req.session)
//         // return res.status(200).json({
//         //     note: "Fetch any data from your application for authenticated user after using verifySession middleware",
//         //     session: req.session.getSessionData(),
//         //     user: req.session.getUserId(),
//         //     accessTokenPayload: req.session.getAccessTokenPayload(),
//         // });
//         // const session = {
//         //     user: {
//         //         username: 'kbarnes',
//         //         firstName: 'Katie',
//         //         lastName: 'Barnes',
//         //         memberships: [{ organizationId: '2' }]
//         //     }
//         // };
//         // console.log('Session: SERVER: ', req.session)
//         const session = {
//             user: null
//         }
//         return res.send({ session, user: session.user });
//     } catch (error) {
//         console.log('API error: ', error);
//         res.status(500).json({ error });
//     }
// });

app.use('/api/v1/auth', user);
app.use('/api/v1/driver', driver);
app.use('/api/v1/session', session);
app.use('/api/v1/shop', shop);
app.use('/api/v1/organization', organization);
// error handling test routes
app.use('/api/v1/error', error);
// supertokens errorhandler
app.use(errorHandler());
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => { /* ... */ });
app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;
