// import { baseDomain, websiteDomain } from '@cd/core-lib';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import Supertokens from 'supertokens-node';
import { errorHandler, middleware } from 'supertokens-node/framework/express';
import { SessionInfo } from './api/controllers/session.controller';
import { errorRoute, organization, shop, user } from './api/routes';
import { backendConfig } from './config/backendConfig';

if (Supertokens) {
    Supertokens.init(backendConfig());
} else throw Error('Supertokens is not available.');

const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "http://app.localhost:3000"],
        allowedHeaders: ['content-type', ...Supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true
    })
);

app.use(middleware());

// IF I HAVE ISSUES WITH MULTIPARTFORM IN THE FUTURE, CHECK THIS SETTING AGAIN!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/healthcheck', (req, res) => {
    return res.status(200).json('OK');
});

app.use('/api/v1/user', user);

// app.use('/api/v1/driver', driver);

// app.get('/api/v1/session', verifySession(), async (req:SessionRequest, res) => {
//     try{
//         console.log('session route')
//         // const session = {
//         //     user: {
//         //         username: 'kbarnes',
//         //         firstName: 'Katie',
//         //         lastName: 'Barnes',
//         //         memberships: [{ organizationId: '2' }]
//         //     }
//         // };
//         // res.send({
//         //     sessionHandle: session.getHandle(),
//         //     userId: session.getUserId(),
//         //     sessionData: await session.getSessionData(),
//         //   });s
//         const _session =  req.session;
//         console.log(_session)
//         const sessionFromDb = await SessionDA.getSession(_session.getHandle());
//         console.log('session from db: ', sessionFromDb)
//         const { user, ...session } = sessionFromDb;
//         res.status(200).json({ status: true, session: {session}, user });
//     } catch (error: any) {
//         console.log('API error: ', error);
//         // if (error.type === Session.Error.TRY_REFRESH_TOKEN) {
//         //     console.log('try refresh token error: ', error);
//         //     return res.status(200).json({ status: false, error });
//         //     // return { props: { fromSupertokens: 'needs-refresh' } }
//         // } else if (error.type === Session.Error.UNAUTHORISED) {
//         //     console.log('unauthorized error: ', error)
//         //     return res.status(200).json({ status: false, error });
//         // }
//         res.status(200).json({ status: false, error });
//     }
// });
// app.use('/api/v1/session', session);

app.use('/api/v1/shop', shop);

app.use('/api/v1/organization', organization);

// error handling test routes
app.use('/api/v1/error', errorRoute);

// supertokens errorhandler
app.use(errorHandler());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.message === 'Please reset your password') {
        return res.status(401).send(err.message)
    }
    if (err.message === 'Invalid password') {
        return res.status(401).send(err.message)
    }
    res.status(500).send(err.message)
})

// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => { /* ... */ });

// app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;

export type SessionResponse = {
    status: boolean;
    session: SessionInfo;
}