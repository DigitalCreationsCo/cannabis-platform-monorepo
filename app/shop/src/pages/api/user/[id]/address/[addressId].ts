import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
// import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// handler.use(authMiddleware).use(healthCheckMiddleware);
// delete a user address
handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { id, addressId } = req.query;
		const { data } = await axios.delete(
			urlBuilder.main.addressByIdAndUser(addressId, id),
		);
		return res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
});

// admin user checker middleware
// handler.use(adminMiddleware);
export default handler;
