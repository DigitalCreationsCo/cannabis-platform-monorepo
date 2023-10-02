import prisma from '@cd/data-access';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 20 });
const handler = nc();

// get latest blogs
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.setHeader('Cache-Control', 'public, s-maxage=360');
		if (cache.has(`blogs/latest`)) {
			const blogs = cache.get(`blogs/latest`);
			return res.status(200).json({
				success: 'true',
				payload: blogs,
			});
		}

		const blogs = await prisma.article.findMany({
			where: { tag: 'news' },
			include: {
				image: true,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});

		cache.set(`blogs/latest`, blogs);
		return res.status(res.statusCode).json({
			success: 'true',
			payload: blogs,
		});
	} catch (error: any) {
		console.error('api/blog GET error: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
