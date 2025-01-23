/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
type OrderWithDispatchDetails = any;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type Socket } from 'socket.io-client';
import { type ThunkArgumentsType, type AppState } from '../types/redux.types';
import {
	type IncomingOrder,
	type SocketEventPayload,
} from '../types/socket.types';
import { updateOnlineStatus } from './action/updateOnlineStatus';

const testAsyncAction = createAsyncThunk(
	'socket/testAsyncAction',
	async () => {
		setTimeout(() => {
			return console.info('test-action');
		}, 2000);
	}
);

// ACTIONS TRIGGER EVENTS IN THE SOCKET MIDDLEWARE
const goOnline = createAsyncThunk<
	{ success: 'true' | 'false'; isOnline: boolean },
	boolean,
	{ extra: ThunkArgumentsType; state: AppState }
>('driver/goOnline', async (onlineStatus, thunkAPI) => {
	try {
		thunkAPI.dispatch(updateOnlineStatus(true));
		return {
			success: 'true',
			isOnline: onlineStatus,
		};
	} catch (error) {
		console.error('goOnline: ', error.message);
		thunkAPI.dispatch(socketActions.setError(error.message));
		thunkAPI.dispatch(updateOnlineStatus(false));

		return thunkAPI.rejectWithValue({
			isOnline: false,
			error: error.message,
		});
	}
});

const addOrderAndOptimizeRoute = createAsyncThunk<
	void,
	OrderWithDispatchDetails['order'],
	{ state: AppState }
>('socket/addOrderAndOptimizeRoute', async (newOrder, thunkAPI) => {
	try {
		const { dispatchOrders } = thunkAPI.getState().socket;
		await thunkAPI.dispatch(sortDispatchRoute([...dispatchOrders, newOrder]));
		thunkAPI.dispatch(socketActions.clearOrderRequest());
	} catch (error) {
		console.info('addOrderAndOptimizeRoute: ', error);
		thunkAPI.rejectWithValue({ error: error.message });
	}
});

const sortDispatchRoute = createAsyncThunk<
	any,
	OrderWithDispatchDetails['order'][],
	{ state: AppState }
>('socket/sortDispatchRoute', async (dispatchOrders, thunkAPI) => {
	try {
		// currently returns the same orderedRoute, but in future will return a sorted route from api call
		const sortedRoute = await Promise.resolve(dispatchOrders);
		thunkAPI.fulfillWithValue({ sortedRoute });
		return { sortedRoute };
	} catch (error) {
		console.info('sortDispatchRoute: ', error);
		thunkAPI.rejectWithValue({ error: error.message });
	}
});

/* 
forEach order in orderList,
create a destination Object from vendor property,
create a destination Object from customer property,
return both of them, concat to routeList
 */
// export const buildDestinationRoute = (orderList) => {
// 	const remainingRoute = [];
// 	const createDestination = (order) => {
// 		if ((order && order.customer) || (order && order.vendor)) {
// 			const vendorDest = {};
// 			const customerDest = {};
// 		}
// 	};
// };

// export const completeDeliveryOrder = createAsyncThunk(
//   "socket/completeDeliveryOrder",
//   async ({ orderId }, thunkAPI) => {
//     thunkAPI.dispatch(socketActions.removeCompletedOrder({ orderId }));
//     const { remainingRoute } = thunkAPI.getState().socket;
//     if (remainingRoute.length >= 1) {
//       NavigationService.navigate(DeliveryScreens.DELIVERY_ORDER_VIEW);
//     } else {
//       NavigationService.navigate(DriveScreens.COMPLETE_DELIVERY_SCREEN);
//     }
//     return { orderId };
//   }
// );

interface SocketStateType {
	connectionOpenInit: boolean;
	connectionCloseInit: boolean;
	isConnectedToDispatch: boolean;
	isError: boolean;
	errorMessage: string;
	message: string;
	dispatchOrders: OrderWithDispatchDetails['order'][];
	remainingRoute: OrderWithDispatchDetails['order'][];
	destinationType: 'vendor' | 'customer';
	incomingOrder: IncomingOrder;
}

