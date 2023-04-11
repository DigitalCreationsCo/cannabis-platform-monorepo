import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { calcSalePrice } from "../../utils";
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
export const addItem = createAsyncThunk("cart/addItem", async (addItem, { getState, dispatch, rejectWithValue }) => {
    try {
        const { cart } = getState();
        const itemDispensaryAndCartDispensaryConflict = !(cart.order.organizationId === addItem.organizationId || cart.order.organizationId === "");
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
        }
        else {
            // NavigationService.goBack();
            return addItem;
        }
    }
    catch (error) {
        console.log("add item to cart error: ", error);
        return rejectWithValue("item was not added to cart");
    }
});
const initialState = {
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
    cart: [],
    totalItems: 0,
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
        updateItem: (state, { payload }) => {
            const itemInCart = state.cart.find(item => item.id == payload.id);
            const index = state.cart.indexOf(itemInCart);
            if (index !== -1) {
                state.cart[index] = payload;
                state.totalItems = countTotalItems(state.cart);
                state.subtotal = countCartSubtotal(state.cart);
            }
        },
        removeItem: (state, { payload }) => {
            const removeId = payload;
            const newCart = state.cart.filter((item) => item.id !== removeId);
            state.cart = newCart;
            state.totalItems = countTotalItems(state.cart);
            state.subtotal = countCartSubtotal(state.cart);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItem.fulfilled, (state, { payload }) => {
            const addItem = payload;
            if (state.order.organizationId === "") {
                state.order.organizationId = addItem.organizationId;
                state.orderDispensaryName = addItem.organizationName;
            }
            let item = state.cart.find(item => item.id == addItem.id);
            if (!item) {
                state.cart.push(addItem);
            }
            if (item) {
                item.quantity += addItem.quantity;
            }
            state.totalItems = countTotalItems(state.cart);
            state.subtotal = countCartSubtotal(state.cart);
        }),
            builder.addCase(addItem.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            }),
            builder.addCase(addItem.rejected, (state, { payload }) => {
                const error = payload;
                console.log('add item to cart error: ', error);
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = error;
            });
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
function countTotalItems(itemList) {
    const totalItems = itemList.reduce((sum, item) => sum + item.quantity, 0);
    return totalItems;
}
;
function countCartSubtotal(itemList) {
    const subtotal = itemList.reduce((sum, item) => sum + getItemDiscountPrice(item), 0);
    return subtotal;
}
;
function getItemDiscountPrice(item) {
    let discount = 0;
    if (item.discount !== discount || item.discount !== null || item.discount !== undefined) {
        discount = item.discount;
        return calcSalePrice(item.basePrice, discount);
    }
    else
        return item.basePrice;
}
export const cartActions = {
    addItem,
    //   addOrderVendor,
    //   createOrderForCheckout,
    //   submitOrder,
    ...cartSlice.actions,
};
export const cartReducer = cartSlice.reducer;
export const selectCartState = (state) => state.cart;
export const selectIsCartEmpty = (state) => state.cart.totalItems === 0;
//# sourceMappingURL=cart.reducer.js.map