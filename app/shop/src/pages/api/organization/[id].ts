import { findOrganizationById } from '@cd/data-access';
import nc from 'next-connect';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../config/backendConfig';

Supertokens.init(backendConfig());

// get a single organization details
const handler = nc();
handler.get(async (req: any, res: any) => {
	try {
		await superTokensNextWrapper(
			async (next) => {
				return await verifySession()(req, res, next);
			},
			req,
			res,
		);

		const { id } = req.query;
		const organization = await findOrganizationById(id);

		if (!organization)
			return res.status(404).json({
				success: 'false',
				message: 'Dispensary not found',
			});

		return res.status(200).json({
			success: 'true',
			payload: organization,
		});
	} catch (error: any) {
		console.error('api/organization/[id]: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
