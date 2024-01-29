import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import nc from 'next-connect';

const handler = nc();
handler.post(async (req: any, res: any) => {
	try {
		console.info('url to post to: ', urlBuilder.dailyStory.createContact());

		const response = await axios.post(
			urlBuilder.dailyStory.createContact(),
			req.body,
			{
				headers: {
					...req.headers,
					authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
				},
			},
		);

		console.info('response: ', response.data);
		if (response.data.Status !== true) throw new Error(response.data.error);

		return res.status(response.status).json({
			success: 'true',
			payload: response.data.payload,
		});
	} catch (error: any) {
		console.error('POST api/daily-deals/create-contact: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
