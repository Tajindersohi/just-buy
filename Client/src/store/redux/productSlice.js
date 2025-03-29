import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    categories : [],
    isLoading: false,
    error: null,
    categoryName:null,
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
      state.categoryName = action.payload.categoryName
      state.products = action.payload.list;
    },
    deletingProduct: (state, action) => {
      state.isLoading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(item => item._id != action.payload);
    },
    deletingProductFailed: (state, action) => {
      state.isLoading = false;
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
    },
  },
});

export const {
  gettingProducts,
  getProductsFailed,
  getProductsSuccess,
  deletingProduct,
  deletingProductFailed,
  deleteProductSuccess,
  updateProduct
} = productSlice.actions;

export default productSlice.reducer;
