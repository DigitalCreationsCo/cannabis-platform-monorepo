/* eslint-disable sonarjs/no-small-switch */
import { findOrganizationsByZipcode } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
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
			default:
				res.setHeader('Allow', 'GET');
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

// get nearby dispensaries
const handleGET = async (req: any, res: any) => {
	await superTokensNextWrapper(
		async (next) => {
			return await verifySession({ sessionRequired: false })(req, res, next);
		},
		req,
		res,
	);

	const {
		zipcode,
		limit = 5,
		radius = 10000,
	}: { zipcode: number; limit: number; radius: number } = req.query;

	if (!zipcode)
		return res
			.status(400)
			.json({ success: 'false', error: 'Zipcode is required' });

	const organizations = await findOrganizationsByZipcode(
		Number(zipcode),
		Number(limit),
		Number(radius),
	);

	if (!organizations)
		return res.status(404).json({
			success: 'false',
			message: `No dispensaries are found.`,
		});

	return res.status(200).json({
		success: 'true',
		payload: organizations,
	});
};
