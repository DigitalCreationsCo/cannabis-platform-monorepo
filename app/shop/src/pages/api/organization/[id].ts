import { axios, urlBuilder } from '@cd/core-lib';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';

// Notes on caching in directory: /_dev/cache.txt
const cache = new NodeCache({ stdTTL: 30 });
const handler = nc();

// THIS IS THE CORRECT RESPONSE HANDLING PATTERN WITH AXIOS CONFIG! VVV
// get a single organization details
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.setHeader('Cache-Control', 'public, s-maxage=60');

		const { id } = req.query;
		console.debug('get organization by Id: ', id);
		if (cache.has(`organization/${id}`)) {
			console.debug('cache hit');
			const org = cache.get(`organization/${id}`);
			return res.status(200).json({
				success: 'true',
				payload: org,
				fromCache: true,
			});
		} else {
			console.debug('cache miss');
			const response = await axios(urlBuilder.main.organizationById(id));
			if (response.data.success == 'false')
				throw new Error(response.data.message);
			console.debug('cache set');
			cache.set(`organization/${id}`, response.data.payload);
			return res.status(200).json({
				success: 'true',
				payload: response.data.payload,
			});
		}
	} catch (error: any) {
		console.error('next-api organization[id] Error: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
