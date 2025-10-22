// src/store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    itemCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.itemCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);

      state.itemCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === id);

      if (item) {
        item.quantity = quantity;
      }

      state.itemCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.itemCount = 0;
    },

    setCart: (state, action) => {
      state.cartItems = action.payload;
      state.itemCount = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = action.payload.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
