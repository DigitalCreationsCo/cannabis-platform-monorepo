// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { type OrderWithDispatchDetails } from '@cd/data-access';
import { type MiddlewareAPI } from '@reduxjs/toolkit';
import { io, type Socket } from 'socket.io-client';
import { driverActions } from '../reducer/driver.reducer';
import { socketActions } from '../reducer/socket.reducer';
import { type AppState } from '../types';
import {
	dispatchEvents as SocketEvent,
	NavigateEvent,
	type SocketEventPayload,
} from '../types/socket.types';
import { getProperty } from '../utils';
import { urlBuilder } from '../utils/urlBuilder';

const socketMiddleware = (store: MiddlewareAPI<any, AppState>) => {
	/**
	 * Get orderId from socket key (socket.id) ?
	 * @param socketKey
	 * @returns orderId
	 */
	function getOrderIdFromSocketKey(socketKey: string) {
		return socketKey && socketKey.split(':')[1];
	}

	/**
	 * Get socket connection from socketMap
	 * @param orderId
	 * @returns Socket | null
	 */
	function getSocket(socketKey: string) {
		// const socketKey = 'order:' + orderId;
		return getProperty(socketMap, socketKey);
	}

	const socketMap: Record<string, Socket> = {};

	let dispatch_socket: Socket | null;

	const { id, phone } = store.getState().driver.driver.user;

	// eslint-disable-next-line sonarjs/cognitive-complexity
	return (next: any) => async (action: any) => {
		next(action);

		if (driverActions.updateOnlineStatus.rejected.match(action)) {
			store.dispatch(socketActions.setError(action.payload.error));
		}

		// socket event handlers
		if (socketActions.openConnection.match(action)) {
			console.info('socket_middleware: connecting to dispatch server');

			// GET JWT FROM ST SESSION, THEN SEND JWT TO DISPATCH SERVER
			// const token = await Session.getAccessToken();
			// if (token === undefined) {
			//     throw new Error("User is not logged in");
			// }
			// const socket = io.connect('http://localhost:3002', {
			//     query: { token }
			// });

			// 1. connect socket to dispatch
			//  if success, update driver status isOnline true
			// 		const { isOnline } = payload;
			// 		state.driver.driverSession['isOnline'] = isOnline;
			// 2. if failure, update driver status isOnline false

			console.debug('creating dispatch_socket');
			dispatch_socket = io(urlBuilder.dispatch.connect(), {
				// query: { token },
				autoConnect: true,
				transports: ['websocket'],
				// jsonp: false,
			});
			dispatch_socket.on('connect_error', (err) => {
				throw new Error(err.message);
			});
			dispatch_socket.on('connect_timeout', (err) => {
				throw new Error(err.message);
			});
			dispatch_socket.on('error', (err) => {
				throw new Error(err.message);
			});
			socketMap['dispatch_socket'] = dispatch_socket;

			try {
				store.dispatch(driverActions.updateOnlineStatus(true));
			} catch (error) {
				console.error('updateOnlineStatus handle', error.message);
				store.dispatch(socketActions.setError(error.message));
			}

			dispatch_socket.on(SocketEvent.connection, async () => {
				store.dispatch(socketActions.connectionEstablished());
				dispatch_socket?.emit(SocketEvent.connect_client, { id, phone });
			});

			dispatch_socket.on(
				SocketEvent.new_order,
				({
					message,
					data,
				}: SocketEventPayload<OrderWithDispatchDetails['order']>) => {
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
			dispatch_socket.on(
				SocketEvent.order_assigned,
				({ message }: SocketEventPayload<any>) => {
					try {
						const { newOrder } = store.getState().socket.incomingOrder;

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

						const socketKey = 'order:' + newOrder.id;
						const order_socket = io(
							urlBuilder.dispatch.connect() + '/' + socketKey,
						);
						socketMap[socketKey] = order_socket;

						order_socket.emit(SocketEvent.driver_added, {
							id,
							orderId: newOrder.id,
						});
						console.info('you are assigned the order: ', message);
						store.dispatch(socketActions.setMessage(message));
						store.dispatch(socketActions.addOrderAndOptimizeRoute(newOrder));
					} catch (error) {
						console.error('order assigned error: ', error.message);
						store.dispatch(socketActions.setError(error.message));
					}
				},
			);

			dispatch_socket.on(
				SocketEvent.order_assigned_to_another_driver,
				({ message }) => {
					console.info('order assigned to another driver', message);
					store.dispatch(socketActions.setMessage(message));
					store.dispatch(socketActions.clearOrderRequest());
				},
			);

			dispatch_socket.on(SocketEvent.disconnect, () => {
				console.info('disconnecting from dispatch socket.');
				delete socketMap['dispatch_socket'];
			});
		}

		if (socketActions.acceptOrder.match(action)) {
			dispatch_socket.emit(SocketEvent.accept_order, {
				data: { id, phone, orderId: action.payload.orderId },
			});
		}

		if (socketActions.declineOrder.match(action)) {
			dispatch_socket?.emit(SocketEvent.decline_order);
			store.dispatch(
				socketActions.setMessage(
					'You declined this order. Stay online to receive more delivery orders!',
				),
			);
			store.dispatch(socketActions.clearOrderRequest());
		}

		let socketKey: string;
		let _order_socket_connection: Socket | null;

		const isActiveDelivery =
			store.getState().driver.driver.driverSession.isActiveDelivery;

		for (socketKey in socketMap) {
			// eslint-disable-next-line sonarjs/no-collapsible-if
			if (isActiveDelivery === true) {
				if (socketKey.startsWith('order:')) {
					_order_socket_connection = getSocket(socketKey) as Socket;

					_order_socket_connection.on(SocketEvent.connection, () => {
						console.info('socket connection for ' + socketKey);
					});

					_order_socket_connection.on(SocketEvent.get_location, () => {
						// const { geoLocation } = store.getState().user.user.location;
						const geoLocation = [24, 24];

						_order_socket_connection.emit(SocketEvent.send_location, {
							data: { location: geoLocation },
						});
					});

					_order_socket_connection.on(
						SocketEvent.message,
						({ type, message, data }) => {
							console.info(
								`Message Event: 
		  type: ${type},
		  message: ${message},
		  data: ${data}`,
							);
						},
					);

					_order_socket_connection.on(
						SocketEvent.navigate,
						({ type }: { type: any }) => {
							switch (type) {
								case NavigateEvent.to_vendor:
									store.dispatch(socketActions.updateDestinationType('vendor'));
									break;
								case NavigateEvent.to_customer:
									store.dispatch(
										socketActions.updateDestinationType('customer'),
									);
									break;
							}
						},
					);

					// ADVANCED USE CASE FOR HANDLING MULTIPLE DELIVERIES AND REAL-TIME LOCATION SHARING VVV

					// if (driver.currentLocationUpdate.fulfilled.match(action)) {
					// 	// Save location in the Route record as well.
					// 	// connect route record to order record

					// 	// frequency of this action call and subsequent socket event are in useLocationWatch hook

					// 	// there is an order delivery active,
					// 	// for every orderSocket that is active,

					// 	// send the orderId for discrete handling by dispatch
					// 	// socket transmisson will route to the room for the order,
					// 	// and received by any clients listening in that order room
					// 	next(action);
					// 	const { geoLocation } = store.getState().user.user.location;
					// 	console.info('sending location share event');
					// 	const orderId = getOrderIdFromSocketKey(socketKey);
					// 	_order_socket_connection.emit(SocketEvent.SendLocation, {
					// 		data: { orderId: orderId, geoLocation },
					// 	});
					// }

					// if driver arrive to vendor for delivery,
					// emit arrive event with a list of orderIds that match the vendorId
					// the order Ids are used on delivery to emit the event to the applicable order socket rooms
					if (socketActions.arriveToVendor.match(action)) {
						const { vendorId } = action.payload;
						// possible issue: this event is being emitted more than necessary to the socket rooms, and dispatch
						// is handling the event more than is needed. ??

						// V this code checks if the order is in the remaining routes state,
						// and uses the order id to emit the event to the order socket room
						const ordersListMatchVendor = store
							.getState()
							.socket.remainingRoute.filter((order) => {
								console.info(
									'vendorId match order? ',
									order.organization.id === vendorId,
								);
								return order.organization.id === vendorId;
							})
							.map((order) => order.id);

						console.info(
							'orderLists from vendor length: ',
							ordersListMatchVendor.length,
						);

						const socketOrderId = getOrderIdFromSocketKey(socketKey);
						if (ordersListMatchVendor.includes(socketOrderId)) {
							_order_socket_connection.emit(SocketEvent.navigate, {
								type: NavigateEvent.arrive_to_vendor,
								data: { orderIdList: ordersListMatchVendor },
							});
							console.info(
								'event: ',
								SocketEvent.navigate,
								'type: ',
								NavigateEvent.arrive_to_vendor,
							);
						}
					}

					// if driver pickup products for delivery, emit pickup product to order socket room
					if (socketActions.pickupProducts.match(action)) {
						// send socket events to all orders based on a list input of orderId
						const { orderIdList } = action.payload;
						const socketOrderId = getOrderIdFromSocketKey(socketKey);
						if (orderIdList.includes(socketOrderId)) {
							_order_socket_connection.emit(SocketEvent.navigate, {
								type: NavigateEvent.pickup_product,
								data: { orderId: socketOrderId },
							});

							console.info(
								'event: ',
								SocketEvent.navigate,
								'type: ',
								NavigateEvent.pickup_product,
							);
						}
					}

					// if driver arrive to customer for delivery, emit arrive event to order socket room
					if (socketActions.arriveToCustomer.match(action)) {
						const { orderId } = action.payload;
						if (getOrderIdFromSocketKey(socketKey) === orderId) {
							_order_socket_connection.emit(SocketEvent.navigate, {
								type: NavigateEvent.arrive_to_customer,
								data: { orderId: orderId },
							});
							console.info(
								'event: ',
								SocketEvent.navigate,
								'type: ',
								NavigateEvent.arrive_to_customer,
							);
						}
					}

					// dispatch socket disconnect
					dispatch_socket?.on(SocketEvent.disconnect, () => {
						console.info('disconnect dispatch socket again, to be sure.');
						delete socketMap['dispatch_socket'];
					});

					// order socket disconnect
					_order_socket_connection.on(SocketEvent.disconnect, () => {
						console.info('disconnecting from socket room: ' + socketKey);
						delete socketMap[socketKey];
					});

					// old comment: handle middleware after the action is executed
					// if remove completed order, emit deliver order event to order socket room
					// if remainingRoutes is empty, dispatch ordersCompletedAll action
					if (socketActions.removeCompletedOrder.match(action)) {
						const { orderId } = action.payload;
						if (getOrderIdFromSocketKey(socketKey) === orderId) {
							_order_socket_connection.emit(SocketEvent.navigate, {
								type: NavigateEvent.deliver_product,
								data: { orderId: orderId },
							});
							console.info(
								'event: ',
								SocketEvent.navigate,
								'type: ',
								NavigateEvent.deliver_product,
							);

							// handle disconnect from room
							// delete socketMap[socketKey];
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
					}
					if (socketActions.closingConnection.match(action)) {
						try {
							if (dispatch_socket) {
								console.log('1a');
								dispatch_socket.close();
								console.log(2);
								delete socketMap['dispatch_socket'];
								console.log(3);
								dispatch_socket = null;
								console.log(4);
							}

							console.info('order socket', _order_socket_connection);
							if (_order_socket_connection) {
								console.log(6);
								_order_socket_connection.close();
								console.log(7);
								delete socketMap[socketKey];
								console.log(8);
								_order_socket_connection = null;
								console.log(9);
							}

							store.dispatch(socketActions.connectionClosed());
						} catch (error) {
							console.info('error closing connection: ', error);
						}
					}
				} // is a orderSocket
			} // socketMap iterate
		} // isActiveDelivery
		// handle for the proper disconnect on closing, using orderId for discretion
		if (socketActions.closingConnection.match(action)) {
			try {
				if (dispatch_socket) {
					console.log('1b');
					dispatch_socket.close();
					console.log(2);
					delete socketMap['dispatch_socket'];
					console.log(3);
					dispatch_socket = null;
					console.log(4);
				}
				store.dispatch(socketActions.connectionClosed());
			} catch (error) {
				console.info('error closing connection: ', error);
			}
		}
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
