const mainUrl = process.env.SERVER_MAIN_URL;
console.log('api: ', process.env.SERVER_MAIN_URL + '/api/v1');
const urlBuilder =
    // process.env.NODE_ENV === 'development' ?
    {
        next: 'http://localhost:3000',
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
        },
    };
// : {};

export default urlBuilder;
