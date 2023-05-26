import { io } from "socket.io-client";
import { socketActions } from "../features/socket";
import SocketEvent, { NavigateEvent } from "./socketEvent";
import { urlTable } from "../../helpers";
import { userActions } from "../features/user";

const socketMiddleware = (store) => {
  // in the future, add this socket map to reducer socket ?

  // include socket cleanup for finished orders as well!
  let socketMap = new Map();
  let dispatchSocket;

  function getOrderSocket(orderId) {
    return socketMap.get("order:" + orderId);
  }

  function getOrderIdFromSocketKey(socketKey) {
    let orderId = socketKey.split(":")[1];
    return orderId;
  }

  return (next) => (action) => {
    next(action);
    // console.log("SOCKET MIDDLEWARE");

    // DISPATCH SOCKET EVENT HANDLERS
    if (socketActions.openConnection.match(action)) {
      console.log("connecting to dispatch server..");
      socketMap.set(
        "dispatchSocket",
        io(urlTable.DISPATCH_CONNECT(), {
          autoConnect: true,
          transports: ["websocket"],
          jsonp: false,
        })
      );
      dispatchSocket = socketMap.get("dispatchSocket");

      dispatchSocket.on(SocketEvent.Connection, () => {
        store.dispatch(socketActions.connectionEstablished());
        const { driverId } = store.getState().user.user;
        dispatchSocket.emit(SocketEvent.ClientConnect, {
          data: { userId: driverId },
        });
        console.log(
          "socket connection to dispatch server: socket id: ",
          dispatchSocket.id
        );
      });

      dispatchSocket.on(SocketEvent.NewOrder, ({ message, order }) => {
        console.log("new order event");
        console.log("message: ", message);
        // console.log("order: ", order);
        store.dispatch(
          socketActions.receiveNewOrderRequest({ message, order })
        );
      });

      dispatchSocket.on(SocketEvent.OrderAssigned, ({ message }) => {
        const { newOrder } = store.getState().socket.incomingOrder;
        let { orderId } = newOrder;
        const { driverId } = store.getState().user.user;
        socketMap.set(
          "order:" + orderId,
          io(urlTable.DISPATCH_CONNECT() + "/order:" + orderId)
        );
        getOrderSocket(orderId).emit(SocketEvent.DriverAdded, {
          data: { userId: driverId, orderId: orderId },
        });
        console.log("you are assigned the order: ", message);
        store.dispatch(socketActions.setMessage({ message }));
        store.dispatch(socketActions.orderAccepted({ newOrder }));
        store.dispatch(socketActions.clearOrderRequest());
      });

      dispatchSocket.on(
        SocketEvent.OrderAssignedToAnotherDriver,
        ({ message }) => {
          console.log("order assigned to another driver", message);
          store.dispatch(socketActions.setMessage({ message }));
          store.dispatch(socketActions.clearOrderRequest());
        }
      );

      // handle from any socket
      dispatchSocket.on(SocketEvent.Disconnect, () => {
        console.log("disconnecting from dispatch socket.");
      });

      // if (userActions.currentLocationUpdate.fulfilled.match(action)) {
      //   // frequency of this action call and subsequent socket event are in useLocationWatch hook

      //   // there is an order delivery active,
      //   // for every orderSocket that is active,
      //   // orderSockets.forEach(socket => socket.emit(SocketEvent.LocationShare()))

      //   // send the orderId to be discrete on receiving side
      //   // socket transmisson will route to the room for the order,
      //   // and received by any clients listening in that order room
      //   const { isActiveDelivery, remainingRoute } = store.getState().socket;
      //   if (isActiveDelivery === true) {
      //     next(action);
      //     const { currentLocation } = store.getState().user.user;

      //     let order;
      //     for (order of remainingRoute) {
      //       // console.log("socketmiddleware orderId:", order.orderId);
      //       let { orderId } = order;
      //       let orderSocket = getOrderSocket(orderId);
      //       // console.log("orderSocket: ", orderSocket);
      //       console.log("sending location share event");
      //       orderSocket.emit(SocketEvent.SendLocation, {
      //         data: { orderId: orderId, geoLocation: currentLocation },
      //       });
      //     }

      //     // handle with all order sockets
      //     // if there is an ordersocket in the socketMap, send this event
      //     // to the orderSockets
      //     // send location to socket room for order *
      //     // and save location in order Document *
      //     // ...aaand, save location in driverSession document for driver, as well. :)
      //   }
      // }
    } // DISPATCH SOCKET EVENT HANDLERS

    if (socketActions.acceptOrder.match(action)) {
      console.log("accept order event");
      const { driverId } = store.getState().user.user;
      dispatchSocket.emit(SocketEvent.AcceptOrder, {
        data: { userId: driverId },
      });
    }

    if (socketActions.declineOrder.match(action)) {
      dispatchSocket.emit(SocketEvent.DeclineOrder);
      store.dispatch(
        // handle message in messageBanner
        socketActions.setMessage({
          message:
            "You declined this order. Stay online to receive more delivery orders!",
        })
      );
      store.dispatch(socketActions.clearOrderRequest());
    }

    // ORDER SOCKET EVENT HANDLERS
    const { isActiveDelivery } = store.getState().socket;
    if (isActiveDelivery === true) {
      let socket;
      for (socket of socketMap) {
        // console.log("socket key: ", socket[0]);
        if (socket[0].startsWith("order:")) {
          let socketKey = socket[0];
          // console.log("order socket: ", socketKey[0]);
          let orderSocket = socket[1];

          orderSocket.on(SocketEvent.Connection, () => {
            console.log("socket connection for " + socketKey);
          });

          // order socket connection, handle from any socket
          orderSocket.on(SocketEvent.GetLocation, () => {
            const { geoLocation } = store.getState().user.user.location;
            orderSocket.emit(SocketEvent.LocationShare, {
              data: { location: geoLocation },
            });
          });

          // handle from any socket
          orderSocket.on(SocketEvent.Message, ({ type, message, data }) => {
            console.log(
              `Message Event: 
              type: ${type},
              message: ${message},
              data: ${data}`
            );
          });

          orderSocket.on(SocketEvent.Navigate, ({ type }) => {
            // receive navigation event for different stages of order delivery
            console.log("navigation event: ", type);
            switch (type) {
              case NavigateEvent.ToVendor:
                store.dispatch(socketActions.updateDestinationType("vendor"));
                break;
              case NavigateEvent.ToCustomer:
                store.dispatch(socketActions.updateDestinationType("customer"));
                break;
            }
          });

          if (userActions.currentLocationUpdate.fulfilled.match(action)) {
            // frequency of this action call and subsequent socket event are in useLocationWatch hook

            // there is an order delivery active,
            // for every orderSocket that is active,
            // orderSockets.forEach(socket => socket.emit(SocketEvent.LocationShare()))

            // send the orderId to be discrete on receiving side
            // socket transmisson will route to the room for the order,
            // and received by any clients listening in that order room
            next(action);
            const { geoLocation } = store.getState().user.user.location;
            console.log("sending location share event");
            let orderId = getOrderIdFromSocketKey(socketKey);
            orderSocket.emit(SocketEvent.SendLocation, {
              data: { orderId: orderId, geoLocation },
            });
            // send location to order socket room *
            // and save location in order Document *
            // ...aaand, save location in driverSession document for driver, as well. :)
          }

          // pass orderId for discrete handling on server side
          if (socketActions.arriveToVendor.match(action)) {
            console.log("middle arrive to vendor");
            const { vendorId } = action.payload;
            console.log("middleware arrive to vendor: ", vendorId);
            let ordersListMatchVendor = store
              .getState()
              .socket.remainingRoute.filter((order) => {
                console.log(
                  "vendorId match order? ",
                  order.vendor.vendorId === vendorId
                );
                return order.vendor.vendorId === vendorId;
              })
              .map((order) => order.orderId);
            console.log(
              "orderLists from vendor length: ",
              ordersListMatchVendor.length
            );
            let orderId = getOrderIdFromSocketKey(socketKey);
            if (ordersListMatchVendor.includes(orderId)) {
              orderSocket.emit(SocketEvent.Navigate, {
                type: NavigateEvent.ArriveToVendor,
                data: { orderIdList: ordersListMatchVendor },
              });
              console.log(
                "event: ",
                SocketEvent.Navigate,
                "type: ",
                NavigateEvent.ArriveToVendor
              );
            }
          }

          // handle with matching order socket
          // pass orderId for discrete handling
          if (socketActions.pickupProducts.match(action)) {
            // send socket events to all orders based on a list input of orderId
            const { orderIdList } = action.payload;
            let orderId = getOrderIdFromSocketKey(socketKey);
            if (orderIdList.includes(orderId)) {
              console.log("sending pickup product event");
              orderSocket.emit(SocketEvent.Navigate, {
                type: NavigateEvent.PickupProduct,
                data: { orderId: orderId },
              });
              console.log(
                "event: ",
                SocketEvent.Navigate,
                "type: ",
                NavigateEvent.PickupProduct
              );
            }
          }

          // pass orderId for discrete handling on server side
          if (socketActions.arriveToCustomer.match(action)) {
            const { orderId } = action.payload;
            if (getOrderIdFromSocketKey(socketKey) === orderId) {
              orderSocket.emit(SocketEvent.Navigate, {
                type: NavigateEvent.ArriveToCustomer,
                data: { orderId: orderId },
              });
              console.log(
                "event: ",
                SocketEvent.Navigate,
                "type: ",
                NavigateEvent.ArriveToCustomer
              );
            }
          }

          orderSocket.on(SocketEvent.Disconnect, () => {
            console.log("disconnecting from socket room: " + socketKey);
          });

          // handle middleware after the action is executed

          if (socketActions.removeCompletedOrder.match(action)) {
            let { orderId } = action.payload;
            if (getOrderIdFromSocketKey(socketKey) === orderId) {
              orderSocket.emit(SocketEvent.Navigate, {
                type: NavigateEvent.DeliverOrder,
                data: { orderId: orderId },
              });
              console.log(
                "event: ",
                SocketEvent.Navigate,
                "type: ",
                NavigateEvent.DeliverOrder
              );
            }
            const remainingRoute = store.getState().socket.remainingRoute;
            console.log(
              "middleWare remainingRoute length: ",
              remainingRoute.length
            );
            if (remainingRoute.length === 0) {
              console.log("all orders completed!");
              store.dispatch(socketActions.ordersCompletedAll());
            }
            // next(action);
          }
        } // is a orderSocket

        // handle for the proper connection, using orderId for discretion
        if (socketActions.closeConnection.match(action)) {
          try {
            if (dispatchSocket) {
              console.log("closing dispatch socket connection");
              dispatchSocket.close();
              dispatchSocket.destroy();
            }
            store.dispatch(socketActions.connectionClosed());
            dispatchSocket = null;
          } catch (error) {
            console.log("error closing connection: ", error);
          }
        }
      } // socketMap iterate
    } // isActiveDelivery
  };
};

export default socketMiddleware;
