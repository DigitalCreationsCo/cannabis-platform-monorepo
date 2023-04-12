export function formatDispensaryUrl(subdomainId: string) {
    switch(process.env.NODE_ENV) {
        case 'development':
            return `http://${subdomainId}.localhost:3000`;
        case 'test':
            return `http://${subdomainId}.localhost:3000`;
        case 'production':
            return `http://${subdomainId}.grascannabis.org`;
    }
}

const next = process.env.NEXT_PUBLIC_APP_URL;
const mainUrl = process.env.SERVER_MAIN_URL;
const locationUrl = process.env.SERVER_LOCATION_URL;
const paymentUrl = process.env.SERVER_PAYMENT_URL;

export const urlBuilder = {
    next,
    main: {
        baseUrl: mainUrl + '/api/v1',
        healthCheck: () => urlBuilder.main.baseUrl + '/healthcheck',

        getSession: () => urlBuilder.main.baseUrl + '/session',

        ordersByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/org/${id}`,
        orderById: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/${id}`,
        orders: () => urlBuilder.main.baseUrl + `/shop/orders`,

        productsByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/products/org/${id}`,
        productById: (id: any) => urlBuilder.main.baseUrl + `/shop/products/${id}`,
        products: () => urlBuilder.main.baseUrl + '/shop/products',
        productUpdate: (id: any) => urlBuilder.main.baseUrl + `/organization/product/${id}/update`,
        productsByMultipleOrgs: (page: number, limit: number) => urlBuilder.main.baseUrl + `/shop/products&_page=${page}&_limit=${limit}`,

        organization: () => urlBuilder.main.baseUrl + `/organization`,
        organizationById: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}`,

        categoryList: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/categories`,

        signin: () => urlBuilder.main.baseUrl + `/auth/user/signin`,
        signup: () => urlBuilder.main.baseUrl + `/auth/user/signup`,
        signout: () => urlBuilder.main.baseUrl + `/auth/signout`,
        userById: (id: any) => urlBuilder.main.baseUrl + `/auth/user/${id}`,
        usersByOrg: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/users`,

        address: () => urlBuilder.main.baseUrl + '/auth/address',
        addressByIdAndUser: (addressId: any, id: any) =>
            urlBuilder.main.baseUrl + `/auth/user/${id}/address/${addressId}`
    },
    location: {
        baseUrl: locationUrl + '/api/v1',
        organizationsLocal: () => urlBuilder.location.baseUrl + '/serveLocal/organizations',
        createorganizationLocationRecord: () => urlBuilder.location.baseUrl + '/serveLocal/create-record',
    },
    payment: {
        baseUrl: paymentUrl + '/api/v1',
        purchase: () => urlBuilder.payment.baseUrl + '/purchase',
        createDispensaryAccount: () => urlBuilder.payment.baseUrl + '/stripe/dispensary-create'
    }
};

export default urlBuilder;
