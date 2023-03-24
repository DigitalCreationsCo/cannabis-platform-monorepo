export function formatDispensaryUrl(subdomainId: string) {
    if (process.env.NODE_ENV === 'development') return `http://${subdomainId}.localhost:3000`;
    if (process.env.NODE_ENV === 'staging') return `http://${subdomainId}.localhost:3000`;
    if (process.env.NODE_ENV === 'production') return `http://${subdomainId}.grascannabis.org`;
}