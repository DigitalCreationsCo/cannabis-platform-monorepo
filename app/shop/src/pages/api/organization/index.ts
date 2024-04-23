/* eslint-disable @typescript-eslint/naming-convention */
import { getGeoCoordinatesFromAddress } from '@cd/core-lib';
import {
	createOrganization,
	deleteOrganizationById,
	findOrganizationsByZipcode,
	type OrganizationWithShopDetails,
	type OrganizationCreateType,
	dispensaries,
} from '@cd/data-access';
import clientPromise, { db_namespace } from '@cd/data-access/src/db/mongo';
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
	}: { zipcode: number; limit: number; radius: number } = req.query;

	if (!zipcode)
		return res
			.status(400)
			.json({ success: 'false', error: 'Zipcode is required' });

	// const db = await (await clientPromise).db(db_namespace.dispensary.db);

	// const zip = await db
	// 	.collection<{
	// 		_id: string;
	// 		city: string;
	// 		loc: [number, number];
	// 		pop: number;
	// 		state: string;
	// 	}>(db_namespace.dispensary.zipcodes)
	// 	.findOne({ _id: zipcode.toString() });

	// if (!zip)
	// 	return res
	// 		.status(404)
	// 		.json({ success: 'false', error: 'Zipcode not found' });

	// // find dispensary document with geonear search sorted by zipcode
	// const dispensaries = await db
	// 	.collection(db_namespace.dispensary.dispensaries)
	// 	.aggregate([
	// 		{
	// 			$geoNear: {
	// 				near: zip.loc,
	// 				distanceField: 'distanceFromUser',
	// 				maxDistance: radius,
	// 				spherical: true,
	// 			},
	// 		},
	// 		{
	// 			$sort: {
	// 				distanceFromUser: 1,
	// 			},
	// 		},
	// 	])
	// 	.toArray();

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

	const collection = await (await clientPromise)
		.db(db_namespace.dispensary.db)
		.collection(db_namespace.dispensary.dispensaries);

	const create: OrganizationCreateType = req.body;

	const coordinates = await getGeoCoordinatesFromAddress(create.address);

	create.address.coordinates = { ...coordinates };

	const organization = await collection.insertOne({
		...create,
		address: {
			...create.address,
			coordinates: [
				Number(coordinates.longitude),
				Number(coordinates.latitude),
			],
		},
	});

	// // // revert the organization record if location db create fails
	// if (!insertCollection.acknowledged) {
	// 	await deleteOrganizationById(organization.id);
	// 	console.debug(
	// 		'the organization location record was not created. the insert operation is reverted.',
	// 	);
	// 	return res.status(404).json({
	// 		success: 'false',
	// 		message:
	// 			'the organization location record was not created. the insert operation is reverted.',
	// 	});
	// }

	// console.debug(
	// 	`${organization.name} record create is completed. ID is ${organization.id}`,
	// );

	return res.status(201).json({
		success: 'true',
		message: `${create.name} record create is completed. ID is ${organization.insertedId}`,
		payload: organization,
	});
};
