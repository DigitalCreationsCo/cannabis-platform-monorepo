export function formatDispensaryUrl(
	subdomainId: string,
	organizationId: string,
) {
	switch (process.env.NODE_ENV) {
		case 'development':
			return `http://localhost:3000/browse/${subdomainId}/${organizationId}`;
		case 'test':
			return `http://localhost:3000/browse/${subdomainId}/${organizationId}`;
		case 'production':
			return `https://grascannabis.org/browse/${subdomainId}/${organizationId}`;
		default:
			return `http://localhost:3000/browse/${subdomainId}/${organizationId}`;
	}
}

// export function formatDispensaryUrl(subdomainId: string) {
// 	switch (process.env.NODE_ENV) {
// 		case 'development':
// 			return `http://${subdomainId}.localhost:3000`;
// 		case 'test':
// 			return `http://${subdomainId}.localhost:3000`;
// 		case 'production':
// 			return `http://${subdomainId}.grascannabis.org`;
// 	}
// }

export function replaceRelativePath(href: string) {
	// console.info('replaceRelativePath href', href);
	const url = new URL(href, window.location.href);
	// console.info('replaceRelativePath url', url);
	return url.href;
}

export function formatBlogUrl(href: string) {
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

export function getShopSite(path: string): string {
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

export function getDashboardSite(path: string): string {
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

export function getDispensaryDomain(url: string) {
	const match = url.match(/(?:https?:\/\/)?(?:[a-zA-Z\d-]+\.)*([^.]+)\./); // matches all but localhost:xxxx
	if (match) return match[1];
	else return null;
}

export function parseUrlFriendlyStringToObject(url: string) {
	if (url.split('?').length > 1) url = url.split('?')[1];
	// Split the string into key-value pairs
	const keyValuePairs = url.split('&');
	// Create an object to store the parsed values
	const parsedValues: Record<string, any> = {};
	// Iterate through key-value pairs
	for (const pair of keyValuePairs) {
		// Split each pair into key and value
		const [key, value] = pair.split('=');
		// URL decode the value and store it in the object
		parsedValues[key] = decodeURIComponent(value);
	}
	return parsedValues;
}

export function parseUrlParameters(url: string) {
	// Create a URL object from the URL string
	const urlObject = new URL(url);
	// Extract the search parameters
	const searchParams = urlObject.search.substr(1); // Remove the leading '?'
	// Parse the search parameters using the parseUrlFriendlyStringToObject function
	return parseUrlFriendlyStringToObject(searchParams);
}
