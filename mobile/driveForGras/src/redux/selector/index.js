const Selector = Object.freeze({
  isLoading: (state) => state.module.isLoading,
  user: (state) => state.user.user,
  currentCoordinates: (state) =>
    state.user.user.location.geoLocation.coordinates,
  socket: (state) => state.socket,
  incomingOrder: (state) => state.socket.incomingOrder,
  dispatchOrders: (state) => state.socket.dispatchOrders,
  remainingRoute: (state) => state.socket.remainingRoute,
  destinationType: (state) => state.socket.destinationType,
});

export default Selector;
