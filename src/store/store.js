// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import customerReducer from "./slices/customerSlice";
import adminReducer from "./slices/adminSlice";
import authuserReducer from "./slices/authuserSlice";
import categoryReducer from "./slices/categorySlice";
import couponReducer from "./slices/couponSlice";
import cartReducer from "./slices/cartSlice"; // ADD THIS
import authuser from "./slices/authuserSlice";

export const store = configureStore({
  reducer: {
    auth: authuserReducer,
    admin: adminReducer,
    products: productReducer,
    orders: orderReducer,
    customers: customerReducer,
    categories: categoryReducer,
    cart: cartReducer, // ADD THIS
    coupons: couponReducer,
    authuser: authuser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;
