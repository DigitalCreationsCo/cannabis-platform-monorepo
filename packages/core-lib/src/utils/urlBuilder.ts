
const shop = process.env.NEXT_PUBLIC_SHOP_APP_URL;
const dashboard = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;
const mainUrl = process.env.NEXT_PUBLIC_SERVER_MAIN_URL;
const locationUrl = process.env.NEXT_PUBLIC_SERVER_LOCATION_URL;
const paymentUrl = process.env.NEXT_PUBLIC_SERVER_PAYMENTS_URL;
const imageUrl = process.env.NEXT_PUBLIC_SERVER_IMAGE_URL;
const dispatchUrl = process.env.NEXT_PUBLIC_SERVER_DISPATCH_URL;

const urlBuilder = {
    shop,

    dashboard,

    main: {
        baseUrl: mainUrl + '/api/v1',
        healthCheck: () => urlBuilder.main.baseUrl + '/healthcheck',

        getSession: () => urlBuilder.main.baseUrl + '/session',

        ordersByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/org/${id}`,
        orderById: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/${id}`,
        orders: () => urlBuilder.main.baseUrl + `/shop/orders`,
        fulfillOrder: () => urlBuilder.main.baseUrl + `/shop/orders-fulfill`,

        productsByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/products/org/${id}`,
        productById: (id: any) => urlBuilder.main.baseUrl + `/shop/products/${id}`,
        products: () => urlBuilder.main.baseUrl + '/shop/products',
        productUpdate: (id: any) => urlBuilder.main.baseUrl + `/organization/product/${id}/update`,
        productsByMultipleOrgs: (page: number, limit: number) => urlBuilder.main.baseUrl + `/shop/products&_page=${page}&_limit=${limit}`,

        organization: () => urlBuilder.main.baseUrl + `/organization`,
        organizationById: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}`,

        categoryList: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/categories`,

        // signin: () => urlBuilder.main.baseUrl + `/auth/user/signin`,
        // signup: () => urlBuilder.main.baseUrl + `/auth/user/signup`,
        // signout: () => urlBuilder.main.baseUrl + `/auth/signout`,
        user: () => urlBuilder.main.baseUrl + `/user`,
        admin: () => urlBuilder.main.baseUrl + `/user/admin`,
        userById: (id: any) => urlBuilder.main.baseUrl + `/user/${id}`,
        usersByOrg: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/users`,

        address: () => urlBuilder.main.baseUrl + '/auth/address',
        addressByIdAndUser: (addressId: any, id: any) =>
            urlBuilder.main.baseUrl + `/auth/user/${id}/address/${addressId}`
    },

    location: {
        baseUrl: locationUrl + '/api/v1',
        organizationsLocal: () => urlBuilder.location.baseUrl + '/serve-local/organizations',
        organizationLocationRecord: () => urlBuilder.location.baseUrl + '/serve-local/organizations/record',
    },

    payment: {
        baseUrl: paymentUrl + '/api/v1',
        purchase: () => urlBuilder.payment.baseUrl + '/payment/purchase',
        createStripe: () => urlBuilder.payment.baseUrl + `/accounts/create`,
        connectStripe: () => urlBuilder.payment.baseUrl + `/accounts/connect`,
        checkOnboard: () => urlBuilder.payment.baseUrl + '/accounts/check-onboard',
        checkout: () => urlBuilder.payment.baseUrl + '/payment/checkout',
    },

    image: {
        baseUrl: imageUrl + '/api/v1',
        verifyIdentificationImageUpload: () => urlBuilder.image.baseUrl + '/image/scan-identification-upload',
        verifyIdentificationImageUri: () => urlBuilder.image.baseUrl + '/image/scan-identification-uri',
    },

    dispatch: {
        baseUrl: dispatchUrl + '/api/v1',
        newOrder: () => urlBuilder.dispatch.baseUrl + '/dispatch/order/new',
        connect: () => urlBuilder.dispatch.baseUrl + '/dispatch/connect',
    }
};


export {
    urlBuilder
};

