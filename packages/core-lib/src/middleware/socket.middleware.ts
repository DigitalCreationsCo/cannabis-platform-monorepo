/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { type OrderWithDetails } from '@cd/data-access';
import { type AnyAction, type Store } from '@reduxjs/toolkit';
import { io, type Socket } from 'socket.io-client';
import { socketActions } from '../reducer/socket.reducer';
import { userActions } from '../reducer/user.reducer';
import { type AppState } from '../types';
import {
	NavigateEvent,
	SocketEvent,
	type SocketEventPayload,
} from '../types/socket.types';
import { urlBuilder } from '../utils/urlBuilder';
// import { driverActions } from "../features/driver.reducer";

const socketMiddleware = (store: Store<AppState>) => {
	// in the future, add this socket map to reducer socket ?

	const socketMap = new Map<string, Socket>();
	// include socket cleanup for finished orders as well!

	let _dispatch_socket_connection: Socket | null;

	/**
	 * Gets socket connection for a specific order
	 * @param orderId
	 * @returns Socket
	 */
	function getOrderSocket(orderId: string) {
		return socketMap.get('order:' + orderId);
	}

	/**
	 * Gets orderId from socket key (socket.id) ?
	 * @param socketKey
	 * @returns orderId
	 */
	function getOrderIdFromSocketKey(socketKey: string) {
		return socketKey && socketKey.split(':')[1];
	}

	// eslint-disable-next-line sonarjs/cognitive-complexity
	return (next: any) => (action: AnyAction) => {
		next(action);

		// DISPATCH SOCKET EVENT HANDLERS
		// if (open connection to dispatch)
		if (socketActions.openConnection.match(action)) {
			console.info('socket_middleware: connecting to dispatch server');

			// GET JWT FROM ST SESSION, THEN SEND JWT TO DISPATCH SERVER

			// const token = await Session.getAccessToken();
			// if (token === undefined) {
			//     throw new Error("User is not logged in");
			// }
			// const socket = io.connect('http://localhost:3000', {
			//     query: { token }
			// });

			// IF SUCCESS, SAVE SOCKET CONNECTION TO DISPATCH SERVER
			// IMPLEMENT ASYNC FUNCTION
			// IMPLEMENT ERROR HANDLING!
			socketMap.set(
				'dispatchSocket',
				io(urlBuilder.dispatch.connect(), {
					// query: { token },
					autoConnect: true,
					transports: ['websocket'],
					// jsonp: false,
				}),
			);

			_dispatch_socket_connection = socketMap.get('dispatchSocket') || null;

			// on dispatch socket connect, emit client connect event
			_dispatch_socket_connection?.on(SocketEvent.Connection, async () => {
				store.dispatch(socketActions.connectionEstablished());
				const id = await store.getState().driver.driver.id;

				console.info('socket connect driverId: ', id);
				_dispatch_socket_connection?.emit(SocketEvent.ClientConnect, {
					data: { userId: id },
				});
				console.info(
					'socket connection to dispatch server: socket id: ',
					_dispatch_socket_connection?.id,
				);
			});

			// on new order event, save new order as incoming order
			_dispatch_socket_connection?.on(
				SocketEvent.NewOrder,
				({ message, data }: SocketEventPayload<OrderWithDetails>) => {
					console.info('new order event');
					console.info('message: ', message);
					console.info('order: ', data);
					store.dispatch(
						socketActions.receiveNewOrderRequest({ message, data }),
					);
				},
			);

			// on order assigned event, create order socket connection to connect to order room,
			// and emit driver added event to order room
			// display message to user
			// save order in order queue state
			_dispatch_socket_connection?.on(
				SocketEvent.OrderAssignedToYou,
				({ message }: SocketEventPayload<any>) => {
					const { newOrder } = store.getState().socket.incomingOrder;
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { id } = newOrder;
					const { driverId } = store.getState().user.user;

					// GET JWT FROM ST SESSION, THEN SEND JWT TO DISPATCH SERVER

					// const token = await Session.getAccessToken();
					// if (token === undefined) {
					//     throw new Error("User is not logged in");
					// }
					// const socket = io.connect('http://localhost:3000', {
					//     query: { token }
					// });

					// IF SUCCESS, SAVE SOCKET CONNECTION TO DISPATCH SERVER
					// IMPLEMENT ASYNC FUNCTION
					// IMPLEMENT ERROR HANDLING!

					socketMap.set(
						'order:' + orderId,
						io(urlBuilder.DISPATCH_CONNECT() + '/order:' + orderId),
					);

					getOrderSocket(orderId).emit(SocketEvent.DriverAdded, {
						data: { userId: driverId, orderId: orderId },
					});
					console.info('you are assigned the order: ', message);
					store.dispatch(socketActions.setMessage({ message }));
					store.dispatch(socketActions.orderAccepted({ newOrder }));
					store.dispatch(socketActions.clearOrderRequest());
				},
			);

			// on order assigned to another driver event, clear incoming order state
			// display message to user
			_dispatch_socket_connection?.on(
				SocketEvent.OrderAssignedToAnotherDriver,
				({ message }) => {
					console.info('order assigned to another driver', message);
					store.dispatch(socketActions.setMessage({ message }));
					store.dispatch(socketActions.clearOrderRequest());
				},
			);

			// dispatch disconnnect event
			_dispatch_socket_connection?.on(SocketEvent.Disconnect, () => {
				console.info('disconnecting from dispatch socket.');
			});
		}

		// emit accept order event
		if (socketActions.acceptOrder.match(action)) {
			console.info('accept order event');
			const { driverId } = store.getState().user.user;
			_dispatch_socket_connection?.emit(SocketEvent.AcceptOrder, {
				data: { userId: driverId },
			});
		}

		// emit decline order event
		if (socketActions.declineOrder.match(action)) {
			_dispatch_socket_connection?.emit(SocketEvent.DeclineOrder);
			store.dispatch(
				// handle message in messageBanner
				socketActions.setMessage({
					message:
						'You declined this order. Stay online to receive more delivery orders!',
				}),
			);
			store.dispatch(socketActions.clearOrderRequest());
		}

		// ORDER SOCKET EVENT HANDLERS
		const isActiveDelivery =
			store.getState().driver.driver.driverSession?.isActiveDelivery;

		if (isActiveDelivery === true) {
			let socket: [string, Socket];

			for (socket of socketMap) {
				console.info('socket: ', socket);

				if (socket[0].startsWith('order:')) {
					const socketKey = socket[0],
						_order_socket_connection = socket[1] || null;

					// on order socket connect
					_order_socket_connection.on(SocketEvent.Connection, () => {
						console.info('socket connection for ' + socketKey);
					});

					// on get location event, emit location
					_order_socket_connection.on(SocketEvent.GetLocation, () => {
						const { geoLocation } = store.getState().user.user.location;
						_order_socket_connection.emit(SocketEvent.LocationShare, {
							data: { location: geoLocation },
						});
					});

					// on message event
					_order_socket_connection.on(
						SocketEvent.Message,
						({ type, message, data }) => {
							console.info(
								`Message Event: 
              type: ${type},
              message: ${message},
              data: ${data}`,
							);
						},
					);

					// on navigate event, change destination type for delivery
					_order_socket_connection.on(SocketEvent.Navigate, ({ type }) => {
						// receive navigation event for different stages of order delivery
						console.info('navigation event: ', type);
						switch (type) {
							case NavigateEvent.ToVendor:
								store.dispatch(socketActions.updateDestinationType('vendor'));
								break;
							case NavigateEvent.ToCustomer:
								store.dispatch(socketActions.updateDestinationType('customer'));
								break;
						}
					});

					// on location update, emit location to order room
					// TO DO, move these actions into driver reducer V

					if (userActions.currentLocationUpdate.fulfilled.match(action)) {
						// Save location in the Route record as well.
						// connect route record to order record

						// frequency of this action call and subsequent socket event are in useLocationWatch hook

						// there is an order delivery active,
						// for every orderSocket that is active,

						// send the orderId for discrete handling by dispatch
						// socket transmisson will route to the room for the order,
						// and received by any clients listening in that order room
						next(action);
						const { geoLocation } = store.getState().user.user.location;
						console.info('sending location share event');
						const orderId = getOrderIdFromSocketKey(socketKey);
						_order_socket_connection.emit(SocketEvent.SendLocation, {
							data: { orderId: orderId, geoLocation },
						});
					}

					// if driver arrive to vendor for delivery,
					// emit arrive event with a list of orderIds that match the vendorId
					// the order Ids are used on delivery to emit the event to the applicable order socket rooms
					if (socketActions.arriveToVendor.match(action)) {
						console.info('middle arrive to vendor');
						const { vendorId } = action.payload;
						console.info('middleware arrive to vendor: ', vendorId);
						// possible issue: this event is being emitted more than necessary to the socket rooms, and dispatch
						// is handling the event more than is needed. ??

						// V this code checks if the order is in the remaining routes state,
						// and uses the order id to emit the event to the order socket room
						const ordersListMatchVendor = store
							.getState()
							.socket.remainingRoute.filter((order) => {
								console.info(
									'vendorId match order? ',
									order.vendor.vendorId === vendorId,
								);
								return order.vendor.vendorId === vendorId;
							})
							.map((order) => order.orderId);
						console.info(
							'orderLists from vendor length: ',
							ordersListMatchVendor.length,
						);
						const orderId = getOrderIdFromSocketKey(socketKey);
						if (ordersListMatchVendor.includes(orderId)) {
							_order_socket_connection.emit(SocketEvent.Navigate, {
								type: NavigateEvent.ArriveToVendor,
								data: { orderIdList: ordersListMatchVendor },
							});
							console.info(
								'event: ',
								SocketEvent.Navigate,
								'type: ',
								NavigateEvent.ArriveToVendor,
							);
						}
					}

					// if driver pickup products for delivery, emit pickup product to order socket room
					if (socketActions.pickupProducts.match(action)) {
						// send socket events to all orders based on a list input of orderId
						const { orderIdList } = action.payload;
						const orderId = getOrderIdFromSocketKey(socketKey);
						if (orderIdList.includes(orderId)) {
							console.info('sending pickup product event');
							_order_socket_connection.emit(SocketEvent.Navigate, {
								type: NavigateEvent.PickupProduct,
								data: { orderId: orderId },
							});
							console.info(
								'event: ',
								SocketEvent.Navigate,
								'type: ',
								NavigateEvent.PickupProduct,
							);
						}
					}

					// if driver arrive to customer for delivery, emit arrive event to order socket room
					if (socketActions.arriveToCustomer.match(action)) {
						const { orderId } = action.payload;
						if (getOrderIdFromSocketKey(socketKey) === orderId) {
							_order_socket_connection.emit(SocketEvent.Navigate, {
								type: NavigateEvent.ArriveToCustomer,
								data: { orderId: orderId },
							});
							console.info(
								'event: ',
								SocketEvent.Navigate,
								'type: ',
								NavigateEvent.ArriveToCustomer,
							);
						}
					}

					// dispatch socket disconnect
					_dispatch_socket_connection?.on(SocketEvent.Disconnect, () => {
						console.info(' 2 disconnecting from dispatch socket 2.');
					});

					// order socket disconnect
					_order_socket_connection.on(SocketEvent.Disconnect, () => {
						console.info('disconnecting from socket room: ' + socketKey);
					});

					// old comment: handle middleware after the action is executed
					// if remove completed order, emit deliver order event to order socket room
					// if remainingRoutes is empty, dispatch ordersCompletedAll action
					if (socketActions.removeCompletedOrder.match(action)) {
						const { orderId } = action.payload;
						if (getOrderIdFromSocketKey(socketKey) === orderId) {
							_order_socket_connection.emit(SocketEvent.Navigate, {
								type: NavigateEvent.DeliverOrder,
								data: { orderId: orderId },
							});
							console.info(
								'event: ',
								SocketEvent.Navigate,
								'type: ',
								NavigateEvent.DeliverOrder,
							);
						}
						const remainingRoute = store.getState().socket.remainingRoute;
						console.info(
							'middleWare remainingRoute length: ',
							remainingRoute.length,
						);
						if (remainingRoute.length === 0) {
							console.info('all orders completed!');
							store.dispatch(socketActions.ordersCompletedAll());
						}
						// next(action);
					}

					// handle for the proper connection, using orderId for discretion
					if (socketActions.closeConnection.match(action)) {
						try {
							if (_dispatch_socket_connection) {
								console.info('closing dispatch socket connection');
								_dispatch_socket_connection.close();
								// _dispatch_socket_connection.destroy();
							}
							_order_socket_connection.close();
							// _order_socket_connection.destroy();
							store.dispatch(socketActions.connectionClosed());
							_dispatch_socket_connection = null;
						} catch (error) {
							console.info('error closing connection: ', error);
						}
					}
				} // is a orderSocket
			} // socketMap iterate
		} // isActiveDelivery
	};
};

export default socketMiddleware;

// THIS GOES IN DISPATCH SERVER TO VERIFY JWT VVVV

// import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
// import jwksClient from 'jwks-rsa';

// // functions to fetch jwks
// var client = jwksClient({
//   jwksUri: 'http://localhost:6001/api/v1/jwt/jwks.json'
// });

// function getKey(header: JwtHeader, callback: SigningKeyCallback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     var signingKey = key!.getPublicKey();
//     callback(err, signingKey);
//   });
// }

// // socket io connection
// io.use(function (socket: any, next: any) {
//   // we first try and verify the jwt from the token param.
//   if (socket.handshake.query && socket.handshake.query.token) {
//     jwt.verify(socket.handshake.query.token, getKey, {}, function (err, decoded) {
//       if (err) return next(new Error('Authentication error'));
//       socket.decoded = decoded;
//       next();
//     });
//   }
//   else {
//     next(new Error('Authentication error'));
//   }
// })
//   .on('connection', function (socket: any) {
//     // Connection now authenticated to receive further events

//     socket.on('message', function (message: string) {
//       io.emit('message', message);
//     });
//   });
