const next = process.env.NEXT_PUBLIC_APP_URL;
const mainUrl = process.env.SERVER_MAIN_URL;

const urlBuilder = {
    next,
    main: {
        baseUrl: mainUrl + '/api/v1',
        healthCheck: () => urlBuilder.main.baseUrl + '/healthcheck',

        ordersByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/org/${id}`,
        orderById: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/${id}`,
        orders: () => urlBuilder.main.baseUrl + `/shop/orders`,

        productsByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/products/org/${id}`,
        productById: (id: any) => urlBuilder.main.baseUrl + `/shop/products/${id}`,
        products: () => urlBuilder.main.baseUrl + '/shop/products',
        productUpdate: (id: any) => urlBuilder.main.baseUrl + `/organization/product/${id}/update`,

        organization: () => urlBuilder.main.baseUrl + `/organization`,
        organizationById: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}`,

        categoryList: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/categories`,

        userById: (id: any) => urlBuilder.main.baseUrl + `/auth/user/${id}`,
        usersByOrg: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/users`,

        address: () => urlBuilder.main.baseUrl + '/auth/address',
        addressByIdAndUser: (addressId: any, id: any) =>
            urlBuilder.main.baseUrl + `/auth/user/${id}/address/${addressId}`
    }
};

export default urlBuilder;