const initialState: SocketStateType = {
	connectionOpenInit: false,
	connectionCloseInit: false,
	isConnectedToDispatch: false,
	isError: false,
	errorMessage: '',
	message: '',
	dispatchOrders: [],
	remainingRoute: [],
	destinationType: 'vendor',
	incomingOrder: { newOrder: null, message: null },
};

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		openConnection: (state) => {
			state.connectionOpenInit = true;
			state.connectionCloseInit = false;
			state.isError = false;
		},
		closingConnection: (state) => {
			state.connectionOpenInit = false;
			state.connectionCloseInit = true;
			console.info('closing connection');
		},
		connectionEstablished: (state) => {
			state.connectionOpenInit = false;
			state.connectionCloseInit = false;
			state.isConnectedToDispatch = true;
			state.isError = false;
			state.errorMessage = '';
			console.info('connection established. ready to send and receive data.');
		},
		connectionClosed: (state) => {
			state.connectionOpenInit = false;
			state.connectionCloseInit = false;
			state.isConnectedToDispatch = false;
			// state.errorMessage = '';
			console.info('connection is closed.');
		},
		receiveNewOrderRequest: (
			state,
			{
				payload,
			}: { payload: SocketEventPayload<OrderWithDispatchDetails['order']> }
		) => {
			state.incomingOrder.message = payload.message;
			state.incomingOrder.newOrder =
				payload.data as OrderWithDispatchDetails['order'];
		},
		clearOrderRequest: (state) => {
			state.incomingOrder.newOrder = null;
			state.incomingOrder.message = null;
		},
		declineOrder: () => {
			console.info('decline_order');
		},
		acceptOrder: (state, { payload }: { payload: { orderId: string } }) => {
			console.info('accept_order');
			const { orderId } = payload;
		},
		pickupProducts: () => {
			// const { orderIdList } = payload;
		},
		// receiveSubsequentOrder: (state, { payload }) => {
		//   state.dispatchOrders.push = payload.order;
		//   state.incomingOrder.newOrder = null;
		//   state.incomingOrder.message = null;
		// },
		// beginOrder: () => {},
		arriveToVendor: (_, { payload }) => {
			// const { vendorId } = payload;
			// NavigationService.navigate(DeliveryScreens.PICKUP_PRODUCT_VIEW);
		},
		// navigateToCustomer: () => {},
		arriveToCustomer: (_, { payload }) => {
			// const { orderId } = payload;
			// NavigationService.navigate(DeliveryScreens.FINALIZE_DELIVERY_VIEW);
		},
		updateDestinationType: (
			state,
			{ payload }: { payload: 'vendor' | 'customer' }
		) => {
			state.destinationType = payload;
		},
		removeRouteDestination: (state) => {
			// remainingRoute order orders are executed in the sorted order, always.
			// So a splice or unshift is sufficient.
			// in future, maybe will have to handle with a discrete orderId
			const updateRemainingRoute = state.remainingRoute.splice(1);
			state.remainingRoute = updateRemainingRoute;
		},
		removeCompletedOrder: (state, { payload }) => {
			const { orderId } = payload;
			const updateRemainingRoute = state.remainingRoute.filter(
				(destination) => destination.id !== orderId
			);
			state.remainingRoute = updateRemainingRoute;
			const updateDispatchOrders = state.dispatchOrders.filter(
				(order) => order.id !== orderId
			);
			state.dispatchOrders = updateDispatchOrders;
		},
		ordersCompletedAll: (state) => {
			state.remainingRoute.pop();
			// state.isActiveDelivery = false;
		},
		resetDeliveryState: (state) => {
			state.dispatchOrders = [];
			state.remainingRoute = [];
			// state.isActiveDelivery = false;
		},
		setMessage: (state, { payload }) => {
			state.message = payload;
		},
		setError: (state, { payload }) => {
			const error = payload;
			console.error('socket error: ', error);
			state.isError = true;
			state.errorMessage = error;
			state.connectionOpenInit = false;
			state.connectionCloseInit = false;
		},
		clearMessage: (state) => {
			state.message = '';
		},
		testAction: () => {
			setTimeout(() => {
				console.info('test-action');
			}, 2000);
		},
	},
	extraReducers: (builder) => {
		// builder.addCase(goOnline.fulfilled, (state, { payload }) => {
		// 	state.isSuccess = true;
		// 	state.isLoading = false;
		// 	state.isError = false;
		// }),
		// 	builder.addCase(goOnline.pending, (state) => {
		// 		state.isLoading = true;
		// 	}),
		// 	builder.addCase(goOnline.rejected, (state, { payload }) => {
		// 		const { isOnline, error } = payload;

		// 		state.isLoading = false;
		// 		state.isError = true;
		// 		state.errorMessage = error;
		// 	});

		builder.addCase(updateOnlineStatus.rejected, (state, { payload }: any) => {
			const { error } = payload;

			state.connectionOpenInit = false;
			state.connectionCloseInit = true;
			console.info('updateOnlineStatus rejected, closing connection');

			state.isError = true;
			state.errorMessage = error;
		});

		builder.addCase(
			addOrderAndOptimizeRoute.fulfilled,
			(state, { payload }) => {
				// const { sortedRoute } = payload;
				// state.remainingRoute = sortedRoute;
			}
		);
		builder.addCase(addOrderAndOptimizeRoute.pending, () => {});
		builder.addCase(addOrderAndOptimizeRoute.rejected, (state, { payload }) => {
			console.info('addOrderAndOptimizeRoute', payload);
			const { error } = payload;

			state.isError = true;
			state.errorMessage = error;
		});
		builder.addCase(sortDispatchRoute.fulfilled, (state, { payload }) => {
			const { sortedRoute } = payload;
			state.remainingRoute = sortedRoute;
		});
		builder.addCase(sortDispatchRoute.pending, () => {});
		builder.addCase(sortDispatchRoute.rejected, (state, { payload }) => {
			console.info('addOrderAndOptimizeRoute', payload);

			const { error } = payload;

			state.isError = true;
			state.errorMessage = error;
		});
	},
	// [testAsyncAction.fulfilled]: () => {},
	// [createOrderSocketConnection.fulfilled]: () => {},
	// [createOrderSocketConnection.pending]: () => {},
	// [createOrderSocketConnection.rejected]: () => {},
	// [orderAccepted.fulfilled]: () => {},
	// [orderAccepted.pending]: () => {},
	// [orderAccepted.rejected]: () => {},
	// [sortDispatchRoute.fulfilled]: (state, { payload }) => {
	//   const { sortedRoute } = payload;
	//   state.remainingRoute = sortedRoute;
	// },
	// [sortDispatchRoute.pending]: () => {},
	// [sortDispatchRoute.rejected]: () => {},
	// [completeDeliveryOrder.fulfilled]: (state, { payload }) => {},
	// [completeDeliveryOrder.pending]: () => {},
	// [completeDeliveryOrder.rejected]: () => {},
});

const socketActions = {
	...socketSlice.actions,
	goOnline,
	addOrderAndOptimizeRoute,
	// createOrderSocketConnection,
	// orderAccepted,
	// sortDispatchRoute,
	// completeDeliveryOrder,
};

const socketReducer = socketSlice.reducer;

const selectSocketState = (state: AppState) => state.socket;

export {
	socketActions,
	socketReducer,
	socketSlice,
	
	selectSocketState
}

export type {
	SocketEventPayload,
	SocketStateType
}