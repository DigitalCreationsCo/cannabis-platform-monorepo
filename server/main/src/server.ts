import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import Supertokens from 'supertokens-node';
import {
	errorHandler as STerror,
	middleware,
} from 'supertokens-node/framework/express';
import { type SessionInformation } from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import {
	blog,
	driver,
	errorRoute,
	organization,
	shop,
	user,
} from './api/routes';
import backendConfig from './config';

const shopDomain = process.env.NEXT_PUBLIC_SHOP_APP_URL;
const dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;

if (Supertokens) {
	Supertokens.init(backendConfig());
} else throw Error('Supertokens is not available.');

UserRoles.createNewRoleOrAddPermissions('MembershipRole', [
	'OWNER',
	'ADMIN',
	'MEMBER',
]);

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

// IF I HAVE ISSUES WITH MULTIPARTFORM IN THE FUTURE, CHECK THIS SETTING AGAIN!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/healthcheck', (_, res) => {
	return res.status(200).json({ status: 'ok', server: 'main' });
});

app.use('/api/v1/user', user);
app.use('/api/v1/driver', driver);
app.use('/api/v1/shop', shop);
app.use('/api/v1/organization', organization);
app.use('/api/v1/blog', blog);

app.use('/api/v1/error', errorRoute);
app.use(STerror());
app.use((err, req, res, next) => {
	console.error('A general error occured: ', err);
	res.status(500).send(err.message);
	next();
});

const server = http.createServer(app);
export default server;

export type SessionResponse = {
	status: boolean;
	session: SessionInformation;
};
