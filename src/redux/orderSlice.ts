import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a MenuItem

// Initial state
const initialState: IOrderState = {
  clickedOrder: null,
};

// Create the views slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Set current view
    setClickedOrder: (state, action: PayloadAction<IOrder | null>) => {
      state.clickedOrder = action.payload;
    },
  },
});

// Export actions
export const { setClickedOrder } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
