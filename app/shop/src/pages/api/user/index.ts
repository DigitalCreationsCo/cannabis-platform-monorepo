import {
	getGeoCoordinatesFromAddress,
	isArray,
	normalizeUserData,
} from '@cd/core-lib';
import { updateUser, upsertUser, type UserCreateType } from '@cd/data-access';
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

// create a user record
const handlePOST = async (req: any, res: any) => {
	await superTokensNextWrapper(
		async (next) => {
			await verifySession({ sessionRequired: false })(req, res, next);
		},
		req,
		res,
	);

	const user: UserCreateType = req.body;

	// address data comes as an object, but we need it as an array per data schema
	if (user.address) {
		const coordinates = await getGeoCoordinatesFromAddress(user.address);
		if (coordinates) user.address.coordinates = coordinates;
	}

	const normalizedUser = normalizeUserData(user);
	const userCreate = await upsertUser(normalizedUser);

	if (!userCreate)
		return res.status(404).json({
			success: 'false',
			error: 'User could not be created.',
		});

	res.status(201).json({ success: 'true', payload: userCreate });
};

// update a user record
const handlePUT = async (req: any, res: any) => {
	await superTokensNextWrapper(
		async (next) => {
			return await verifySession()(req, res, next);
		},
		req,
		res,
	);

	const user: UserCreateType = req.body;

	if (!isArray(user.address)) {
		const coordinates = await getGeoCoordinatesFromAddress(user.address);
		if (coordinates) user.address.coordinates = coordinates;
	}
	const normalizedUser = normalizeUserData(user);
	const userUpdate = await updateUser(normalizedUser);

	if (!userUpdate)
		return res.status(404).json({
			success: 'false',
			error: 'User record was not updated.',
		});

	res.status(204).json({
		success: 'true',
		payload: userUpdate,
	});
};
