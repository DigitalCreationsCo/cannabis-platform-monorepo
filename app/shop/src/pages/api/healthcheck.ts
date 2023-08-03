import { NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
handler.get(async (_, res: NextApiResponse) => {
	res.status(200).json({ status: 'ok' });
});

export default handler;
