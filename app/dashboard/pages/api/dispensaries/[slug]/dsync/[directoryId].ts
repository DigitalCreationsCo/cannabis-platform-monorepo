/* eslint-disable @typescript-eslint/no-non-null-assertion */
import env from '@/lib/env';
import { sendAudit } from '@/lib/retraced';
import { throwIfNotAllowed, ApiError } from '@gras/core';
import type { NextApiRequest, NextApiResponse } from 'next';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { throwIfNoAccessToDirectory } from '@/lib/guards/team-dsync';
import { dsyncManager } from '@/lib/jackson/dsync';

const dsync = dsyncManager();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	try {
		if (!env.teamFeatures.dsync) {
			throw new ApiError(404, 'Not Found');
		}

		switch (method) {
			case 'GET':
				await handleGET(req, res);
				break;
			case 'PATCH':
				await handlePATCH(req, res);
				break;
			case 'DELETE':
				await handleDELETE(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET, PATCH, DELETE');
				res.status(405).json({
					error: { message: `Method ${method} Not Allowed` },
				});
		}
	} catch (error: any) {
		console.error(error);

		const message = error.message || 'Something went wrong';
		const status = error.status || 500;

		res.status(status).json({ error: { message } });
	}
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);

	throwIfNotAllowed(teamMember, 'team_dsync', 'read');

	const directoryId = req.query.directoryId as string;

	await throwIfNoAccessToDirectory({
		teamId: teamMember.team.id,
		directoryId,
	});

	const connection = await dsync.getConnectionById(directoryId);

	res.status(200).json(connection);
};

const handlePATCH = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);

	throwIfNotAllowed(teamMember, 'team_dsync', 'read');

	await throwIfNoAccessToDirectory({
		teamId: teamMember.team.id,
		directoryId: req.query.directoryId as string,
	});

	const body = { ...req.query, ...req.body };

	const connection = await dsync.updateConnection(body);

	res.status(200).json(connection);
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);

	throwIfNotAllowed(teamMember, 'team_dsync', 'delete');

	await throwIfNoAccessToDirectory({
		teamId: teamMember.team.id!.toString(),
		directoryId: req.query.directoryId as string,
	});

	const data = await dsync.deleteConnection(req.query);

	sendAudit({
		action: 'dsync.connection.delete',
		crud: 'd',
		user: teamMember,
		team: teamMember.team,
	});

	res.status(200).json(data);
};
