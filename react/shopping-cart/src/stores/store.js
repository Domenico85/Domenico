// src/stores/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart"; // Ensure this path is correct

const store = configureStore({
  reducer: {
    cart: cartReducer, // Register your cart slice here
  },
});

export default store;
