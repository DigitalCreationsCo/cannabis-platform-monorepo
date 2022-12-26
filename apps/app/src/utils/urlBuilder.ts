const urlBuilder =
    // process.env.NODE_ENV === 'development' ?
    {
        next: 'http://localhost:3000',
        main: {
            baseUrl: 'http://localhost:6001/api/v1',
            getOrdersByOrg: (id) => urlBuilder.main.baseUrl + `/shop/orders/${id}`,
        },
    };
// : {};

export default urlBuilder;
