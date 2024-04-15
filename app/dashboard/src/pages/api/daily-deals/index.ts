import {
	findDailyDealsByOrganization,
	createDailyDeal,
	type DailyDealWithProductDetails,
} from '@cd/data-access';
import { type NextApiRequest, type NextApiResponse } from 'next';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../config/backendConfig';

Supertokens.init(backendConfig());

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		switch (req.method) {
			case 'GET':
				await handleGET(req, res);
				break;
			case 'POST':
				await handlePOST(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET, POST');
				res.status(405).json({
					error: { message: `Method ${req.method} Not Allowed` },
				});
		}
	} catch (error: any) {
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;

		res.status(status).json({
			success: 'false',
			error: message,
		});
	}
}

const handleGET = async (req: any, res: any) => {
	try {
		await superTokensNextWrapper(
			async (next) => {
				return await verifySession()(req, res, next);
			},
			req,
			res,
		);

		const organizationId = req.headers['organization-id'] as string;

		const dailyDeals = findDailyDealsByOrganization(organizationId);

		return res.status(200).json({ success: 'true', payload: dailyDeals });
	} catch (error: any) {
		console.error('GET api/daily-deals: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
};

const handlePOST = async (req: any, res: any) => {
	try {
		await superTokensNextWrapper(
			async (next) => {
				return await verifySession()(req, res, next);
			},
			req,
			res,
		);

		const dailyDeal: DailyDealWithProductDetails = req.body;

		const create = createDailyDeal(dailyDeal);

		return res.status(201).json({
			success: 'true',
			payload: create,
		});
	} catch (error: any) {
		console.error('POST api/daily-deals: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
};
