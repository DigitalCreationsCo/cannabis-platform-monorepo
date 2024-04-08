/* eslint-disable sonarjs/no-small-switch */
import {
	applicationHeaders,
	axios,
	dynamicBlurDataUrl,
	getGeoCoordinatesFromAddress,
	urlBuilder,
} from '@cd/core-lib';
import {
	createOrganization,
	deleteOrganizationById,
	findOrganizationsByZipcode,
	type OrganizationWithShopDetails,
	type OrganizationCreateType,
	type OrganizationUpdateType,
	type OrganizationWithDashboardDetails,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import clientPromise from 'mongo';
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

const handlePOST = async (req: any, res: any) => {
	await superTokensNextWrapper(
		async (next) => {
			return await verifySession({ sessionRequired: false })(req, res, next);
		},
		req,
		res,
	);

	const location_namespace = process.env.LOCATION_DB_NS;
	const collection = await (await clientPromise)
		.db(location_namespace)
		.collection('organizations_geolocate');

	const create: OrganizationCreateType = req.body;

	const coordinates = await getGeoCoordinatesFromAddress(create.address);

	create.address.coordinates = { ...coordinates };

	const imagesWithBlurData = [];
	for (let i = 0; i < create.images.length; i++) {
		imagesWithBlurData.push({
			...create.images[i],
			location: create.images[i].location,
			alt: create.images[i].alt || create.name,
			blurhash: await dynamicBlurDataUrl(create.images[i].location),
		});
	}
	create.images = imagesWithBlurData;

	const organization = (await createOrganization(
		create,
	)) as OrganizationWithShopDetails;

	const insertCollection = await collection.insertOne({
		...organization,
		address: {
			...organization.address,
			coordinates: [
				Number(coordinates.longitude),
				Number(coordinates.latitude),
			],
		},
	});

	// revert the organization record if location db create fails
	if (!insertCollection.acknowledged) {
		await deleteOrganizationById(organization.id);
		console.debug(
			'the organization location record was not created. the insert operation is reverted.',
		);
		return res.status(404).json({
			success: 'false',
			message:
				'the organization location record was not created. the insert operation is reverted.',
		});
	}

	console.debug(
		`${organization.name} record create is completed. ID is ${organization.id}`,
	);

	return res.status(201).json({
		success: 'true',
		message: `${organization.name} record create is completed. ID is ${organization.id}`,
		payload: organization,
	});
};
