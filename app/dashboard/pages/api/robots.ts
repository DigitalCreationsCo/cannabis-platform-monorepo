import { indexPages, noIndexPages } from '../../scripts/seo';

export default function handler(req, res) {
	res.send(
		`User-agent: *
		${noIndexPages.map(({ path }) => `Disallow: ${path}`).join('\n')}
		${indexPages.map(({ path }) => `Allow: ${path}`).join('\n')}
		Sitemap: ${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/sitemap.xml`,
	);
}
