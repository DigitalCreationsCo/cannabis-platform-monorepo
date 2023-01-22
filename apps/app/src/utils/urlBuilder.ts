const next = process.env.NEXT_PUBLIC_APP_URL;
const mainUrl = process.env.SERVER_MAIN_URL;
// console.log('Next Url: ', next);
// console.log('Server Main Url: ', process.env.SERVER_MAIN_URL);

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

        categoryList: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/categories`,

        usersByOrgId: (id: any) => urlBuilder.main.baseUrl + `/organization/${id}/users`,
        getUserDetails: (id: any) => urlBuilder.main.baseUrl + `/auth/user-details/${id}`,
    },
};

export default urlBuilder;
