import { UserWithDetails } from "../../../data-access/src";

function formatDispensaryUrl(subdomainId: string) {
    switch (process.env.NODE_ENV) {
        case 'development':
            return `http://${subdomainId}.localhost:3000`;
        case 'test':
            return `http://${subdomainId}.localhost:3000`;
        case 'production':
            return `http://${subdomainId}.grascannabis.org`;
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
            return `http://localhost:3000`;
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
            return `http://localhost:3001`;
    }
}

function getCurrentSite(path: string): string {
    switch (process.env.NODE_ENV as string) {
        case 'development':
            return `http://${window.location.host}${path}`;
        case 'test':
            return `http://${window.location.host}${path}`;
        case 'production':
            return `http://${window.location.host}${path}`;
        default:
            return `http://${window.location.host}`;
    }
}

function getUserHome(user: UserWithDetails) {
    if (user.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
        user.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER')
        return getDashboardSite('/dashboard');
    else
        return getShopSite('/');
}

export {
    formatDispensaryUrl,
    getShopSite,
    getDashboardSite,
    getCurrentSite,
    getUserHome
};
