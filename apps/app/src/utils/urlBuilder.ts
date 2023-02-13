const next = process.env.APP_URL;
const mainUrl = process.env.SERVER_MAIN_URL;
console.log('Next api: ', process.env.APP_URL);
console.log('Server Main api: ', process.env.SERVER_MAIN_URL);

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

        organizationById: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}`,

        categoryList: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/categories`,

        userById: (id: any) => urlBuilder.main.baseUrl + `/auth/user/${id}`,
        usersByOrg: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/users`,
        addressByIdAndUser: (addressId: any, id: any) =>
            urlBuilder.main.baseUrl + `/auth/user/${id}/address/${addressId}`,
    },
};

export default urlBuilder;
