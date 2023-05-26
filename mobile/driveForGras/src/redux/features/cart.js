import { createSlice } from "@reduxjs/toolkit";

const countTotalItems = (state) => {
    let totalItems = state.cart.reduce((a, b) => a + b.quantity, 0)

    state.totalItems = totalItems
}

const countSubtotal = (state) => {
    let subTotal = state.cart.reduce((a, b) => a + b.subTotal, 0)

    state.subTotal = Number(subTotal.toFixed(2))
}

const checkOrderVendor = (state,action) => {
    // if (state.orderFromVendor !== action.payload.vendorId) {
    //     return 
    //     "your bag already contains 
    //     an item from Vendor1.
    //     Would you like to empty the bag
    //     and add this item from
    //     Vendor2 instead?"

    // also add convenience feature:
    //     "Would you like to save items from Vendor1 in your Wishlist?" ;)
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        orderVendor: {},
        isEmpty: true,
        cart: [],
        totalItems: 0,
        subTotal: 0
    },
    reducers: {
        addItem: (state, action) => {
            let item = state.cart.find(i => i.productId == action.payload.productId)
            if (item) {
                console.log('item exists')
                item.quantity += action.payload.quantity
                item.subTotal += action.payload.subTotal
            }
            if (!item) {
                console.log('item does not exist in cart')
                state.cart.push(action.payload)
                state.isEmpty = false
            }

            countTotalItems(state)
            countSubtotal(state)
        },

        updateItemQty: (state, action) => {
            // what am I trying to do here?

            // replace the existing object in the cart array [] with the action payload
            // update the totalItems value to reflect the new quantity of the cart
            // update the subTotal value to reflect the new subtotal of all the items

            let item = state.cart.find(i => i.productId == action.payload.productId)

            let itemIndex = state.cart.indexOf(item)
            if (itemIndex !== -1) {
                console.log('item exists')
                state.cart[itemIndex] = action.payload
            }

            countTotalItems(state)
            countSubtotal(state)
        },

        removeItem: (state, action) => {
            newCartState = state.cart.slice()
            .filter(i => i.productId !== action.payload.productId);

            state.cart = newCartState
            countTotalItems(state)
            countSubtotal(state)
            
            if(state.totalItems <= 0) state.isEmpty = true
        }
    }
})

export const { addItem, updateItemQty, removeItem, 
} = cartSlice.actions

export default cartSlice.reducer