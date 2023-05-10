const port = process.env.SHOP_APP_PORT || 3000;
const websiteDomain = process.env.NEXT_PUBLIC_SHOP_APP_URL || `http://localhost:${port}`;
const apiDomain = process.env.SERVER_MAIN_URL || `http://localhost:6001`;
const apiBasePath = '/api/v1';

const appInfo = {
    appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
    apiDomain,
    websiteDomain,
    apiBasePath
};

export { appInfo, websiteDomain, apiDomain };
