import prisma from '@cd/data-access';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

// get a single article
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=10, stale-while-revalidate=59',
		);

		const id = req.query.id as string;

		const response = await prisma.article.findUnique({
			where: {
				id,
			},
			include: {
				image: true,
			},
		});

		return res.status(res.statusCode).json({
			success: true,
			payload: response,
		});
	} catch (error: any) {
		console.error(error.message);
		return res.json({
			success: false,
			error: error.message,
		});
	}
});

export default handler;
