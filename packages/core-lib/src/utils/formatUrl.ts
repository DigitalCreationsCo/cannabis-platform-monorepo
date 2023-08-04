function formatDispensaryUrl(subdomainId: string, organizationId: string) {
	console.debug(
		`link to subdomain: ${subdomainId}, organizationId: ${organizationId}`,
	);
	switch (process.env.NODE_ENV) {
		case 'development':
			// return `http://localhost:3000/browse/${subdomainId}/${organizationId}`;
			return `http://localhost:3000/browse/${subdomainId}`;
		case 'test':
			// return `http://localhost:3000/browse/${subdomainId}/${organizationId}`;
			return `http://localhost:3000/browse/${subdomainId}`;
		case 'production':
			// return `https://grascannabis.org/browse/${subdomainId}/${organizationId}`;
			return `https://grascannabis.org/browse/${subdomainId}`;
		default:
			// return `http://localhost:3000/browse/${subdomainId}/${organizationId}`;
			return `http://localhost:3000/browse/${subdomainId}`;
	}
}

function formatBlogUrl(href: string) {
	switch (process.env.NODE_ENV) {
		case 'development':
			return `http://localhost:3000/blog/${href}`;
		case 'test':
			return `http://localhost:3000/blog/${href}`;
		case 'production':
			return `https://grascannabis.org/blog/${href}`;
		default:
			return `https://grascannabis.org/blog/${href}`;
	}
}

function getShopSite(path: string): string {
	switch (process.env.NODE_ENV as string) {
		case 'development':
			return `${process.env.NEXT_PUBLIC_SHOP_APP_URL}${path}`;
		case 'test':
			return `${process.env.NEXT_PUBLIC_SHOP_APP_URL}${path}`;
		case 'production':
			return `${process.env.NEXT_PUBLIC_SHOP_APP_URL}${path}`;
		default:
			return `grascannabis.org`;
	}
}

function getDashboardSite(path: string): string {
	switch (process.env.NODE_ENV as string) {
		case 'development':
			return `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}${path}`;
		case 'test':
			return `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}${path}`;
		case 'production':
			return `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}${path}`;
		default:
			return `app.grascannabis.org`;
	}
}

export { formatDispensaryUrl, formatBlogUrl, getShopSite, getDashboardSite };
