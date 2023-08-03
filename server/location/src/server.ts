import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import Supertokens from 'supertokens-node';
import { errorHandler, middleware } from 'supertokens-node/framework/express';
import { serveLocal } from './api/routes';
import { backendConfig } from './config/backendConfig';

const shopDomain = process.env.NEXT_PUBLIC_SHOP_APP_URL;
const dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;

if (Supertokens) {
	Supertokens.init(backendConfig());
} else throw Error('Supertokens is not available.');

const app = express();
app.use(
	cors({
		origin: [shopDomain, dashboardDomain],
		allowedHeaders: ['content-type', ...Supertokens.getAllCORSHeaders()],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
	})
);
app.use(middleware());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/healthcheck', (_, res) => {
	return res.status(200).json({ status: 'ok', server: 'location' });
});

app.use('/api/v1/serve-local', serveLocal);

app.use(errorHandler());
app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;
