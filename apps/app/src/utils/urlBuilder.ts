const urlBuilder =
    // process.env.NODE_ENV === 'development' ?
    {
        next: 'http://localhost:3000',
        main: {
            baseUrl: 'http://localhost:6001/api/v1',
            healthCheck: () => urlBuilder.main.baseUrl + "/healthcheck",
            
            ordersByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/org/${id}`,
            orderById: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/${id}`,
            orders: () => urlBuilder.main.baseUrl + `/shop/orders`,

            productsByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/products/org/${id}`,
            products: () => urlBuilder.main.baseUrl + '/shop/products',
        },
    };
// : {};

export default urlBuilder;
