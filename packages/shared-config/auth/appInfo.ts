const port = process.env.APP_PORT || 3000;
export const websiteDomain = process.env.APP_URL || `http://localhost:${port}`;
export const apiDomain = process.env.SERVER_MAIN_URL || `http://localhost:6001`;
const apiBasePath = '/api/v1/auth';

export const appInfo = {
    appName: 'Cannabis Delivery',
    websiteDomain,
    apiDomain,
    apiBasePath,
};
