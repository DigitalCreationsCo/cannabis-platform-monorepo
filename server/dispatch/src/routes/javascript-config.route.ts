import type { ServerResponse } from 'http';
import cors from 'cors';
import { Router } from 'express';
import { BackendUtils } from '../lib/fleet/utils/BackendUtils';
import { ServiceUtils } from '../lib/fleet/utils/ServiceUtils';

const javascriptConfigRoutes = Router();
javascriptConfigRoutes.get(
	'/',
	cors({
		// set origin to the domain that uploads the fleet config
		origin: [
			'*', // testing
			process.env.NEXT_PUBLIC_DASHBOARD_APP_URL as string,
			process.env.NEXT_PUBLIC_FLEET_TRACKING_APP_URL as string,
		],
		allowedHeaders: ['content-type'],
		methods: ['GET'],
	}),
	async (req, res: ServerResponse) => {
		try {
			res.setHeader('Content-Type', 'text/javascript');
			res.setDefaultEncoding('utf8');
			// Do not let the browser cache js credentials.
			res.setHeader('Cache-Control', 'no-store');

			const apiKey = BackendUtils.backendProperties.apiKey();
			if (!apiKey.match(/AIza[\w-]{35}/)) {
				console.error('Invalid API key provided in configuration.');
				ServiceUtils.setErrorResponse(
					res,
					'Invalid API key provided in configuration.',
					500,
				);
				return res.end();
			}

			const backendHost = BackendUtils.backendProperties.backendHost();
			try {
				new URL(backendHost);
			} catch (error: any) {
				console.error('Invalid backend host provided in configuration.');
				ServiceUtils.setErrorResponse(
					res,
					'Invalid backend host provided in configuration.',
					500,
				);
				return res.end();
			}
			const projectId = BackendUtils.backendProperties.providerId();
			if (!projectId.match(/[a-z][a-z\d-]{4,28}[a-z\d]/)) {
				console.error('Invalid project id provided in configuration.');
				ServiceUtils.setErrorResponse(
					res,
					'Invalid project id provided in configuration.',
					500,
				);
				return res.end();
			}
			res.write(
				`const API_KEY = ${apiKey}; const BACKEND_HOST = ${backendHost}; const PROJECT_ID = ${projectId};`,
			);
			res.flushHeaders();
		} catch (error: any) {
			console.error('javascript config: ', error.message);
			res.statusCode = 500;
			res.end({ success: 'false', error: error.message });
		}
	},
);

export { javascriptConfigRoutes };
