/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { openai } from '@gras/ai';
import { type NextApiResponse } from 'next';
import nc from 'next-connect';

// send written posts to openai, to train the model for improved writing
const handler = nc();
handler.post(async (req: any, res: NextApiResponse) => {
	try {
		const { posts }: { posts: any[] } = req.body;
		if (!posts.length) throw new Error('Did not provide data in a list.');

		console.info(` training openai model from ${posts.length} posts.`);
		const response = await openai.openai!.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `You are a subject matter expert on all things growing cannabis, smoking cannabis, cannabis foods and beverages, and cannabis culture. I will provide a list of article posts as JSON array. Write any further posts in the style of the provided articles posts.`,
				},
				{
					role: 'user',
					content:
						'Write any further posts in the style of the provided articles posts:' +
						JSON.stringify(posts),
				},
			],
		});

		console.info(' openai trained the model');
		return res.status(200).json({ success: 'true', payload: response });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: 'false', payload: error.message });
	}
});

export default handler;
