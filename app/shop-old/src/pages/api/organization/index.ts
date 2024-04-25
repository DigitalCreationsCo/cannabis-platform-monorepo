/* eslint-disable @typescript-eslint/naming-convention */
import { getGeoCoordinatesFromAddress } from '@cd/core-lib';
import {
	createOrganization,
	deleteOrganizationById,
	findOrganizationsByZipcode,
	type OrganizationWithShopDetails,
	type OrganizationCreateType,
	dispensaries,
	getZipcodeLocation,
	getDispensariesByLocation,
	createDispensary,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../config/backendConfig';
// import { EmailService } from '@cd/core-lib/src/lib/email/EmailService';

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

// get nearby dispensaries
const handleGET = async (req: any, res: any) => {
	// await superTokensNextWrapper(
	// 	async (next) => {
	// 		return await verifySession({ sessionRequired: false })(req, res, next);
	// 	},
	// 	req,
	// 	res,
	// );

	const {
		zipcode,
		limit = 5,
		radius = 10000,
	}: { zipcode: string; limit: number; radius: number } = req.query;

	if (!zipcode)
		return res
			.status(400)
			.json({ success: 'false', error: 'Zipcode is required' });

	const zip = await getZipcodeLocation(zipcode);

	if (!zip)
		return res.status(404).json({
			success: 'false',
			message: `Zipcode ${zipcode} is not found.`,
		});

	const dispensaries = await getDispensariesByLocation(zip.loc, limit, radius);

	if (!dispensaries || dispensaries.length === 0)
		return res.status(404).json({
			success: 'false',
			message: `No dispensaries are found.`,
		});

	return res.status(200).json({
		success: 'true',
		payload: dispensaries,
	});
};

const handlePOST = async (req: any, res: any) => {
	// await superTokensNextWrapper(
	// 	async (next) => {
	// 		return await verifySession({ sessionRequired: false })(req, res, next);
	// 	},
	// 	req,
	// 	res,
	// );

	const create = req.body;

	const coordinates = await getGeoCoordinatesFromAddress(create.address);

	create.address.coordinates = { ...coordinates };

	const dispensary = await createDispensary(create);

	return res.status(201).json({
		success: 'true',
		message: `${dispensary.name} record create is completed. ID is ${dispensary._id}`,
		payload: dispensary,
	});
};
