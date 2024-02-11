import { applicationHeaders, urlBuilder } from '@cd/core-lib';
import { type DailyStoryData } from '@cd/core-lib/src/lib/DailyStory.api';
import axios, { type AxiosResponse } from 'axios';
import nc from 'next-connect';

const handler = nc();
handler.post(async (req: any, res: any) => {
	try {
		console.info('creating contact: ', req.body);
		const response = await axios
			.post<DailyStoryData>(urlBuilder.dailyStory.createContact(), req.body, {
				headers: {
					...applicationHeaders,
					authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
				},
			})
			.then<AxiosResponse<DailyStoryData>>(async ({ data }) => {
				return await axios.post(
					urlBuilder.dailyStory.addTagsToContact(data.Response.id),
					['daily-deals'],
					{
						headers: {
							...applicationHeaders,
							authorization: `Bearer ${process.env.DAILYSTORY_API_KEY}`,
						},
					},
				);
			});

		if (response.data.Status !== true)
			throw new Error('Failed to create contact');

		return res
			.status(response.status)
			.json({ success: 'true', payload: response.data });
	} catch (error: any) {
		console.error('POST api/daily-deals/contact: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
