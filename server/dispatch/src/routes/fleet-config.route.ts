import type { ServerResponse } from 'http';
import cors from 'cors';
import { Router } from 'express';
import multer from 'multer';
import { FleetConfigService } from '../lib/fleet';

const upload = multer();

const fleetConfigRoutes = Router();
fleetConfigRoutes.post(
	'/',
	cors({
		// set origin to the domain that uploads the fleet config
		origin: [
			'*', // testing
			process.env.NEXT_PUBLIC_DASHBOARD_APP_URL as string,
			process.env.NEXT_PUBLIC_FLEET_TRACKING_APP_URL as string,
		],
		allowedHeaders: ['content-type'],
		methods: ['POST'],
		// credentials: true,
	}),
	upload.single('file'),
	async (req, res: ServerResponse) => {
		try {
			if (!req.file) throw new Error('The fleet config was not attached.');

			await FleetConfigService.processConfigUpload(
				req.file as unknown as File,
				res,
			);
		} catch (error: any) {
			console.error('upload fleet config: ', error.message);
			res.statusCode = 500;
			res.end({ success: 'false', error: error.message });
		}
	},
);

export { fleetConfigRoutes };
