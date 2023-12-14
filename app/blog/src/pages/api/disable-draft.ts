import { type NextApiRequest, type NextApiResponse } from 'next';

export default function disable(req: NextApiRequest, res: any) {
	res.setDraftMode({ enable: false });
	res.writeHead(307, { Location: '/' });
	res.end();
}
