import express from 'express';
import supertokens from 'supertokens-node';
import { backendConfig } from './config/backendConfig';

import { websiteDomain } from '@cd/shared-config/auth/appInfo';
import cors from 'cors';
import { errorHandler, middleware } from 'supertokens-node/framework/express';

import bodyParser from 'body-parser';
import http from 'http';
import { driver, error, organization, shop, user } from './api/routes';

supertokens.init(backendConfig());

const app = express();
app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);
app.use(middleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/healthcheck', (req, res) => {
    return res.status(200).json('OK');
});
app.use('/api/v1/auth', user);
app.use('/api/v1/driver', driver);
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
