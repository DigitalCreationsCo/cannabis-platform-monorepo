import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { NavigationService } from "../../navigation";
import {
  DeliveryScreens,
  DriveScreens
} from "../../navigation/navigationPaths";
import { urlBuilder } from "../../utils";

export const testAsyncAction = createAsyncThunk(
  "socket/testAsyncAction",
  async (_, thunkAPI) => {
    setTimeout(() => {
      return console.log("test-action");
    }, 2000);
  }
);

// not used currently, socket connections are in middleware
export const createOrderSocketConnection = createAsyncThunk(
  "socket/createOrderSocketConnection",
  async (orderId, thunkAPI) => {
    // create socket connection with order namespace
    console.log("socket url: ", urlTable.DISPATCH_CONNECT() + "/hello");
    return io(urlBuilder.DISPATCH_CONNECT(), {
      autoConnect: true,
      transports: ["websocket"],
      jsonp: false,
    });
  }
);

export const orderAccepted = createAsyncThunk(
  "socket/orderAccepted",
  async ({ newOrder }, thunkAPI) => {
    try {
      let order = { ...newOrder };
      order.metadata = {
        isDriverAdded: false,
        isDriverArrivedToVendor: false,
        isProductPickup: false,
        isDriverArrivedToCustomer: false,
        isDeliveryComplete: false,
      };
      await thunkAPI.dispatch(
        socketActions.addOrderToDispatchOrders({ order })
      );
      const { dispatchOrders } = await thunkAPI.getState().socket;
      console.log("orderAccepted: dispatchOrders: ", dispatchOrders);
      await thunkAPI.dispatch(
        socketActions.sortDispatchRoute({ dispatchOrders })
      );
    } catch (err) {
      console.log("A general error occured: orderAccepted-", error);
      thunkAPI.rejectWithValue("A general error occured: orderAccepted- ");
    }
  }
);

export const sortDispatchRoute = createAsyncThunk(
  "socket/sortDispatchRoute",
  async ({ dispatchOrders }, thunkAPI) => {
    try {
      const sortedRoute = await dispatchOrders;
      console.log("sorted Dispatch Route: ", sortedRoute);
      return { sortedRoute };
    } catch (err) {
      console.log("A general error occured: sortDispatchRoute-", error);
      thunkAPI.rejectWithValue("A general error occured: sortDispatchRoute- ");
    }
  }
);

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

export const completeDeliveryOrder = createAsyncThunk(
  "socket/completeDeliveryOrder",
  async ({ orderId }, thunkAPI) => {
    thunkAPI.dispatch(socketActions.removeCompletedOrder({ orderId }));
    const { remainingRoute } = thunkAPI.getState().socket;
    if (remainingRoute.length >= 1) {
      NavigationService.navigate(DeliveryScreens.DELIVERY_ORDER_VIEW);
    } else {
      NavigationService.navigate(DriveScreens.COMPLETE_DELIVERY_SCREEN);
    }
    return { orderId };
  }
);

// export const resetDeliveryState = createAsyncThunk(
//   "socket/resetDeliveryState",
//   async (_, thunkAPI) => {
//     NavigationService.navigate(DeliveryScreens.DELIVERY_ORDER_VIEW);
//   }
// );

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    isEstablishingConnection: false,
    isConnected: false,
    connectionError: "",
    dispatchOrders: [],
    remainingRoute: [],
    isActiveDelivery: false,
    // move this flag to user metadata,
    // create async thunk to change state in user reducer

    destinationType: "vendor", // "VENDOR" || "CUSTOMER"
    incomingOrder: { newOrder: null, message: null },
    message: "",
    isClosingConnection: false,
  },
  reducers: {
    openConnection: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = false;
    },
    receiveNewOrderRequest: (state, { payload: { order, message } }) => {
      console.log(message);
      state.incomingOrder.newOrder = order;
      state.incomingOrder.message = message;
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
    closeConnection: (state) => {
      state.isClosingConnection = true;
    },
    connectionClosed: (state) => {
      console.log("socket connection is closed.");
      state.isClosingConnection = false;
      state.isEstablishingConnection = false;
      state.isConnected = false;
    },
    testAction: (state) => {
      setTimeout(() => {
        console.log("test-action");
      }, 2000);
    },
  },
  extraReducers: {
    [testAsyncAction.fulfilled]: () => {},
    [createOrderSocketConnection.fulfilled]: () => {},
    [createOrderSocketConnection.pending]: () => {},
    [createOrderSocketConnection.rejected]: () => {},

    [orderAccepted.fulfilled]: () => {},
    [orderAccepted.pending]: () => {},
    [orderAccepted.rejected]: () => {},

    [sortDispatchRoute.fulfilled]: (state, { payload }) => {
      const { sortedRoute } = payload;
      state.remainingRoute = sortedRoute;
    },
    [sortDispatchRoute.pending]: () => {},
    [sortDispatchRoute.rejected]: () => {},

    [completeDeliveryOrder.fulfilled]: (state, { payload }) => {},
    [completeDeliveryOrder.pending]: () => {},
    [completeDeliveryOrder.rejected]: () => {},
  },
});

export const socketActions = {
  createOrderSocketConnection,
  orderAccepted,
  sortDispatchRoute,
  completeDeliveryOrder,
  ...socketSlice.actions,
};
export default socketSlice.reducer;
