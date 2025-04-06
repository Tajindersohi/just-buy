import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    list : [],
    isLoading: false,
    error: null,
  },
  reducers: {
    gettingCart: (state) => {
      state.isLoading = true;
    },
    getCartFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCartSuccess: (state, action) => {
      state.isLoading = false;
      state.list = action.payload
    },
    removeProduct: (state, action) => {
    },
  },
});

export const {
  gettingCart,
  getCartFailed,
  getCartSuccess,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
