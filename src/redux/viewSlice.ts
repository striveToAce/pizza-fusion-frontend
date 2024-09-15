import { IOrder } from "@/types/order";
import { ICartItem, IViewsState } from "@/types/view";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a MenuItem

// Initial state
const initialState: IViewsState = {
  currentView: null,
  carts: [],
  latestOrder: null,
};

// Create the views slice
const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    // Set current view
    setCurrentView: (
      state,
      action: PayloadAction<"customer" | "admin" | "chef" | null>
    ) => {
      localStorage.setItem("pf-view", action.payload ?? "");
      state.currentView = action.payload;
    },
    // Add item to cart
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const existingItemIndex = state.carts.findIndex(
        (cartItem) => cartItem.item.id === action.payload.item.id
      );

      if (existingItemIndex >= 0) {
        state.carts[existingItemIndex].qnty += action.payload.qnty;
      } else {
        state.carts.push(action.payload);
      }
    },
    // Remove item from cart by item ID
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.carts = state.carts.filter(
        (cartItem) => cartItem.item.id !== action.payload
      );
    },
    // Update item quantity in the cart
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; qnty: number }>
    ) => {
      const existingItem = state.carts.find(
        (cartItem) => cartItem.item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.qnty = action.payload.qnty;
      }
    },
    // Clear the entire cart
    clearCart: (state) => {
      state.carts = [];
    },
    setLatestOrder: (state, action: PayloadAction<IOrder>) => {
      state.latestOrder = action.payload;
    },
    clearLatestOrder: (state) => {
      state.latestOrder = null;
    },
  },
});

// Export actions
export const {
  setCurrentView,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
  setLatestOrder,
  clearLatestOrder,
} = viewsSlice.actions;

// Export the reducer
export default viewsSlice.reducer;
