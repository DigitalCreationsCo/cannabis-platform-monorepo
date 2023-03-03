import { websiteDomain } from '@cd/shared-config/auth/appInfo';
import cors from 'cors';
import express from 'express';
import http from 'http';
import Supertokens from 'supertokens-node';
import { errorHandler, middleware, SessionRequest } from 'supertokens-node/framework/express';
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { error, organization, shop } from './api/routes';
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

// IF I HAVE ISSUES WITH MULTIPARTFORM IN THE FUTURE, CHECK THIS SETTING AGAIN!
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use('/api/v1/healthcheck', (req, res) => {
//     return res.status(200).json('OK');
// });
// app.use('/api/v1/auth', user);
// app.use('/api/v1/driver', driver);
app.get('/api/v1/session', verifySession(), async (req:SessionRequest, res) => {
    const session2 = req.session
    const session = {
        user: {
            username: 'kbarnes',
            firstName: 'Katie',
            lastName: 'Barnes',
            memberships: [{ organizationId: '2' }]
        }
    };
    return res.status(200).json({ session, user: session.user });
});
// app.use('/api/v1/session', session);
app.use('/api/v1/shop', shop);
app.use('/api/v1/organization', organization);
// error handling test routes
app.use('/api/v1/error', error);
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
