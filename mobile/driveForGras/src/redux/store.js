import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import vendorReducer from "./features/vendors";
import productsReducer from "./features/products";
import cartReducer from "./features/cart";
import socketReducer from "./features/socket";
import moduleReducer from "./features/module";
import { loggerMiddleware } from "./middleware";
import { crashMiddleware } from "./middleware";
import { socketMiddleware } from "./middleware";
import { routeMiddleware } from "./middleware";

const store = configureStore({
  reducer: {
    user: userReducer,
    vendors: vendorReducer,
    products: productsReducer,
    cart: cartReducer,
    socket: socketReducer,
    module: moduleReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      crashMiddleware,
      loggerMiddleware,
      routeMiddleware,
      socketMiddleware,
    ]);
  },
});

export default store;
