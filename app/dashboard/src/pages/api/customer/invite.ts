/* eslint-disable sonarjs/no-small-switch */
import { createCustomer } from '@cd/data-access';
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

// invite a customer to dispenary daily deals program
const handlePOST = async (req: any, res: any) => {
	try {
		await superTokensNextWrapper(
			async (next) => {
				return await verifySession()(req, res, next);
			},
			req,
			res,
		);

		const invite = req.body as {
			email: string;
			mobilePhone: string;
			firstName: string;
			lastName: string;
			city?: string;
			region?: string;
			postalCode?: number;
			subscribed: boolean;
		};

		const create = await createCustomer(invite);

		// send invite via text message;
		// handle opt-in subscribtion asynchronously

		return res.status(201).json({ success: 'true', payload: create });
	} catch (error: any) {
		console.error('POST api/daily-deals/contact: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
};
