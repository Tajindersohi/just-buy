import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  items: [],
  isLoading: false,
  error: null,
  total_cost : 0,
  delivery_charges: 0,
  handeling_charges: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    gettingCart(state) {
      state.isLoading = true;
      state.error = null;
    },

    getCartFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCartSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload.items;
      state.total_cost = action.payload.total_cost;
      state.delivery_charges = action.payload.delivery_charges;
      state.handeling_charges = action.payload.handeling_charges;
    },
    removeProduct(state, action) {
      state.items = state.items
        .map(item =>
          item._id === action.payload ? { ...item, count: item.count - 1 } : item
        )
        .filter(item => item.count > 0);
    },

    addProduct(state, action) {
      const existingItem = state.items.find(item => item._id === action.payload);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ _id: action.payload, count: 1 });
      }
    },
  },
});

export const {
  gettingCart,
  getCartFailed,
  getCartSuccess,
  removeProduct,
  addProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
