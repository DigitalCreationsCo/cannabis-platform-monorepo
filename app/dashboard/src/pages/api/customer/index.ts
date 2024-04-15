import { findCustomersByOrg, updateCustomer } from '@cd/data-access';
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
			case 'GET':
				await handleGET(req, res);
				break;
			case 'PUT':
				await handlePUT(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET, PUT');
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

// get customers of an organization
const handleGET = async (req: any, res: any) => {
	try {
		await superTokensNextWrapper(
			async (next) => {
				return await verifySession()(req, res, next);
			},
			req,
			res,
		);

		const organizationId = req.headers['organization-id'] as string;
		const customers = await findCustomersByOrg(organizationId);

		if (!customers) throw new Error('Orders not found');

		return res.status(200).json({ success: 'true', payload: customers });
	} catch (error: any) {
		console.error('GET /api/customer: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
};

// update customer
const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const customer = req.body;
		const update = await updateCustomer(customer.id, customer);
		return res.status(200).json({ success: 'true', payload: update });
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
};
