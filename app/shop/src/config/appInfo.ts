const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras';
const shopDomain =
	process.env.NEXT_PUBLIC_SHOP_APP_URL || 'http://localhost:3000';

const appInfo = {
	appName,
	websiteDomain: shopDomain,
	websiteBasePath: '/',
	apiDomain: shopDomain,
	apiBasePath: '/api/auth',
};

export { appInfo };
