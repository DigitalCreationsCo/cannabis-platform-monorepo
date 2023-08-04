import { applicationHeaders, axios, urlBuilder } from '@cd/core-lib';
import { type UserCreateType } from '@cd/data-access';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// handler.use(authMiddleware).use(healthCheckMiddleware);
// get users from an organization
handler.get(async (req, res: NextApiResponse) => {
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
		return res.json(error);
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

		console.info('dispensaryId: ', dispensaryId);
		const response = await axios.post(
			urlBuilder.main.admin(),
			{ user, role, dispensaryId },
			{
				headers: { ...applicationHeaders },
			},
		);

		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.info('next api create admin user error: ', error.message);
		throw new Error(error.message);
	}
});

// update a user record
handler.put(async (req, res: NextApiResponse) => {
	try {
		// const {user, dispensaryId, role}: {user: UserCreateType, role: "ADMIN" | "OWNER" | undefined, dispensaryId: string; } = req.body;
		// const response = await axios.put(urlBuilder.main.admin(), { user, role, dispensaryId }, {
		//     headers: {
		//         'Content-Type': 'application/json'
		//     }
		// });
		// return res.status(res.statusCode).json(response.data);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
});

export default handler;
