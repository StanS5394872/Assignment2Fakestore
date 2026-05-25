import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
  },
  reducers: {
    createOrder: (state, action) => {
      const cartItems = action.payload;

      const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      state.items.push({
        id: Date.now().toString(),
        status: 'new',
        items: cartItems,
        totalItems,
        totalPrice,
      });
    },

    payOrder: (state, action) => {
      const order = state.items.find(order => order.id === action.payload);
      if (order) order.status = 'paid';
    },

    receiveOrder: (state, action) => {
      const order = state.items.find(order => order.id === action.payload);
      if (order) order.status = 'delivered';
    },
  },
});

export const { createOrder, payOrder, receiveOrder } = orderSlice.actions;
export default orderSlice.reducer;