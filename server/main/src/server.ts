import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { verify, type JwtHeader, type SigningKeyCallback } from 'jsonwebtoken';
import Supertokens from 'supertokens-node';
import {
	errorHandler as STerror,
	middleware as STmiddleware,
} from 'supertokens-node/framework/express';
import Session, {
	type SessionInformation,
} from 'supertokens-node/recipe/session';
// import UserRoles from 'supertokens-node/recipe/userroles';
import {
	blog,
	driver,
	errorRoute,
	organization,
	shop,
	user,
	compliance,
	cacheHandler,
} from './api/routes';
import { backendConfig, jwtClient } from './config';

const shopDomain = process.env.NEXT_PUBLIC_SHOP_APP_URL;
const dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;

try {
	Supertokens.init(backendConfig());
} catch (err) {
	console.error('Supertokens init error: ', err);
	throw Error('Supertokens is not available.');
}

const authenticateToken = () => async (req, res, next) => {
	try {
		const session = await Session.getSession(req, res, {
			sessionRequired: false,
		});
		if (session !== undefined) {
			// const userId = session.getUserId();
			// do something with the userId?
			next();
		} else {
			let jwt = req.headers['authorization'];
			jwt = jwt === undefined ? undefined : jwt.split('Bearer ')[1];
			if (jwt === undefined) {
				return res.status(401);
			} else {
				verify(jwt, getKey, {}, function (err) {
					if (err) {
						return res.status(401).json({ success: false, error: err });
					}
					// const decodedJWT = decoded;
					// do something with the decodedJWT?
					next();
				});
			}
		}
	} catch (err) {
		console.error('authenticateToken: ', err);
		next(err);
	}
};

// UserRoles.createNewRoleOrAddPermissions('MembershipRole', [
// 	'OWNER',
// 	'ADMIN',
// 	'MEMBER',
// ]);

const app = express();
app.use(
	cors({
		origin: [shopDomain, dashboardDomain],
		allowedHeaders: ['content-type', ...Supertokens.getAllCORSHeaders()],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
	}),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(STmiddleware());

app.use('/api/v1/healthcheck', (_, res) => {
	return res.status(200).json({ status: 'ok', server: 'main' });
});
app.use('/api/v1/cache', authenticateToken(), cacheHandler);
app.use('/api/v1/user', authenticateToken(), user);
app.use('/api/v1/driver', authenticateToken(), driver);
app.use('/api/v1/shop', authenticateToken(), shop);
app.use('/api/v1/organization', authenticateToken(), organization);
app.use('/api/v1/blog', authenticateToken(), blog);
app.use('/api/v1/compliance', authenticateToken(), compliance);

app.use('/api/v1/error', errorRoute);
app.use(STerror());
app.use((err, req, res, next) => {
	console.error('A general error occured: ', err);
	res.status(500).json({ success: false, error: err.message });
	next();
});

const server = http.createServer(app);
export default server;

export type SessionResponse = {
	status: boolean;
	session: SessionInformation;
};

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
	jwtClient.getSigningKey(header.kid as string, function (err, key) {
		const signingKey = key.getPublicKey();
		callback(err, signingKey);
	});
}
