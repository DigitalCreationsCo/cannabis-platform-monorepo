function formatDispensaryUrl(subdomainId: string) {
    switch(process.env.NODE_ENV) {
        case 'development':
            return `http://${subdomainId}.localhost:3000`;
        case 'test':
            return `http://${subdomainId}.localhost:3000`;
        case 'production':
            return `http://${subdomainId}.grascannabis.org`;
    }
}

function getSiteUrl(path: string) {
    switch(process.env.NODE_ENV) {
        case 'development':
            return `http://localhost:3000${path}`;
        case 'test':
            return `http://localhost:3000${path}`;
        case 'production':
            return `http://grascannabis.org${path}`;
    }
}

export {
    formatDispensaryUrl,
    getSiteUrl
};
