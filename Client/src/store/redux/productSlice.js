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
    gettingProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProducts: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    addNewProduct: (state, action) => {
      state.products.push(action.payload);
    },
    addNewCategory: (state, action) => {
      console.log("statettetet",state, action);
      state.products.push(action.payload);
    },
  },
});

export const {
  gettingProducts,
  gettingProductsFailed,
  getProducts,
  addNewProduct,
  addNewCategory
} = productSlice.actions;

export default productSlice.reducer;
