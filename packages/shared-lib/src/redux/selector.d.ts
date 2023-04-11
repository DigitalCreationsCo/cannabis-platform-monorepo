declare const Selector: (state: any) => Readonly<{
    socket: () => any;
    incomingOrder: () => any;
    dispatchOrders: () => any;
    remainingRoute: () => any;
    destinationType: () => any;
    cart: () => any;
    dispensaries: () => any;
    products: () => any;
    payment: () => any;
}>;
export default Selector;
