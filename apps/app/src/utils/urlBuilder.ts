const urlBuilder =
    // process.env.NODE_ENV === 'development' ?
    {
        next: 'http://localhost:3000',
        main: {
            baseUrl: 'http://localhost:6001/api/v1',
            ordersByOrgId: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/org/${id}`,
            orderById: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/${id}`,
            orders: () => urlBuilder.main.baseUrl + `/shop/orders`,
        },
    };
// : {};

export default urlBuilder;
