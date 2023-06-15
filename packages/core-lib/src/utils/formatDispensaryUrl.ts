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
            return `http://localhost:3000${path}`;
        case 'test':
            return `http://localhost:3000${path}`;
        case 'production':
            return `http://grascannabis.org${path}`;
        default:
            return `http://localhost:3000`;
    }
}

function getDashboardSite(path: string): string {
    switch (process.env.NODE_ENV as string) {
        case 'development':
            return `http://app.localhost:3000${path}`;
        case 'test':
            return `http://app.localhost:3000${path}`;
        case 'production':
            return `http://app.grascannabis.org${path}`;
        default:
            return `http://localhost:3001`;
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
    getDashboardSite
};
