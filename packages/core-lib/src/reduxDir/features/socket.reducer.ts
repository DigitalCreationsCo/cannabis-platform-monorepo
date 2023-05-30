import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderWithDetails } from "../../../../data-access/src";
import { AppState } from "../reduxTypes";


// ACTIONS TRIGGER EVENTS IN THE SOCKET MIDDLEWARE

export const testAsyncAction = createAsyncThunk(
  "socket/testAsyncAction",
  async (_, thunkAPI) => {
    setTimeout(() => {
      return console.log("test-action");
    }, 2000);
  }
);

// export const orderAccepted = createAsyncThunk(
//   "socket/orderAccepted",
//   async ({ newOrder }, thunkAPI) => {
//     try {
//       let order = { ...newOrder };
//       order.metadata = {
//         isDriverAdded: false,
//         isDriverArrivedToVendor: false,
//         isProductPickup: false,
//         isDriverArrivedToCustomer: false,
//         isDeliveryComplete: false,
//       };
//       await thunkAPI.dispatch(
//         socketActions.addOrderToDispatchOrders({ order })
//       );
//       const { dispatchOrders } = await thunkAPI.getState().socket;
//       console.log("orderAccepted: dispatchOrders: ", dispatchOrders);
//       await thunkAPI.dispatch(
//         socketActions.sortDispatchRoute({ dispatchOrders })
//       );
//     } catch (err) {
//       console.log("A general error occured: orderAccepted-", error);
//       thunkAPI.rejectWithValue("A general error occured: orderAccepted- ");
//     }
//   }
// );

// export const sortDispatchRoute = createAsyncThunk(
//   "socket/sortDispatchRoute",
//   async ({ dispatchOrders }, thunkAPI) => {
//     try {
//       const sortedRoute = await dispatchOrders;
//       console.log("sorted Dispatch Route: ", sortedRoute);
//       return { sortedRoute };
//     } catch (err) {
//       console.log("A general error occured: sortDispatchRoute-", error);
//       thunkAPI.rejectWithValue("A general error occured: sortDispatchRoute- ");
//     }
//   }
// );

/* 
forEach order in orderList,
create a destination Object from vendor property,
create a destination Object from customer property,
return both of them, concat to routeList
 */
export const buildDestinationRoute = (orderList) => {
  const remainingRoute = [];
  const createDestination = (order) => {
    if ((order && order.customer) || (order && order.vendor)) {
      const vendorDest = {};
      const customerDest = {};
    }
  };
};

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

type IncomingOrder = {
  newOrder: OrderWithDetails | null; 
  message: string | null 
}

export type SocketStateType = {
  connectionOpenInit: boolean;
  connectionCloseInit: boolean;
  isConnected: boolean;
  errorMessage: string;
  message: string;
  dispatchOrders: OrderWithDetails[];
  remainingRoute: OrderWithDetails[];
  destinationType: "organization" | "customer";
  incomingOrder: IncomingOrder;
}

const initialState: SocketStateType = {
  connectionOpenInit: false,
  connectionCloseInit: false,
  isConnected: false,
  errorMessage: "",
  message: "",
  dispatchOrders: [],
  remainingRoute: [],
  destinationType: 'organization',
  incomingOrder: { newOrder: null, message: null },
}

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    openConnection: (state) => {
      state.connectionOpenInit = true;
      console.log('open connection.');
      state.errorMessage = 'something happened'
    },
    
    closeConnection: (state) => {
      state.connectionCloseInit = true;
      console.log('closing connection.');
    },
    
    connectionEstablished: (state) => {
      
      state.connectionOpenInit = false;
      state.isConnected = true;
      console.log('connection established. ready to send and receive data.');
    },
    connectionClosed: (state) => {
      state.connectionCloseInit = false;
      state.isConnected = false;
      console.log("socket connection is closed.");
    },
    receiveNewOrderRequest: (state, { payload }: { payload: IncomingOrder}) => {

      const
      incomingOrder = payload;

      state.incomingOrder = incomingOrder;
      
    },
    clearOrderRequest: (state) => {

      state.incomingOrder.newOrder = null;
      state.incomingOrder.message = null;
      
    },
    acceptOrder: (state) => {

      console.log("accept_order");

    },
    declineOrder: (state) => {
      
      console.log("decline_order");

    },
    addOrderToDispatchOrders: (state, { payload }) => {
      let { order } = payload;
      state.dispatchOrders.push(order);
    },
    pickupProducts: (state, { payload }) => {
      // const { orderIdList } = payload;
    },
    // receiveSubsequentOrder: (state, { payload }) => {
    //   state.dispatchOrders.push = payload.order;
    //   state.incomingOrder.newOrder = null;
    //   state.incomingOrder.message = null;
    // },
    // beginOrder: () => {},
    arriveToVendor: (state, { payload }) => {
      let { vendorId } = payload;
      console.log("arrive to vendor : ", vendorId);
      NavigationService.navigate(DeliveryScreens.PICKUP_PRODUCT_VIEW);
    },
    // navigateToCustomer: () => {},
    arriveToCustomer: (state, { payload }) => {
      let { orderId } = payload;
      console.log("arrive to customer orderId: ", orderId);
      NavigationService.navigate(DeliveryScreens.FINALIZE_DELIVERY_VIEW);
    },
    // completeOrder: () => {},
    // beginSubsequentOrder: () => {},
    updateDestinationType: (state, { payload }) => {
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
        (destination) => destination.orderId !== orderId
      );
      state.remainingRoute = updateRemainingRoute;
      const updateDispatchOrders = state.dispatchOrders.filter(
        (order) => order.orderId !== order
      );
      state.dispatchOrders = updateDispatchOrders;
    },
    ordersCompletedAll: (state) => {
      state.remainingRoute.pop();
      state.isActiveDelivery = false;
    },
    resetDeliveryState: (state) => {
      state.dispatchOrders = [];
      state.remainingRoute = [];
      state.isActiveDelivery = false;
    },
    setMessage: (state, { payload: { message } }) => {
      // add a timeout for the message here or where message is displayed in UI
      state.message = message;
    },
    clearMessage: (state) => {
      state.message = "";
    },
    testAction: (state) => {
      setTimeout(() => {
        console.log("test-action");
      }, 2000);
    },
  },
  extraReducers: {
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
  },
});

export const socketActions = {
  ...socketSlice.actions,
  // createOrderSocketConnection,
  // orderAccepted,
  // sortDispatchRoute,
  // completeDeliveryOrder,
};

export const socketReducer = socketSlice.reducer;

export const selectSocketState = (state: AppState) => state.socket;
