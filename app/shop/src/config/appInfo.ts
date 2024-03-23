const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras';
const shopDomain =
	process.env.NEXT_PUBLIC_SHOP_APP_URL || 'http://localhost:3000';

const appInfo = {
	appName,
	websiteDomain: shopDomain,
	apiDomain: shopDomain,
	// query this path for all auth requests
	apiBasePath: '/api/auth/',
};

export { appInfo };
