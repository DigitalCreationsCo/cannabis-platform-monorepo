import { applicationHeaders, axios, urlBuilder } from '@cd/core-lib';
import { type UserCreateType } from '@cd/data-access';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// get users from an organization
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
		// const { user } = await getSession({ req, res });
		// const { organizationId } = user.memberships[0];
		// req.organizationId = organizationId;
		// if (cache.has(`users/org/${organizationId}`)) {
		//     const users = cache.get(`users/org/${organizationId}`);
		//     return res.status(200).json(users);
		// }
		// const { data } = await axios(urlBuilder.main.usersByOrg(organizationId));
		// cache.set(`users/org/${organizationId}`, data);
		// return res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.error(error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

// create a user record
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const {
			user,
			dispensaryId,
			role,
		}: {
			user: UserCreateType;
			role: 'ADMIN' | 'OWNER';
			dispensaryId: string;
		} = req.body;
		const response = await axios.post(
			urlBuilder.main.staff(),
			{ user, role, dispensaryId },
			{
				headers: { ...applicationHeaders },
			},
		);
		if (response.data.success === 'false') throw new Error(response.data.error);
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.info('api create Dispensary Staff User: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

// update a user record
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// const {user, dispensaryId, role}: {user: UserCreateType, role: "ADMIN" | "OWNER" | undefined, dispensaryId: string; } = req.body;
		// const response = await axios.put(urlBuilder.main.staff(), { user, role, dispensaryId }, {
		//     headers: {
		//         'Content-Type': 'application/json'
		//     }
		// });
		// return res.status(res.statusCode).json(response.data);
	} catch (error: any) {
		console.error(error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
