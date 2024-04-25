/* eslint-disable sonarjs/no-small-switch */
import { getGeoCoordinatesFromAddress } from '@cd/core-lib';
import {
	type AddressPayload,
	type AddressCreateType,
	addAddressToUser,
} from '@cd/data-access';
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
			case 'POST':
				await handlePOST(req, res);
				break;
			default:
				res.setHeader('Allow', 'POST');
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

// add address to user
const handlePOST = async (req: any, res: any) => {
	await superTokensNextWrapper(
		async (next) => {
			return await verifySession()(req, res, next);
		},
		req,
		res,
	);

	const address: AddressCreateType = req.body;
	const { userId } = address;

	const coordinates = await getGeoCoordinatesFromAddress(
		address as AddressPayload,
	);
	if (coordinates) address.coordinates = coordinates;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const addressCreated = await addAddressToUser(userId!, address as any);
	if (!addressCreated)
		return res.status(404).json({
			success: 'false',
			error: 'Address was not added',
		});

	res.status(201).json({
		success: 'true',
		payload: addressCreated,
	});
};
