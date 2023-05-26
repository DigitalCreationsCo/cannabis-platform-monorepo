import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "../redux/features/socket";
import Selector from "../redux/selector";

// WRITE UNIT TESTS FOR THIS PIECE!
// -- make sure fields are updating in the proper turn, and order. And the updated value is available
// when needed!

// accepts destinationType and dispatchOrders list, and
// generates remainingRoute - a sorted list of orders,
// currentOrder - the first index of remainingRoute,
// currentDestination - the destination object ('vendor' || 'customer' ) of the currentOrder
export class DestinationPicker {
  _destinationType;
  _dispatchOrders;
  _sortedRoute;
  _currentOrder;
  _currentDestination;
  constructor(destinationType, dispatchOrders) {
    this.destinationType = destinationType;
    this.dispatchOrders = dispatchOrders;
    this.sortedRoute = dispatchOrders;
  }

  get destinationType() {
    return this._destinationType;
  }
  set destinationType(destinationType) {
    this._destinationType = destinationType;
  }

  get dispatchOrders() {
    return this._dispatchOrders;
  }
  set dispatchOrders(orders) {
    if (orders.length > 0) {
      //   const sortedOrders = this.sortDestinations(orders);
      //   return (this.dispatchOrders = sortedOrders);
      this._dispatchOrders = orders;
    }
  }

  get sortedRoute() {
    return this._sortedRoute;
  }
  set sortedRoute(orders) {
    if (orders.length > 0) {
      //   const sortedOrders = Algo.sort(orders);
      //   return (this.remainingRoute = sortedOrders);
      this.currentOrder = orders;
      this._sortedRoute = orders;
    }
  }

  get currentOrder() {
    return this._currentOrder;
  }
  set currentOrder(orders) {
    this._currentOrder = orders[0];
    this.currentDestination = this.currentOrder;
  }

  get currentDestination() {
    return this._currentDestination;
  }
  set currentDestination(currentOrder) {
    this._currentDestination = currentOrder[this.destinationType];
  }

  get currentDestinationLocation() {
    const destination = this.currentDestination;
    return destination.location.coordinates;
  }

  get currentDestinationAddress() {
    const destination = this.currentDestination;
    return this.getAddress(destination);
  }

  // before I can test this with live data,
  // the client app must be getting geocode data from locationIQ API
  getAddress(destination) {
    const { street, city, state, zipcode } = destination;
    const address = `${street}, ${city}, ${state}, ${zipcode}`;
    return address;
  }
}

const DestinationQueue = () => {
  const { dispatchOrders, destinationType } = useSelector(Selector.socket);

  const [dispatchOrdersState, setDispatchOrdersState] =
    useState(dispatchOrders);

  const [destinationTypeState, setDestinationTypeState] =
    useState(destinationType);

  let destinationPicker = new DestinationPicker(
    destinationTypeState,
    dispatchOrdersState
  );

  const dispatch = useDispatch();

  let { sortedRoute, currentOrder, currentDestination } = destinationPicker;

  useEffect(() => {
    destinationPicker = new DestinationPicker(
      destinationTypeState,
      dispatchOrdersState
    );
  }, [dispatchOrders]);

  useEffect(() => {
    destinationPicker = new DestinationPicker(
      destinationTypeState,
      dispatchOrdersState
    );
  }, [destinationType]);

  useEffect(() => {
    // if (remainingRoute.length === 0 && isActiveDelivery === false) {
    console.log("saving sorted route in state");
    dispatch(socketActions.saveSortedRoute({ sortedRoute }));
    // }
  }, [sortedRoute]);

  useEffect(() => {
    console.log("Destination: dispatch orders changed");
    setDispatchOrdersState(dispatchOrders);
  }, [dispatchOrders]);

  useEffect(() => {
    console.log("Destination: destination type changed");
    setDestinationTypeState(destinationType);
  }, [destinationType]);

  useEffect(() => {
    console.log("DestinationQueue currentOrder changed");
  }, [currentOrder]);

  useEffect(() => {
    console.log("DestinationQueue currentDestination changed");
  }, [currentDestination]);

  return destinationPicker;
};

export default DestinationQueue;
