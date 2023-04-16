// @ts-nocheck

// TO DO: Create a custom useSelector hook that will inject this selector into redux, to get type definitions in the selector without having to import the state type into the selector file
const Selector = (state) => Object.freeze({
    socket: () => state.socket,
    incomingOrder: () => state.socket.incomingOrder,
    dispatchOrders: () => state.socket.dispatchOrders,
    remainingRoute: () => state.socket.remainingRoute,
    destinationType: () => state.socket.destinationType,
  
    cart: () => state.cart,
  
    dispensaries: () => state.dispensaries,
  
    products: () => state.products,
  
    payment: () => state.payment,
  });
  
  export default Selector;