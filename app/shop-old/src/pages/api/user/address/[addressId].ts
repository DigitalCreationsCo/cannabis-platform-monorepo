/* eslint-disable sonarjs/no-small-switch */
import { removeAddressByIdAndUserId } from '@cd/data-access';
import { type NextApiRequest, type NextApiResponse } from 'next';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../../config/backendConfig';

Supertokens.init(backendConfig());

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		switch (req.method) {
			case 'DELETE':
				await handleDELETE(req, res);
				break;
			default:
				res.setHeader('Allow', 'DELETE');
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

// delete address from user
const handleDELETE = async (req: any, res: any) => {
	await superTokensNextWrapper(
		async (next) => {
			return await verifySession()(req, res, next);
		},
		req,
		res,
	);

	const { id, addressId } = req.query;
	const addressRemove = await removeAddressByIdAndUserId({
		addressId,
		userId: id,
	});

	if (!addressRemove)
		return res.status(404).json({
			success: 'false',
			error: 'Address not found',
		});

	res.status(200).json({
		success: 'true',
		payload: addressRemove,
	});
};
