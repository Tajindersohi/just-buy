import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    categories : [],
    isLoading: false,
    error: null,
  },
  reducers: {
    gettingProducts: (state) => {
      state.isLoading = true;
    },
    getProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    }
  },
});

export const {
  gettingProducts,
  getProductsFailed,
  getProductsSuccess
} = productSlice.actions;

export default productSlice.reducer;
