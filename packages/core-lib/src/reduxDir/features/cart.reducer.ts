// @ts-nocheck

import { OrderItem, OrderStatus } from "@cd/data-access";
import { AnyAction, createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { calcSalePrice } from "../../utils";
import { AppState, ThunkArgumentsType } from "../types";
// import { NavigationService } from "../../navigation";
// import { AppScreen, TabScreen } from "../../navigation/navigationPaths";
// import { messageActions } from "./message";
// import { modalActions } from "./modal";
// import { paymentActions } from "./payment";
// import socket, { socketActions } from "./socket";
// import { userActions } from "./user";
// import ObjectID from "bson-objectid";
// import {
//   TextContent,
//   locationTypes,
//   messageTypes,
//   modalTypes,
// } from "@cannabis_delivery/component_dispensary.constants";
// import {
//   fetchData,
//   urlList,
// } from "@cannabis_delivery/component_dispensary.utils";

export const addItem = createAsyncThunk<OrderItem[], OrderItem, {dispatch: Dispatch<AnyAction>; extra: ThunkArgumentsType;}>(
  "cart/addItem",
  async (addItem, { getState, dispatch, rejectWithValue }) => {
    try {
      const { cart } = getState() as { cart: CartStateProps };

      const itemDispensaryAndCartDispensaryConflict =
        !(cart.order.organizationId === addItem[0].organizationId || cart.order.organizationId === "");
      if (itemDispensaryAndCartDispensaryConflict) {
        console.log("item and cart dispensary conflict");
        // const confirmAddToCart = await dispatch(
        //   modalActions.launchConfirmModal({
        //     modalType: modalTypes.confirmationModal,
        //     modalText: TextContent.CONFIRM_ADD_TO_CART,
        //   })
        // );
        // if (confirmAddToCart.payload) {
        //   console.log("* clear cart state and add the new items");
        //   await thunkAPI.dispatch(cartActions.clearCartState());
        //   NavigationService.goBack();
        //   return addingItem;
        // } else {
        //   console.log("Dont add to cart -- do nothing");
        //   return thunkAPI.rejectWithValue("user declined add to cart");
        // }
        return rejectWithValue("declined add to cart");
      } else {
        // NavigationService.goBack();
        return addItem;
      }
    } catch (error) {
        console.log("add item to cart error: ", error);
        return rejectWithValue("item was not added to cart");
    }
  }
);

// export const addOrderVendor = createAsyncThunk(
//   "cart/addOrderVendor",
//   async (vendorId, thunkAPI) => {
//     try {
//       const response = await fetchData(urlList.GET_VENDOR_FOR_ORDER(vendorId), {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 200) {
//         let data = await response.json();
//         // console.log("orderVendor data? ", data);
//         return data;
//       }
//     } catch (error) {
//       console.log("A general error occured: addOrderVendor-", error);
//       thunkAPI.rejectWithValue(
//         "A general error occured: addOrderVendor-",
//         error
//       );
//     }
//   }
// );

// export const createOrderForCheckout = createAsyncThunk(
//   "cart/createOrderForCheckout",
//   async (_, thunkAPI) => {
//     try {
//       const { cart, cartVendorId, subTotal } = thunkAPI.getState().cart;
//       const { user } = thunkAPI.getState().user;
//       const {
//         email,
//         password,
//         orderHistory,
//         preferences,
//         recentlyViewedVendors,
//         recentlyViewedProducts,
//         locationData,
//         ...customer
//       } = user;
//       // prepare customer data for order
//       // currentLocation will have data filled in from realTimeLocation update API call
//       // homeLocation will have data filled in from database
//       // if giftLocation, skip this clause, and inherit the location
//       let { selectedLocationType } = locationData;
//       let { address, location, locationType } =
//         locationData[selectedLocationType];
//       customer.location = { locationType, ...location };
//       customer.address = address;
//       const trimProductsData = cart.map(
//         ({ medImage, smImage, reviews, productCategory, ...productInfo }) =>
//           productInfo
//       );
//       const { payload } = await thunkAPI.dispatch(addOrderVendor(cartVendorId));
//       // remove products field from this vendor in backend
//       const { products, rating, tag, ...vendor } = payload;
//       if (payload.error) {
//         console.log(
//           "A general error occured retreiving vendor: addOrderVendor-",
//           payload.error
//         );
//         return thunkAPI.rejectWithValue(
//           "A general error occured retreiving vendor: addOrderVendor-",
//           payload.error
//         );
//       }
//       const orderId = ObjectID().toString();
//       console.log("new order Id? ", orderId);
//       console.log("order vendor ? ", vendor);
//       // console.log("order subtotal ? ", subTotal);
//       return {
//         order: {
//           orderId,
//           customer,
//           vendor,
//           products: trimProductsData,
//           subTotal,
//         },
//       };
//     } catch (error) {
//       console.log("A general error occured: createOrderForCheckout-", error);
//       thunkAPI.rejectWithValue(
//         "A general error occured: createOrderForCheckout-",
//         error
//       );
//     }
//   }
// );

// export const submitOrder = createAsyncThunk(
//   "cart/submitOrder",
//   async (_, thunkAPI) => {
//     try {
//       // try sending order for dispatch before handling payment.
//       // this is a way to guarantee that orders
//       // are submitted for fulfillment before we take any payment
//       // from a customer!

//       const { order } = thunkAPI.getState().cart;
//       // console.log("submitting order: ", order);
//       let { orderId } = order;
//       // create socket connection to dispatch server
//       thunkAPI.dispatch(socketActions.startConnecting(orderId));
//       // test receiving an error from API
//       const { payload } = await thunkAPI.dispatch(
//         paymentActions.purchaseOrder({ order })
//       );
//       if (payload) {
//         await thunkAPI.dispatch(
//           messageActions.handleMessageBanner({
//             messageType: messageTypes.CART_MESSAGE,
//             message: TextContent.PAYMENT_SUCCESSFUL,
//           })
//         );
//         await thunkAPI.dispatch(socketActions.placeDispatchOrder({ order }));
//         thunkAPI.dispatch(cartActions.clearCartState());
//         NavigationService.navigate(TabScreen.ORDER_SCREEN);
//       } else {
//         thunkAPI.rejectWithValue(
//           "A general error occured: submitOrder-",
//           error
//         );
//       }
//       // navigate to HomeScreen
//       // NavigationService.navigate("HomeScreen");
//     } catch (error) {
//       console.log("A general error occured: submitOrder-", error);
//       thunkAPI.rejectWithValue("A general error occured: submitOrder-", error);
//     }
//   }
// );

export type CartStateProps = {
    order: {
        subtotal: number;
        total: number;
        taxFactor: number;
        tax: number;
        orderStatus: OrderStatus | null;
        addressId: string;
        customerId: string;
        organizationId: string;
    };
    orderDispensaryName: string;
    cart: OrderItem[];
    totalItems: number;
    subtotal: number;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
}

const initialState: CartStateProps = {
    order: {
        subtotal: 0,
        total: 0,
        taxFactor: 0,
        tax: 0,
        orderStatus: null,
        addressId: '',
        customerId: '',
        organizationId: '',
    },
    orderDispensaryName: '',
    cart: [{
      name: 'Hello'
    }],
    totalItems: 1,
    subtotal: 0,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearState: () => initialState,
    
    updateItem: (state, {payload}: PayloadAction<OrderItem>) => {
      const itemInCart = state.cart.find(
        item => item.id == payload.id
      ) as OrderItem;
      const index = state.cart.indexOf(itemInCart);
      
      if (index !== -1) {
        state.cart[index] = payload;
        state.totalItems = countTotalItems(state.cart);
        state.subtotal = countCartSubtotal(state.cart);
      }
    },

    removeItem: (state, { payload }: PayloadAction<string>) => {
        const removeId = payload
        const newCart = state.cart.filter((item) => item.id !== removeId);
        state.cart = newCart;
        state.totalItems = countTotalItems(state.cart);
        state.subtotal = countCartSubtotal(state.cart);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addItem.fulfilled, (state, { payload }) => {
        const addItems = payload
        if (state.order.organizationId === "") {
            state.order.organizationId = addItem[0].organizationId;
            state.orderDispensaryName = addItem[0].organizationName;
        }
        
        addItems.forEach((addItem) => {
          let item = state.cart.find(
              item => item.id == addItem.id
          );
          // no item match -> add item
          if (!item ) {
              state.cart.push(addItem);
          }
          // item match and variant match -> add quantity
          if (item && item.variantId === addItem.variantId) {
              item.quantity += addItem.quantity;
          }
          // item match and variant dont match ( possibly due to lacking data ?? ) -> add item
          if (item && item.variantId !== addItem.variantId) {
            state.cart.push(addItem);
          }
        });

        state.totalItems = countTotalItems(state.cart);
        state.subtotal = countCartSubtotal(state.cart);
        
    }),
    builder.addCase(addItem.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
    }),
    builder.addCase(addItem.rejected, (state, { payload }) => {
        const error = payload as string;
        console.log('add item to cart error: ', error)
        
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = error
    })

    // [addOrderVendor.fulfilled]: (state) => {},
    // [addOrderVendor.pending]: (state) => {},
    // [addOrderVendor.rejected]: (state) => {},

    // [createOrderForCheckout.fulfilled]: (state, { payload }) => {
    //   // console.log("checkout payload ? ", payload);
    //   const { order } = payload;
    //   // console.log("created order for checkout ? ", order);
    //   // console.log("created checkout order fulfilled");
    //   // console.log("order customer ? ", order.customer);
    //   state.order = order;
    // },
    // [createOrderForCheckout.pending]: (state) => {},
    // [createOrderForCheckout.rejected]: (state) => {},

    // [submitOrder.fulfilled]: (state) => {
    //   state.isLoading = false;
    // },
    // [submitOrder.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [submitOrder.rejected]: (state) => {
    //   state.isLoading = false;
    // },
  }
});

function countTotalItems(itemList: OrderItem[]) {
    const totalItems = itemList.reduce((sum, item) => sum + item.quantity, 0);
    return totalItems;
};

function countCartSubtotal(itemList: OrderItem[]) {
    const subtotal = itemList.reduce((sum, item) => sum + getItemDiscountPrice(item), 0);
    return subtotal
};

function getItemDiscountPrice(item: OrderItem) {
    let discount = 0;
    if (item.discount !== discount || item.discount !== null|| item.discount !== undefined) {
        discount = item.discount;
        return calcSalePrice(item.basePrice, discount)
    }
    else return item.basePrice;
}
  
export const cartActions = {
  addItem,
//   addOrderVendor,
//   createOrderForCheckout,
//   submitOrder,
  ...cartSlice.actions,
};

export const cartReducer = cartSlice.reducer;

export const selectCartState = (state: AppState) => state.cart;
export const selectIsCartEmpty = (state: AppState):Boolean => state.cart.totalItems === 0;