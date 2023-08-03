import { urlBuilder } from '@cd/core-lib';
import { type UserCreateType } from '@cd/data-access';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

// create a user record
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const user: UserCreateType = req.body,
			response = await axios.post(urlBuilder.main.user(), user, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
});

// update a user record
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const updateUser: UserCreateType = req.body;

		const response = await axios.put(urlBuilder.main.user(), updateUser, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
});

export default handler;
