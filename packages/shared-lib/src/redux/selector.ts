import { AppState } from ".";

// TO DO: Create a custom useSelector hook that will inject this selector into redux, to get type definitions in the selector without having to import the state type into the selector file
const Selector = (state:AppState) => Object.freeze({

    user: () => state.user.user,

    location: () => state.location,
    currentLocation: () =>
      state.location.currentLocation.address.coordinates,
    selectedLocation: () => {
      const selectedLocationType = state.location.selectLocationType
      return state.location[selectedLocationType];
    },
  
    socket: () => state.socket,
    incomingOrder: () => state.socket.incomingOrder,
    dispatchOrders: () => state.socket.dispatchOrders,
    remainingRoute: () => state.socket.remainingRoute,
    destinationType: () => state.socket.destinationType,
  
    cart: () => state.cart,
  
    dispensaries: () => state.dispensaries,
  
    products: () => state.products,
  
    modal: () => state.modal,
  
    payment: () => state.payment,
  });
  
  export default Selector;