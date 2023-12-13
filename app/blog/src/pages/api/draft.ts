import { validatePreviewUrl } from '@sanity/preview-url-secret';
import type { NextApiRequest } from 'next';
import { readToken } from '../../lib/sanity.api';
import { getClient } from '../../lib/sanity.client';

export default async function preview(req: NextApiRequest, res: any) {
	// if (!readToken) {
	// 	res.status(500).send('Misconfigured server');
	// 	return;
	// }

	// const { query } = req;

	// const secret = typeof query.secret === 'string' ? query.secret : undefined;
	// const slug = typeof query.slug === 'string' ? query.slug : undefined;

	// if (!secret) {
	// 	res.status(401);
	// 	res.send('Invalid secret');
	// 	return;
	// }

	// const authClient = getClient({ token: readToken }).withConfig({
	// 	useCdn: false,
	// 	token: readToken,
	// });

	// const { isValid } = await validatePreviewUrl(authClient, req.url as string);

	// // This is the most common way to check for auth, but we encourage you to use your existing auth
	// // infra to protect your token and securely transmit it to the client
	// if (!isValid) {
	// 	return res.status(401).send('Invalid secret');
	// }

	// if (slug) {
	res.setDraftMode({ enable: true });
	res.writeHead(307, { Location: `/blog/post/${slug}` });
	res.end();
	return;
	// }

	res.status(404).send('Slug query parameter is required');
	res.end();
}
