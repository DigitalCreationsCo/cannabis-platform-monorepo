import {
	createOrganization,
	updateOrganization,
	type OrganizationCreateType,
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
			case 'POST':
				await handlePOST(req, res);
				break;
			case 'PUT':
				await handlePUT(req, res);
				break;
			default:
				res.setHeader('Allow', 'POST, PUT');
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

// create organization, create location record, create stripe account
const handlePOST = async (req: any, res: any) => {
	try {
		await superTokensNextWrapper(
			async (next) => {
				return await verifySession()(req, res, next);
			},
			req,
			res,
		);

		const organization: OrganizationCreateType = req.body;
		const create = await createOrganization(organization);

		return res.status(201).json({
			success: 'true',
			payload: create,
		});
	} catch (error: any) {
		console.error(error.message);
		return res.json({ success: 'false', error: error.message });
	}
};

// update organization record
const handlePUT = async (req: any, res: any) => {
	try {
		await superTokensNextWrapper(
			async (next) => {
				return await verifySession()(req, res, next);
			},
			req,
			res,
		);

		const organization: OrganizationCreateType = req.body;
		const update = await updateOrganization(organization);

		return res.status(200).json({
			success: 'true',
			payload: update,
		});
	} catch (error: any) {
		console.error(error.message);
		return res.json({ success: 'false', error: error.message });
	}
};
