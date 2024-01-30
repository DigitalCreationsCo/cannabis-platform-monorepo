import { applicationHeaders, urlBuilder } from '@cd/core-lib';
import { type DailyStoryData } from '@cd/core-lib/lib/DailyStory.api';
import axios from 'axios';
import nc from 'next-connect';

const handler = nc();
handler.post(async (req: any, res: any) => {
	try {
		const response = await axios.post<DailyStoryData>(
			urlBuilder.dailyStory.sendEmail(),
			req.body,
			{
				headers: {
					...applicationHeaders,
					authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
				},
			},
		);

		if (response.data.Status !== true)
			throw new Error("Failed to send 'contact us' email");

		return res
			.status(response.status)
			.json({ success: 'true', payload: response.data.Response });
	} catch (error: any) {
		console.error('POST api/contact-us: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
