import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { raw } from 'express';
import Supertokens from 'supertokens-node';
import {
	errorHandler as SupertokensErrorHandler,
	middleware,
} from 'supertokens-node/framework/express';
import { accountRoutes, paymentRoutes } from './api/routes';
import StripeService from './api/stripe';
import backendConfig from './config';

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
	}),
);
app.use(middleware());

app.post('/webhook', raw({ type: '*/*' }), async (req, res) => {
	const payload = req.body;
	const sig = req.headers['stripe-signature'];
	try {
		const event = StripeService.constructStripeEvent(payload, sig);
		await StripeService.handleWebhookEvents(event);
		res.status(200).end();
	} catch (error: any) {
		console.error('stripe weebook error: ', error.message);
		return res.status(400).json({ error: `Webhook Error: ${error.message}` });
	}
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/healthcheck', (_, res) => {
	return res.status(200).json({ status: 'ok', server: 'payments' });
});
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use(SupertokensErrorHandler());
app.use((err: any, req: express.Request, res: express.Response) => {
	res.status(500).send(err.message);
});
app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;
