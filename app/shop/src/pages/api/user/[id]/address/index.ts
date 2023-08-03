import { AddressCreateType } from '@cd/data-access';
import axios from 'axios';
// import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { urlBuilder } from '@cd/core-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// handler.use(authMiddleware).use(healthCheckMiddleware);
// handler.use(adminMiddleware);

// create new address
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const formData: AddressCreateType = req.body;
		const { data } = await axios.post(urlBuilder.main.address(), formData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
});

export default handler;
