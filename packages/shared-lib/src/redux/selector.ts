const Selector = Object.freeze({
    isLoading: (state) => state.module.isLoading,
  
    user: (state) => state.user,
    locationData: (state) => state.user.user.locationData,
    currentLocation: (state) =>
      state.user.user.locationData.currentLocation.location,
    selectedLocation: (state) => {
      const {
        locationData,
        locationData: { selectedLocationType },
      } = state.user.user;
      return locationData[selectedLocationType];
    },
  
    socket: (state) => state.socket,
    incomingOrder: (state) => state.socket.incomingOrder,
    dispatchOrders: (state) => state.socket.dispatchOrders,
    remainingRoute: (state) => state.socket.remainingRoute,
    destinationType: (state) => state.socket.destinationType,
  
    cart: (state) => state.cart,
  
    vendors: (state) => state.vendors,
  
    products: (state) => state.products,
  
    modal: (state) => state.modal,
  
    message: (state) => state.message,
  
    payment: (state) => state.payment,
  });
  
  export default Selector;