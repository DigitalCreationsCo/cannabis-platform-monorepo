const port = process.env.APP_PORT || 3000;
const websiteDomain = process.env.SHOP_APP_URL || `http://localhost:${port}`;
const apiDomain = process.env.SERVER_MAIN_URL || `http://localhost:6001`;
const apiBasePath = '/api/v1';

const appInfo = {
    appName: 'Cannabis Delivery',
    apiDomain,
    websiteDomain,
    apiBasePath
};

export { appInfo, websiteDomain, apiDomain };
